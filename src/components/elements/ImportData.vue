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
        url="./../../assets/data/pitch_type_training_data.csv"
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
        url="./../../assets/data/pitch_type_test_data.csv"
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
          console.dir(to, {depth: 1});
          this.loadTrainData(to);
        }
      },
      testJSONData(to, from) {
        if (to && Object.values(to).length > 0) {
          console.dir(to, {depth: 1});
          this.loadTestData(to);
        }
      }
    },
    mounted() {
      console.info('Learn form mounted');
      //console.dir(trainingJSONData, {depth: 1});
    },
    methods: {
      ...mapActions({
        loadTrainData: 'learnModel/loadTrainData',
        loadTestData: 'learnModel/loadTestData',
      }),
    }
  }
</script>

<style scoped>

</style>
