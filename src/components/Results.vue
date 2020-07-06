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
                </tr>
              </tfoot>
              <tbody>
                <tr
                  v-for="(value, name) in modelTime"
                  :key="`${name}-train-time`"
                >
                  <th>{{ value.network }}</th>
                  <th>{{ value.name }}</th>
                  <td>{{ value.epochs }}</td>
                  <td>{{ value.iterations }}</td>
                  <td>{{ value.learnTime }} s</td>
                  <td>{{ value.predictTime }} s</td>
                  <td />
                  <td />
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Results',
    computed: {
      ...mapState({
        modelTime: state => state.metrics.modelTime,
      }),
    },
    mounted() {
      // this.changeResultName(this.$route.params.resultname);
    },
  }
</script>

<style scoped>

</style>
