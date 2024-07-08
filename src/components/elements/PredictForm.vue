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
          <form
            class="form"
          >
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
                      :class="{ 'input': true, 'is-danger': errors['vx'], 'is-success': !errors['vx'] }"
                      type="text"
                      name="data-sample-vx0"
                      placeholder="Input vx0 value"
                      :min="constants.VX0_MIN"
                      :max="constants.VX0_MAX"
                    >
                  </div>
                  <p :class="{ 'help': true, 'is-danger': errors['vx'] }">
                    This is a vx0. <br> min {{ constants.VX0_MIN }} max {{ constants.VX0_MAX }}
                  </p>
                </div>
                <div class="field">
                  <label class="label">vy0</label>
                  <div class="control">
                    <input
                      id="data-sample-vy0"
                      v-model="defaultData.vy0"
                      :class="{ 'input': true, 'is-danger': errors['vy'], 'is-success': !errors['vy'] }"
                      type="text"
                      name="data-sample-vy0"
                      placeholder="Input vy0 value"
                    >
                  </div>
                  <p :class="{ 'help': true, 'is-danger': errors['vy'] }">
                    This is a vy0 <br> min {{ constants.VY0_MIN }} max {{ constants.VY0_MAX }}
                  </p>
                </div>
                <div class="field">
                  <label class="label">vz0</label>
                  <div class="control">
                    <input
                      id="data-sample-vz0"
                      v-model="defaultData.vz0"
                      :class="{ 'input': true, 'is-danger': errors['vz'], 'is-success': !errors['vz'] }"
                      type="text"
                      name="data-sample-vz0"
                      placeholder="Input vz0 value"
                    >
                  </div>
                  <p :class="{ 'help': true, 'is-danger': errors['vz'] }">
                    This is a vz0 <br> min {{ constants.VZ0_MIN }} max {{ constants.VZ0_MAX }}
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
                      :class="{ 'input': true, 'is-danger': errors['ax'], 'is-success': !errors['ax'] }"
                      type="text"
                      name="data-sample-ax"
                      placeholder="Input ax value"
                    >
                  </div>
                  <p :class="{ 'help': true, 'is-danger': errors['ax']}">
                    This is a ax <br> min {{ constants.AX_MIN }} max {{ constants.AX_MAX }}
                  </p>
                </div>
                <div class="field">
                  <label class="label">ay</label>
                  <div class="control">
                    <input
                      id="data-sample-ay"
                      v-model="defaultData.ay"
                      :class="{ 'input': true, 'is-danger': errors['ay'], 'is-success': !errors['ay'] }"
                      type="text"
                      name="data-sample-ay"
                      placeholder="Input ay value"
                    >
                  </div>
                  <p :class="{ 'help': true, 'is-danger': errors['ay'] }">
                    This is a ay <br> min {{ constants.AY_MIN }} max {{ constants.AY_MAX }}
                  </p>
                </div>
                <div class="field">
                  <label class="label">az</label>
                  <div class="control">
                    <input
                      id="data-sample-az"
                      v-model="defaultData.az"
                      :class="{ 'input': true, 'is-danger': errors['az'], 'is-success': !errors['az'] }"
                      type="text"
                      name="data-sample-az"
                      placeholder="Input az value"
                    >
                  </div>
                  <p :class="{ 'help': true, 'is-danger': errors['az'] }">
                    This is a az <br> min {{ constants.AZ_MIN }} max {{ constants.AZ_MAX }}
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
                      :class="{ 'input': true, 'is-danger': errors['speed'], 'is-success': !errors['speed'] }"
                      type="text"
                      name="data-sample-speed"
                      placeholder="Input speed"
                    >
                  </div>
                  <p :class="{ 'help': true, 'is-danger': errors['speed'] }">
                    Start speed <br> min {{ constants.START_SPEED_MIN }} max {{ constants.START_SPEED_MAX }}
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
              :disabled="predictDisabled"
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

<script setup lang="ts">
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
        errors: {},
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
        constants: state => state.learnModel.constants,
      }),
      showForm() {
        return this.trainStatus === 'trainComplete'
      },
      predictDisabled() {
        return Object.keys(this.errors).length !== 0;
      }
    },
    watch: {
      defaultData: {
        handler(val) {
          this.checkForm();
        },
        deep: true,
      }
    },
    methods: {
      ...mapActions({
        predictData: 'learnModel/predictData',
        changeStatus: 'learnModel/changeStatus',
      }),
      makePredict() {
        this.checkForm();

        if (!this.predictDisabled) {
          this.changeStatus('predict');
          const res = {};
          for(const key in this.defaultData) {
            res[key] = parseFloat(this.defaultData[key]);
          }
          this.predictData(res);
        }
      },
      checkForm() {
        this.errors = {};

        const vx = Number(this.defaultData.vx0);
        if ( vx < Number(this.constants.VX0_MIN) || vx > Number(this.constants.VX0_MAX)) {
          this.errors['vx'] = `vx must be between ${ this.constants.VX0_MIN } and ${ this.constants.VX0_MAX }`;
        }

        const vy = Number(this.defaultData.vy0);
        if (vy < Number(this.constants.VY0_MIN) || vy > Number(this.constants.VY0_MAX)) {
          this.errors['vy'] = `vy must be between ${ this.constants.VY0_MIN } and ${ this.constants.VY0_MAX }`;
        }

        const vz = Number(this.defaultData.vz0);
        if (vz < Number(this.constants.VZ0_MIN) || vz > Number(this.constants.VZ0_MAX)) {
          this.errors['vz'] = `vz must be between ${ this.constants.VZ0_MIN } and ${ this.constants.VZ0_MAX }`;
        }

        const ax = Number(this.defaultData.ax);
        if ( ax < Number(this.constants.AX_MIN) || ax > Number(this.constants.AX_MAX)) {
          this.errors['ax'] = `ax must be between ${ this.constants.AX_MIN } and ${ this.constants.AX_MAX }`;
        }

        const ay = Number(this.defaultData.ay);
        if (ay < Number(this.constants.AY_MIN) || ay > Number(this.constants.AY_MAX)) {
          this.errors['ay'] = `ay must be between ${ this.constants.AY_MIN } and ${ this.constants.AY_MAX }`;
        }

        const az = Number(this.defaultData.az);
        if (az < Number(this.constants.AZ_MIN) || az > Number(this.constants.AZ_MAX)) {
          this.errors['az'] = `az must be between ${ this.constants.AZ_MIN } and ${ this.constants.AZ_MAX }`;
        }

        const speed = Number(this.defaultData.startSpeed);
        if (speed < Number(this.constants.START_SPEED_MIN) || speed > Number(this.constants.START_SPEED_MAX)) {
          this.errors['speed'] = `start speed must be between ${ this.constants.START_SPEED_MIN } and ${ this.constants.START_SPEED_MAX }`;
        }

        if (!this.errors.length) {
          return true;
        }
      }
    }
  }
</script>

<style scoped>

</style>
