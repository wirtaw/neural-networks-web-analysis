<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <div
        v-if="showForm"
        class="container form"
      >
        <div class="field is-horizontal">
          <div class="field-label">
            <label
              for="name"
              class="label"
            >Model name</label>
          </div>
          <div class="field-body">
            <div class="control">
              <input
                id="name"
                :value="name"
                type="text"
                class="input"
                @input="inputEpoch"
              >
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label
              for="epoch"
              class="label"
            >Epoch</label>
          </div>
          <div class="field-body">
            <div class="control">
              <input
                id="epoch"
                :value="epochs"
                type="number"
                class="input"
                @input="inputEpoch"
              >
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label
              for="iterations"
              class="label"
            >Iterations</label>
          </div>
          <div class="field-body">
            <div class="control">
              <input
                id="iterations"
                :value="iterations"
                type="number"
                class="input"
                @input="inputIterations"
              >
            </div>
          </div>
        </div>
        <div class="field is-grouped is-grouped-centered">
          <div class="control">
            <button
              class="button is-link"
              @click="startLearn"
              @disabled="isDisabledTrain"
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
      <h4>Logs</h4>
      <div class="box">
        <pre
          v-for="item in accuracyList"
          :key="item.key"
        >
          {{ item.accuracy }}
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
  import * as tf from '@tensorflow/tfjs';
  import { mapState, mapActions } from 'vuex';

  const NUM_PITCH_CLASSES = 7;
  const TRAINING_DATA_LENGTH = 7000;
  const TEST_DATA_LENGTH = 700;
  const TIMEOUT_BETWEEN_EPOCHS_MS = 2000;

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
      }
    },
    computed: {
      ...mapState({
        name: state => state.learnModel.name,
        epochs: state => state.learnModel.epochs,
        iterations: state => state.learnModel.numTrainingIterations,
        isDisabledTrain: state => state.learnModel.trainDisabled,
        learnData: state => state.learnModel.learnData,
        testData: state => state.learnModel.testData,
      }),
      showForm() {
        return this.testData && Object.values(this.testData).length > 0
          && this.learnData && Object.values(this.learnData).length >0
      }
    },
    methods: {
      ...mapActions({
        changeName: 'learnModel/changeName',
        changeEpoch: 'learnModel/changeEpoch',
        changeIteration: 'learnModel/changeIteration',
        learnModelStart: 'learnModel/learnModelStart',
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
        switch(this.netName) {
          case 'tensorflow':
            this.learnModelStart(true);
            this.learnTensorflow();
            this.accuracyList = [];
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
        let index = (pitchIndex * classSize * NUM_PITCH_CLASSES) + pitchIndex;
        let total = 0;
        for (let i = 0; i < classSize; i++) {
          total += values[index];
          index += NUM_PITCH_CLASSES;
        }
        return total / classSize;
      },
      async evaluateTensorflow(useTestData) {
        const results = {};
        await this.trainingValidationData.forEachAsync(pitchTypeBatch => {
          const values = this.model.predict(pitchTypeBatch.xs).dataSync();
          const classSize = TRAINING_DATA_LENGTH / NUM_PITCH_CLASSES;
          for (let i = 0; i < NUM_PITCH_CLASSES; i++) {
            results[this.pitchFromClassNum(i)] = {
              training: this.calcPitchClassEval(i, classSize, values),
            };
          }
        });

        if (useTestData) {
          await this.xyDatasetTest.forEachAsync(pitchTypeBatch => {
            const values = this.model.predict(pitchTypeBatch.xs).dataSync();
            const classSize = TEST_DATA_LENGTH / NUM_PITCH_CLASSES;
            for (let i = 0; i < NUM_PITCH_CLASSES; i++) {
              results[this.pitchFromClassNum(i)].validation =
                this.calcPitchClassEval(i, classSize, values);
            }
          });
        }
        return results;
      },
      async learnTensorflow() {
        this.model = tf.sequential();
        this.model.add(tf.layers.dense({units: 250, activation: 'relu', inputShape: [8]}));
        this.model.add(tf.layers.dense({units: 175, activation: 'relu'}));
        this.model.add(tf.layers.dense({units: 150, activation: 'relu'}));
        this.model.add(tf.layers.dense({units: NUM_PITCH_CLASSES, activation: 'softmax'}));

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
            .shuffle(TRAINING_DATA_LENGTH)
            .batch(100);

          const xDatasetTest = tf.data.array(xArrayTest);
          const yDatasetTest = tf.data.array(yArrayTest);

          this.xyDatasetTest = tf.data.zip({xs: xDatasetTest, ys: yDatasetTest})
            .batch(TEST_DATA_LENGTH);

          this.trainingValidationData = tf.data.zip({xs: xDataset, ys: yDataset})
            .batch(TRAINING_DATA_LENGTH);

          for (let i = 0; i < this.iterations; i++) {
            console.info(`Training iteration : ${i + 1} / ${this.iterations}`);
            await this.model.fitDataset(this.xyDataset, {epochs: this.epochs});
            const accuracy = await this.evaluateTensorflow(true);

            this.accuracyList.push({ key: `${i + 1}`, accuracy });

            await this.sleep(TIMEOUT_BETWEEN_EPOCHS_MS);
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
