<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Blog post about - <a href="https://blog.poplauki.eu/ru/?p=779">link</a>
    </p>
    <h3>List of the neural network libraries</h3>
    <ul>
      <li><router-link to="/page/tensorflow">Tensorflow</router-link></li>
      <li><router-link to="/page/brainjs">BrainJS</router-link></li>
      <li><router-link to="/page/mindjsnet">Mindjs.net</router-link></li>
      <li><router-link to="/page/neurojs">neuro.js</router-link></li>
      <li><router-link to="/page/convnetjs">ConvNetJS</router-link></li>
      <li><router-link to="/page/neuralnet">neuralnet</router-link></li>
      <li><router-link to="/page/genericsjs">generics.js</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NeuralNetworks',
  props: {
    msg: String
  },
  computed: {
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
