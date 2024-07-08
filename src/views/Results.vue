<template>
  <div class="padding-no">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="columns">
          <div class="column is-12">
            <div class="container">
              <i class="is-large fab fa-discord" />
              <i class="is-large fas fa-code" />
              <h1 class="title">
                Results
              </h1>
              <router-link to="/">
                back to main
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section v-if="Object.keys(modelTime).length > 0">
      <div class="container">
        <div class="columns">
          <div class="column">
            <h5>Metrics</h5>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <table class="table">
              <thead>
                <tr>
                  <th><abbr title="Network">Network type</abbr></th>
                  <th><abbr title="Name">Name</abbr></th>
                  <th><abbr title="Epochs">Epochs</abbr></th>
                  <th><abbr title="Iterations">Iterations</abbr></th>
                  <th><abbr title="TimeLearn">Time Learn (s)</abbr></th>
                  <th><abbr title="PredictTime">Predict Time (s)</abbr></th>
                  <th><abbr title="Browser">Browser</abbr></th>
                  <th><abbr title="JSEngine">JavaSrcipt engine</abbr></th>
                  <th><abbr title="JSEngine">OS</abbr></th>
                  <th><abbr title="JSEngine">CPU</abbr></th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th><abbr title="Network">Network type</abbr></th>
                  <th><abbr title="Name">Name</abbr></th>
                  <th><abbr title="Epochs">Epochs</abbr></th>
                  <th><abbr title="Iterations">Iterations</abbr></th>
                  <th><abbr title="TimeLearn">Time Learn (s)</abbr></th>
                  <th><abbr title="PredictTime">Predict Time (s)</abbr></th>
                  <th><abbr title="Browser">Browser</abbr></th>
                  <th><abbr title="JSEngine">JavaSrcipt engine</abbr></th>
                  <th><abbr title="JSEngine">OS</abbr></th>
                  <th><abbr title="JSEngine">CPU</abbr></th>
                </tr>
              </tfoot>
              <tbody>
                <tr
                  v-for="(value, name) in modelTime"
                  :key="`${name}-train-time`"
                >
                  <th>
                    <router-link :to="`/page/${value.network}`">
                      {{ value.network }}
                    </router-link>
                  </th>
                  <th>{{ value.name }}</th>
                  <td>{{ value.epochs }}</td>
                  <td>{{ value.iterations }}</td>
                  <td>{{ value.learnTime }} s</td>
                  <td>{{ value.predictTime }} s</td>
                  <td>
                    <p v-if="ua && ua.browser">
                      {{ ua.browser.name }}
                    </p>
                  </td>
                  <td>
                    <p v-if="ua && ua.engine">
                      {{ ua.engine.name }} {{ ua.engine.version }}
                    </p>
                  </td>
                  <td>
                    <p v-if="ua && ua.os">
                      {{ ua.os.name }} {{ ua.os.version }}
                    </p>
                  </td>
                  <td>
                    <p v-if="cpu">
                      {{ cpu }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">cpu info</label>
              <div class="control">
                <input
                  id="cpu-info"
                  v-model="cpuInfo"
                  :class="{ 'input': true, 'is-danger': errors['cpuInfo'], 'is-success': !errors['cpuInfo'] }"
                  type="text"
                  name="cpu-info"
                  placeholder="Additional CPU info"
                >
              </div>
              <p :class="{ 'help': true, 'is-danger': errors['cpuInfo'] }" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import {mapActions, mapState} from 'vuex';
  import Bowser from "bowser";

  export default {
    name: 'Results',
    data () {
      return {
        ua: null,
        activeStep: 1,
        errors: {},
        cpuInfo: ''
      }
    },
    computed: {
      ...mapState({
        modelTime: state => state.metrics.modelTime,
        cpu: state => state.metrics.cpu,
      }),
    },
    watch: {
      cpuInfo: {
        handler(val) {
          if (val) {
            this.updateCPU(val);
          }
        },
        deep: true,
      }
    },
    mounted() {
      this.cpuInfo = this.cpu ? this.cpu : '';
      const browser = Bowser.getParser(window.navigator.userAgent);
      const ua = browser.getBrowser();
      this.ua = (ua) ? ua : {};
    },methods: {
      ...mapActions({
        updateCPU: 'metrics/updateCPU',
      }),
    },
  }
</script>

<style scoped>

</style>
