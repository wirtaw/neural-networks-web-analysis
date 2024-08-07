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
              <h4 v-if="trainStatus && trainStatus !== ''">
                Status - {{ trainStatus }}
              </h4>
              <ul class="steps has-text-center">
                <li :class="{'steps-segment': true, 'is-active': activeStep === 1}">
                  <span class="steps-marker" />
                  <div class="steps-content is-divider-content">
                    <p class="is-size-4">
                      Load data
                    </p>
                  </div>
                </li>
                <li :class="{'steps-segment': true, 'is-active': activeStep === 2}">
                  <span class="steps-marker" />
                  <div class="steps-content is-divider-content">
                    <p class="is-size-4">
                      Train network
                    </p>
                  </div>
                </li>
                <li :class="{'steps-segment': true, 'is-active': activeStep === 3}">
                  <span class="steps-marker" />
                  <div class="steps-content is-divider-content">
                    <p class="is-size-4">
                      Fill predict data
                    </p>
                  </div>
                </li>
                <li :class="{'steps-segment': true, 'is-active': activeStep === 4}">
                  <span class="steps-marker" />
                  <div class="steps-content is-divider-content">
                    <p class="is-size-4">
                      Make predict
                    </p>
                  </div>
                </li>
                <li :class="{'steps-segment': true, 'is-active': activeStep === 5}">
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
              <Menu />
            </aside>
          </div>
          <div class="column">
            <div class="content is-medium">
              <div
                v-if="predictClassName"
                class="columns"
              >
                <div class="column is-12">
                  {{ predictClassName }}
                </div>
              </div>
              <div class="columns">
                <div class="column is-12">
                  <PredictForm :net-name="neuralNetwork.name" />
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { mapState, mapActions } from 'vuex';
  import LearnForm from '@/components/elements/LearnForm.vue';
  import ImportData from '@/components/elements/ImportData.vue';
  import PredictForm from '@/components/elements/PredictForm.vue';
  import Menu from '@/components/elements/Menu.vue';

  export default {
    name: 'Page',
    components: {
      LearnForm,
      ImportData,
      PredictForm,
      Menu
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
        },
        activeStep: 1,
      }
    },
    computed: {
      ...mapState({
        learnData: state => state.learnModel.learnData,
        testData: state => state.learnModel.testData,
        trainStatus: state => state.learnModel.trainStatus,
        predictClassName: state => state.learnModel.predictClassName,
      }),
      neuralNetwork() {
        return (this.$route.params.neuralname in this.networks)
          ? this.networks[this.$route.params.neuralname] : { name : 'unknown'}
      }
    },
    watch: {
      trainStatus(to, from) {
        switch(to){
          case 'importData':
            this.activeStep = 2;
            break;
          case 'train':
            this.activeStep = 3;
            break;
          case 'trainComplete':
            this.activeStep = 4;
            break;
          case 'predict':
            this.activeStep = 5;
            break;
          default:
            this.activeStep = 1;
            break;
        }
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
      })
    }
  }
</script>

<style scoped>
.padding-no {
  padding: 0;
}
</style>
(: { learnModel: { learnData: any; }; })(: { learnModel: { testData: any; }; })(: { learnModel: { trainStatus: any; }; })(: { learnModel: { predictClassName: any; }; }): any: any