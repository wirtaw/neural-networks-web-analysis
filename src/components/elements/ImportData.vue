<template>
  <div class="tile">
    <div class="tile is-child">
      <div class="columns">
        <div class="column is-12">
          <div class="field">
            Download
            <a
              href="https://storage.googleapis.com/mlb-pitch-data/pitch_type_training_data.csv"
              class="link primary"
              target="_blank"
            >pitch_type_training_data.csv</a>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <div class="field">
            <input
              id="pitchDataTrain"
              v-model="pitchDataChecked"
              type="checkbox"
              name="pitchDataTrain"
              class="switch is-success"
              disabled
            >
            <label for="pitchDataTrain">import pitch train data</label>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <vue-csv-import
            v-if="!learnData || Object.values(learnData).length === 0"
            v-model="trainingJSONData"
            url="https://storage.googleapis.com/mlb-pitch-data/pitch_type_training_data.csv"
            :map-fields="Object.keys(fieldForCSV)"
          >
            <template #hasHeaders="{headers, toggle}">
              <label>
                <input
                  id="hasHeaders"
                  type="checkbox"
                  :value="headers"
                  @change="toggle"
                >
                Headers?
              </label>
            </template>
          </vue-csv-import>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12" />
      </div>
    </div>
    <div class="tile is-child">
      <div class="columns">
        <div class="column is-12">
          <div class="field">
            Download
            <a
              href="https://storage.googleapis.com/mlb-pitch-data/pitch_type_test_data.csv"
              class="link primary"
              target="_blank"
            >pitch_type_test_data.csv</a>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <div class="field">
            <input
              id="pitchDataTest"
              v-model="pitchDataTestChecked"
              type="checkbox"
              name="pitchDataTest"
              class="switch is-success"
              disabled
            >
            <label for="pitchDataTest">import pitch test data</label>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <vue-csv-import
            v-if="!testData || Object.values(testData).length === 0"
            v-model="testJSONData"
            url="https://storage.googleapis.com/mlb-pitch-data/pitch_type_test_data.csv"
            :map-fields="Object.keys(fieldForCSV)"
          >
            <template #hasHeaders="{headers, toggle}">
              <label>
                <input
                  id="hasHeaders"
                  type="checkbox"
                  :value="headers"
                  @change="toggle"
                >
                Headers?
              </label>
            </template>
          </vue-csv-import>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { mapState, mapActions } from 'vuex';
  import { VueCsvImport } from 'vue-csv-import';

  export default {
    name: 'ImportData',
    components: { VueCsvImport },
    data () {
      return {
        trainingJSONData: [],
        testJSONData: [],
        // 'vx0','vy0','vz0','ax','ay','az','startSpeed','leftHandedPitcher','pitchCode'
        fieldForCSV: {
          vx0: {required: true, label: 'vx0'},
          vy0: {required: true, label: 'vy0'},
          vz0: {required: true, label: 'vz0'},
          ax: {required: true, label: 'ax'},
          ay: {required: true, label: 'ay'},
          az: {required: true, label: 'az'},
          startSpeed: {required: true, label: 'startSpeed'},
          leftHandedPitcher: {required: true, label: 'leftHandedPitcher'},
          pitchCode: {required: true, label: 'pitchCode'}
        }
      }
    },
    computed: {
      ...mapState({
        learnData: state => state.learnModel.learnData,
        testData: state => state.learnModel.testData,
        constants: state => state.learnModel.constants,
      }),
      pitchDataTestChecked() {
        let result = false;

        if (this.testData && Object.values(this.testData).length > 0) {
          result = true;
        }

        return result;
      },
      pitchDataChecked() {
        let result = false;

        if (this.learnData && Object.values(this.learnData).length > 0) {
          result = true;
        }

        return result;
      }
    },
    watch: {
      trainingJSONData(to, from) {
        this.changePredictClassName('');
        if (to && Object.values(to).length > 0) {
          this.loadTrainData(this.normaliseData(to.slice(1, to.length)));

          if (this.testData && Object.values(this.testData).length > 0
            && this.learnData && Object.values(this.learnData).length > 0) {
            this.changeStatus('importData');
          }
        }
      },
      testJSONData(to, from) {
        this.changePredictClassName('');
        if (to && Object.values(to).length > 0) {
          this.loadTestData(this.normaliseData(to.slice(1, to.length)));

          if (this.testData && Object.values(this.testData).length > 0
            && this.learnData && Object.values(this.learnData).length > 0) {
            this.changeStatus('importData');
          }
        }
      }
    },
    methods: {
      ...mapActions({
        loadTrainData: 'learnModel/loadTrainData',
        loadTestData: 'learnModel/loadTestData',
        changeStatus: 'learnModel/changeStatus',
        changePredictClassName: 'learnModel/changePredictClassName',
      }),
      normalize(value, min, max) {
        if (min === undefined || max === undefined) {
          return value;
        }
        return (value - min) / (max - min);
      },
      normaliseData(list) {
        return list.map(item => {
          const values = [
            this.normalize(item.vx0, this.constants.VX0_MIN, this.constants.VX0_MAX),
            this.normalize(item.vy0, this.constants.VY0_MIN, this.constants.VY0_MAX),
            this.normalize(item.vz0, this.constants.VZ0_MIN, this.constants.VZ0_MAX),
            this.normalize(item.ax, this.constants.AX_MIN, this.constants.AX_MAX),
            this.normalize(item.ay, this.constants.AY_MIN, this.constants.AY_MAX),
            this.normalize(item.az, this.constants.AZ_MIN, this.constants.AZ_MAX),
            this.normalize(item.startSpeed, this.constants.START_SPEED_MIN, this.constants.START_SPEED_MAX),
            Number(item.leftHandedPitcher),
          ];
          return {xs: values, ys: Number(item.pitchCode)};
        });
      },
      copy(str) {
        console.info(`str ${str}`);
      }
    }
  }
</script>

<style scoped>

</style>
