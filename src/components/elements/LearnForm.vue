<template>
  <div class="container">
    <div
      v-if="trainStatus === 'train'"
      class="columns"
    >
      <div class="column">
        <progress
          class="progress tile is-child"
          :value="trainProgress"
          max="100"
        >
          {{ trainProgress }}%
        </progress>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <div
              v-if="showForm"
              class="container form is-child"
            >
              <div class="field has-text-left">
                <label
                  for="name"
                  class="label"
                >Model name</label>
                <div class="control">
                  <input
                    id="name"
                    :value="name"
                    type="text"
                    class="input"
                    @input="inputEpoch"
                  >
                </div>
                <p class="help">
                  name to save JSON with model
                </p>
              </div>
              <div class="field has-text-left">
                <label
                  for="epoch"
                  class="label"
                >Epoch</label>
                <div class="control">
                  <input
                    id="epoch"
                    :value="epochs"
                    type="number"
                    class="input"
                    @input="inputEpoch"
                  >
                </div>
                <p class="help">
                  count of the epoch in the an iteration
                </p>
              </div>
              <div class="field has-text-left">
                <label
                  for="iterations"
                  class="label"
                >Iterations</label>
                <div class="control">
                  <input
                    id="iterations"
                    :value="iterations"
                    type="number"
                    class="input"
                    @input="inputIterations"
                  >
                </div>
                <p class="help">
                  number of iteration of the train
                </p>
              </div>
              <div class="field is-grouped is-grouped-centered">
                <div class="control">
                  <button
                    class="button is-link"
                    :disabled="isDisabledTrain"
                    @click="startLearn"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="showForm"
            class="tile is-parent"
          >
            <div class="is-child">
              <h6>Logs</h6>
              <div
                v-if="accuracyList && accuracyList.length > 0"
                class="box accuracy-box"
              >
                <pre
                  v-for="item in accuracyList"
                  :key="item.key"
                >
            {{ item.accuracy }}
          </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Timer } from 'easytimer.js';
  import * as tf from '@tensorflow/tfjs';
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'LearnForm',
    props: {
      netName: {
        type: String,
        default: 'Name of the network',
      }
    },
    data () {
      return {
        model: null,
        accuracyList: [],
        trainingValidationData: null,
        xyDataset: null,
        xyDatasetTest: null,
        progressBar: false,
        trainProgress: 0
      }
    },
    computed: {
      ...mapState({
        name: state => state.learnModel.name,
        epochs: state => state.learnModel.epochs,
        iterations: state => state.learnModel.numTrainingIterations,
        learnData: state => state.learnModel.learnData,
        testData: state => state.learnModel.testData,
        trainStatus: state => state.learnModel.trainStatus,
        predictData: state => state.learnModel.predictData,
        constants: state => state.learnModel.constants,
        storedModel: state => state.learnModel.model,
        predictCount: state => state.learnModel.predictCount,
      }),
      showForm() {
        return this.testData && Object.values(this.testData).length > 0
          && this.learnData && Object.values(this.learnData).length > 0
      },
      isDisabledTrain() {
        let result = false;

        if (this.trainStatus === 'train') {
          result = true;
        }

        return result;
      }
    },
    watch: {
      predictCount(to, from) {
        if (to && this.model) {
          // console.info(`Watch predictData`);
          // console.dir(to, {depth: 2});
          const values = [
            this.normalize(parseFloat(this.predictData.vx0), this.constants.VX0_MIN, this.constants.VX0_MAX),
            this.normalize(parseFloat(this.predictData.vy0), this.constants.VY0_MIN, this.constants.VY0_MAX),
            this.normalize(parseFloat(this.predictData.vz0), this.constants.VZ0_MIN, this.constants.VZ0_MAX),
            this.normalize(parseFloat(this.predictData.ax), this.constants.AX_MIN, this.constants.AX_MAX),
            this.normalize(parseFloat(this.predictData.ay), this.constants.AY_MIN, this.constants.AY_MAX),
            this.normalize(parseFloat(this.predictData.az), this.constants.AZ_MIN, this.constants.AZ_MAX),
            this.normalize(parseFloat(this.predictData.startSpeed), this.constants.START_SPEED_MIN, this.constants.START_SPEED_MAX),
            Number(this.predictData.leftHandedPitcher),
          ];
          //console.dir(values, {depth: 2});
          // console.dir(this.model, {depth: 2});
          // console.dir(this.storedModel, {depth: 2});
          // console.info(`result`);
          const result = this.model.predict(tf.tensor(values, [1, values.length])).arraySync();
          //console.dir(result, {depth: 2});
          let maxValue = 0;
          let predictedPitch = 7;
          for (let i = 0; i < this.constants.NUM_PITCH_CLASSES; i++) {
            if (result[0][i] > maxValue) {
              predictedPitch = i;
              maxValue = result[0][i];
            }
          }

          this.changePredictClassName(this.pitchFromClassNum(predictedPitch));
        }
      }
    },
    methods: {
      ...mapActions({
        changeName: 'learnModel/changeName',
        changeEpoch: 'learnModel/changeEpoch',
        changeIteration: 'learnModel/changeIteration',
        learnModelStart: 'learnModel/learnModelStart',
        changeStatus: 'learnModel/changeStatus',
        changePredictClassName: 'learnModel/changePredictClassName',
        changeModel: 'learnModel/changeModel',
        updateTrainTime: 'metrics/updateTrainTime',
        updatePredictTime: 'metrics/updatePredictTime',
      }),
      inputName(e) {
        this.changeName(e.target.value);
      },
      inputEpoch(e) {
        this.changeEpoch(Number(e.target.value));
      },
      inputIterations(e) {
        this.changeIteration(Number(e.target.value));
      },
      startLearn() {
        this.changePredictClassName('');
        switch(this.netName) {
          case 'tensorflow':
            this.learnModelStart(true);
            this.learnTensorflow();
            this.changeStatus('train');
            this.accuracyList = [];
            this.trainProgress = 0;
            break;
          default:
            this.model =  null;
        }
      },
      async sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      pitchFromClassNum(classNum) {
        switch (classNum) {
          case 0:
            return 'Fastball (2-seam)';
          case 1:
            return 'Fastball (4-seam)';
          case 2:
            return 'Fastball (sinker)';
          case 3:
            return 'Fastball (cutter)';
          case 4:
            return 'Slider';
          case 5:
            return 'Changeup';
          case 6:
            return 'Curveball';
          default:
            return 'Unknown';
        }
      },
      calcPitchClassEval(pitchIndex, classSize, values) {
        let index = (pitchIndex * classSize * this.constants.NUM_PITCH_CLASSES) + pitchIndex;
        let total = 0;
        for (let i = 0; i < classSize; i++) {
          total += values[index];
          index += this.constants.NUM_PITCH_CLASSES;
        }
        return total / classSize;
      },
      async evaluateTensorflow(useTestData) {
        const timer = new Timer();
        timer.start();
        const start = (new Date).getTime();
        const results = {};
        await this.trainingValidationData.forEachAsync(pitchTypeBatch => {
          const values = this.model.predict(pitchTypeBatch.xs).dataSync();
          const classSize = this.constants.TRAINING_DATA_LENGTH / this.constants.NUM_PITCH_CLASSES;
          for (let i = 0; i < this.constants.NUM_PITCH_CLASSES; i++) {
            results[this.pitchFromClassNum(i)] = {
              training: this.calcPitchClassEval(i, classSize, values),
            };
          }
        });

        if (useTestData) {
          await this.xyDatasetTest.forEachAsync(pitchTypeBatch => {
            const values = this.model.predict(pitchTypeBatch.xs).dataSync();
            const classSize = this.constants.TEST_DATA_LENGTH / this.constants.NUM_PITCH_CLASSES;
            for (let i = 0; i < this.constants.NUM_PITCH_CLASSES; i++) {
              results[this.pitchFromClassNum(i)].validation =
                this.calcPitchClassEval(i, classSize, values);
            }
          });
        }
        timer.stop();
        const diff = (new Date).getTime() - start;
        this.updatePredictTime({ network: this.netName, time: diff });
        return results;
      },
      async learnTensorflow() {
        const timer = new Timer();
        timer.start();
        const start = (new Date).getTime();
        this.model = tf.sequential();
        this.model.add(tf.layers.dense({units: 250, activation: 'relu', inputShape: [8]}));
        this.model.add(tf.layers.dense({units: 175, activation: 'relu'}));
        this.model.add(tf.layers.dense({units: 150, activation: 'relu'}));
        this.model.add(tf.layers.dense({units: this.constants.NUM_PITCH_CLASSES, activation: 'softmax'}));

        // console.info(`model ${JSON.stringify(model.outputs[0].shape)}` );

        this.model.compile({
          optimizer: tf.train.adam(),
          loss: 'sparseCategoricalCrossentropy',
          metrics: ['accuracy'],
        });

        const xArray = [];
        const yArray = [];

        Object.values(this.learnData).forEach(item => {
          if (Array.isArray(item.xs)) {
            xArray.push(item.xs);
          }
          if ((`${item.ys}`).trim() !== '') {
            yArray.push(item.ys);
          }
        });

        const xArrayTest = [];
        const yArrayTest = [];

        Object.values(this.testData).forEach(item => {
          if (Array.isArray(item.xs)) {
            xArrayTest.push(item.xs);
          }
          if ((`${item.ys}`).trim() !== '') {
            yArrayTest.push(item.ys);
          }
        });

        if (Array.isArray(xArray) && xArray.length > 0 && Array.isArray(yArray) && xArray.length === yArray.length ) {
          const xDataset = tf.data.array(xArray);
          const yDataset = tf.data.array(yArray);

          this.xyDataset = tf.data.zip({xs: xDataset, ys: yDataset})
            .shuffle(this.constants.TRAINING_DATA_LENGTH)
            .batch(100);

          const xDatasetTest = tf.data.array(xArrayTest);
          const yDatasetTest = tf.data.array(yArrayTest);

          this.xyDatasetTest = tf.data.zip({xs: xDatasetTest, ys: yDatasetTest})
            .batch(this.constants.TEST_DATA_LENGTH);

          this.trainingValidationData = tf.data.zip({xs: xDataset, ys: yDataset})
            .batch(this.constants.TRAINING_DATA_LENGTH);

          for (let i = 0; i < this.iterations; i++) {
            console.info(`Training iteration : ${i + 1} / ${this.iterations}`);
            await this.model.fitDataset(this.xyDataset, {epochs: this.epochs});
            this.trainProgress = Math.ceil(((i + 1) / this.iterations * 100));
            const accuracy = await this.evaluateTensorflow(true);

            this.accuracyList.push({ key: `${i + 1}`, accuracy });

            if (i + 1 === this.iterations) {
              this.changeStatus('trainComplete');
              this.changeModel(this.model);
              timer.stop();
              const diff = (new Date).getTime() - start;
              this.updateTrainTime({ network: this.netName, time: diff });
            }
            await this.sleep(this.constants.TIMEOUT_BETWEEN_EPOCHS_MS);
          }
        }
      },
      normalize(value, min, max) {
        if (min === undefined || max === undefined) {
          return value;
        }
        return (value - min) / (max - min);
      },
    }
  }
</script>

<style scoped>
  .accuracy-box {
    max-height: 300px;
    height: 300px;
    overflow: auto;
  }
</style>
