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
                {{ neuralNetwork.name }}
              </h1>
              <h4 class="subtitle">
                {{ type }}
              </h4>
              <h4>
                Status - {{ trainStatus }}
              </h4>
              <ul class="steps">
                <li :class="{'steps-segment': true, 'is-active': getStepClass(1)}">
                  <a
                    href="#"
                    class="steps-marker"
                  />
                  <div class="steps-content is-divider-content">
                    <p class="is-size-4">
                      Load data
                    </p>
                  </div>
                </li>
                <li :class="{'steps-segment': true, 'is-active': getStepClass(2)}">
                  <a
                    href="#"
                    class="steps-marker"
                  />
                  <div class="steps-content is-divider-content">
                    <p class="is-size-4">
                      Train network
                    </p>
                  </div>
                </li>
                <li :class="{'steps-segment': true, 'is-active': getStepClass(3)}">
                  <span class="steps-marker" />
                  <div class="steps-content is-divider-content">
                    <p class="is-size-4">
                      Fill predict data
                    </p>
                  </div>
                </li>
                <li :class="{'steps-segment': true, 'is-active': getStepClass(4)}">
                  <span class="steps-marker" />
                  <div class="steps-content is-divider-content">
                    <p class="is-size-4">
                      Make predict
                    </p>
                  </div>
                </li>
                <li :class="{'steps-segment': true, 'is-active': getStepClass(5)}">
                  <span class="steps-marker" />
                </li>
              </ul>
              <router-link to="/">
                back to main
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-narrow">
            <aside
              class="is-medium menu"
              style="width: 200px;"
            >
              <p class="menu-label title is-5">
                categories
              </p>
              <ul class="menu-list">
                <li>
                  <a
                    href="#learnform"
                    class="is-active"
                  > Learn form</a>
                </li>
                <li>
                  <a
                    href="#pitcherform"
                    class="is-active"
                  > Sensor data form</a>
                </li>
                <li class="is-right">
                  <a
                    href="#trainingaccuracy"
                    class="is-active"
                  > Training accuracy</a>
                </li>
              </ul>
            </aside>
          </div>
          <div class="column">
            <div class="content is-medium">
              <div class="columns">
                <div class="column is-12">
                  <LearnForm :net-name="neuralNetwork.name" />
                </div>
              </div>
              <div class="columns">
                <div class="column is-12">
                  Import training and test data
                  <ImportData />
                </div>
              </div>
              <div class="columns">
                <div class="column is-12">
                  Predict
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import LearnForm from './elements/LearnForm.vue';
  import ImportData from './elements/ImportData.vue';

  export default {
    name: 'Page',
    components: {
      LearnForm,
      ImportData
    },
    props: {
      type: {
        type: String,
        default: 'Name of the network',
      }
    },
    data () {
      return {
        networks: {
          'tensorflow': {
            name: 'tensorflow'
          },
          'brainjs': {
            name: 'BrainJS'
          },
          'mindjsnet': {
            name: 'Mindjs.net'
          },
          'neurojs': {
            name: 'neuro.js'
          },
          'convnetjs': {
            name: 'ConvNetJS'
          },
          'neuralnet': {
            name: 'neuralnet'
          },
          'genericsjs': {
            name: 'generics.js'
          }
        }
      }
    },
    computed: {
      ...mapState({
        learnData: state => state.learnModel.learnData,
        testData: state => state.learnModel.testData,
        trainStatus: state => state.learnModel.trainStatus,
      }),
      neuralNetwork() {
        return (this.$route.params.neuralname in this.networks)
          ? this.networks[this.$route.params.neuralname] : { name : 'unknown'}
      }
    },
    mounted() {
      this.changeLibraryType(this.$route.params.neuralname);
    },
    methods: {
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      },
      ...mapActions({
        changeLibraryType: 'learnModel/changeLibraryType',
      }),
      getStepClass(num) {
        let result = false;

        if (num === 2 && this.learnData && this.testData) {
          result = true;
        } else if (num === 1 && !this.learnData && !this.testData) {
          result = true;
        }

        return result;
      }
    }
  }
</script>

<style scoped>
.padding-no {
  padding: 0;
}
</style>
