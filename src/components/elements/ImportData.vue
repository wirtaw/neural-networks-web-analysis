<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      Is train data loaded
      <div v-if="learnData && Object.values(learnData).length > 0">
        Yes
      </div>
      <div v-else>
        No
      </div>
      <vue-csv-import
        v-if="!learnData || Object.values(learnData).length === 0"
        v-model="trainingJSONData"
        url="https://storage.googleapis.com/mlb-pitch-data/pitch_type_training_data.csv"
        :map-fields="['vx0','vy0','vz0','ax','ay','az','startSpeed','leftHandedPitcher','pitchCode']"
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
    <div class="tile is-parent">
      Is test data loaded
      <div v-if="testData && Object.values(testData).length > 0">
        Yes
      </div>
      <div v-else>
        No
      </div>
      <vue-csv-import
        v-if="!testData || Object.values(testData).length === 0"
        v-model="testJSONData"
        url="https://storage.googleapis.com/mlb-pitch-data/pitch_type_test_data.csv"
        :map-fields="['vx0','vy0','vz0','ax','ay','az','startSpeed','leftHandedPitcher','pitchCode']"
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
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { VueCsvImport } from 'vue-csv-import';

  // Constants from training data
  const VX0_MIN = -18.885;
  const VX0_MAX = 18.065;
  const VY0_MIN = -152.463;
  const VY0_MAX = -86.374;
  const VZ0_MIN = -15.5146078412997;
  const VZ0_MAX = 9.974;
  const AX_MIN = -48.0287647107959;
  const AX_MAX = 30.592;
  const AY_MIN = 9.397;
  const AY_MAX = 49.18;
  const AZ_MIN = -49.339;
  const AZ_MAX = 2.95522851438373;
  const START_SPEED_MIN = 59;
  const START_SPEED_MAX = 104.4;

  export default {
    name: 'ImportData',
    components: { VueCsvImport },
    data () {
      return {
        trainingJSONData: null,
        testJSONData: null
      }
    },
    computed: {
      ...mapState({
        learnData: state => state.learnModel.learnData,
        testData: state => state.learnModel.testData,
      })
    },
    watch: {
      trainingJSONData(to, from) {
        if (to && Object.values(to).length > 0) {
          this.loadTrainData(this.normaliseData(to));
        }
      },
      testJSONData(to, from) {
        if (to && Object.values(to).length > 0) {
          this.loadTestData(this.normaliseData(to));
        }
      }
    },
    methods: {
      ...mapActions({
        loadTrainData: 'learnModel/loadTrainData',
        loadTestData: 'learnModel/loadTestData',
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
            this.normalize(item.vx0, VX0_MIN, VX0_MAX),
            this.normalize(item.vy0, VY0_MIN, VY0_MAX),
            this.normalize(item.vz0, VZ0_MIN, VZ0_MAX),
            this.normalize(item.ax, AX_MIN, AX_MAX),
            this.normalize(item.ay, AY_MIN, AY_MAX),
            this.normalize(item.az, AZ_MIN, AZ_MAX),
            this.normalize(item.startSpeed, START_SPEED_MIN, START_SPEED_MAX),
            Number(item.leftHandedPitcher),
          ];
          return {xs: values, ys: Number(item.pitchCode)};
        });
      }
    }
  }
</script>

<style scoped>

</style>
