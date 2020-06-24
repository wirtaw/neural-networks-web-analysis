<template>
  <div class="container">
    <div
      v-if="trainStatus === 'trainComplete' || trainStatus === 'predict'"
      class="columns"
    >
      <div class="column is-12">
        <div
          id="predictContainer"
          class="container"
        >
          <form class="form">
            <p> Sensor data: <span id="predictSample" /> </p>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Ball velocity </label>
              </div>
              <div class="field-body">
                <div class="field">
                  <label class="label">vx0</label>
                  <div class="control">
                    <input
                      id="data-sample-vx0"
                      v-model="defaultData.vx0"
                      class="input"
                      type="text"
                      name="data-sample-vx0"
                      placeholder="Input vx0 value"
                    >
                  </div>
                  <p class="help">
                    This is a vx0
                  </p>
                </div>
                <div class="field">
                  <label class="label">vy0</label>
                  <div class="control">
                    <input
                      id="data-sample-vy0"
                      v-model="defaultData.vy0"
                      class="input"
                      type="text"
                      name="data-sample-vy0"
                      placeholder="Input vy0 value"
                    >
                  </div>
                  <p class="help">
                    This is a vy0
                  </p>
                </div>
                <div class="field">
                  <label class="label">vz0</label>
                  <div class="control">
                    <input
                      id="data-sample-vz0"
                      v-model="defaultData.vz0"
                      class="input"
                      type="text"
                      name="data-sample-vz0"
                      placeholder="Input vz0 value"
                    >
                  </div>
                  <p class="help">
                    This is a vz0
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label is-normal">
                <label class="label">Ball acceleration </label>
              </div>
              <div class="field-body">
                <div class="field">
                  <label class="label">ax</label>
                  <div class="control">
                    <input
                      id="data-sample-ax"
                      v-model="defaultData.ax"
                      class="input"
                      type="text"
                      name="data-sample-ax"
                      placeholder="Input ax value"
                    >
                  </div>
                  <p class="help">
                    This is a ax
                  </p>
                </div>
                <div class="field">
                  <label class="label">ay</label>
                  <div class="control">
                    <input
                      id="data-sample-ay"
                      v-model="defaultData.ay"
                      class="input"
                      type="text"
                      name="data-sample-ay"
                      placeholder="Input ay value"
                    >
                  </div>
                  <p class="help">
                    This is a ay
                  </p>
                </div>
                <div class="field">
                  <label class="label">az</label>
                  <div class="control">
                    <input
                      id="data-sample-az"
                      v-model="defaultData.az"
                      class="input"
                      type="text"
                      name="data-sample-az"
                      placeholder="Input az value"
                    >
                  </div>
                  <p class="help">
                    This is a az
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">Starting speed of pitch</label>
              </div>
              <div class="field-body">
                <div class="field is-narrow">
                  <div class="control">
                    <input
                      id="data-sample-speed"
                      v-model="defaultData.startSpeed"
                      class="input"
                      type="text"
                      name="data-sample-speed"
                      placeholder="Input speed"
                    >
                  </div>
                  <p class="help">
                    Start speed
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-label">
                <label class="label">Pitcher hand</label>
              </div>
              <div class="field-body">
                <div class="field is-narrow">
                  <div class="control">
                    <label class="radio">
                      <input
                        id="data-sample-left"
                        v-model="defaultData.leftHandedPitcher"
                        type="radio"
                        name="data-sample-hand"
                        value="1"
                      >
                      Left
                    </label>
                    <label class="radio">
                      <input
                        id="data-sample-right"
                        v-model="defaultData.leftHandedPitcher"
                        type="radio"
                        name="data-sample-hand"
                        value="0"
                      >
                      Right
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="buttons">
            <button
              id="predict-button"
              class="button is-primary"
              @click="makePredict"
            >
              Predict Pitch
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'PredictForm',
    props: {
      netName: {
        type: String,
        default: 'Name of the network',
      }
    },
    data () {
      return {
        defaultData: {
          vx0: 2.668,
          vy0: -114.333,
          vz0: -1.908,
          ax: 4.786,
          ay: 25.707,
          az: -45.21,
          startSpeed: 78,
          leftHandedPitcher: 0,
        }
      }
    },
    computed: {
      ...mapState({
        trainStatus: state => state.learnModel.trainStatus,
      }),
      showForm() {
        return this.trainStatus === 'trainComplete'
      }
    },
    methods: {
      ...mapActions({
        predictData: 'learnModel/predictData',
        changeStatus: 'learnModel/changeStatus',
      }),
      makePredict() {
        this.changeStatus('predict');
        this.predictData(this.defaultData);
      }
    }
  }
</script>

<style scoped>

</style>
