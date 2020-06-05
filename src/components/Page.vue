<template>
  <div>
    <p>{{ type }}</p>
    <p> {{ neuralNetwork.name }} neuralname</p>
    <router-link to="/">back to main</router-link>
  </div>
</template>

<script>
  export default {
    name: 'Page',
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
    props: {
      type: String
    },
    computed: {
      neuralNetwork() {
        return (this.$route.params.neuralname in this.networks)
          ? this.networks[this.$route.params.neuralname] : { name : 'unknown'}
      }
    },
    methods: {
      goBack() {
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
      }
    }
  }
</script>

<style scoped>

</style>
