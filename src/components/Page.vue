<template>
  <div class="container is-fullhd">
    <p>{{ type }}</p>
    <h2>{{ neuralNetwork.name }}</h2>
    <LearnForm />
    <router-link to="/">
      back to main
    </router-link>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';
  import LearnForm from './elements/LearnForm.vue';
  export default {
    name: 'Page',
    components: {
      LearnForm
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
    }
  }
</script>

<style scoped>

</style>
