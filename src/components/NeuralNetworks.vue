<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      Blog post about - <a href="https://blog.poplauki.eu/ru/?p=779">link</a>
    </p>
    <h3>List of the neural network libraries</h3>
    <ul>
      <li><a href="#" target="_blank" rel="noopener">Tensorflow</a></li>
      <li><a href="#" target="_blank" rel="noopener">BrainJS</a></li>
      <li><a href="#" target="_blank" rel="noopener">Mindjs.net</a></li>
      <li><a href="#" target="_blank" rel="noopener">neuro.js</a></li>
      <li><a href="#" target="_blank" rel="noopener">ConvNetJS</a></li>
      <li><a href="#" target="_blank" rel="noopener">neuralnet</a></li>
      <li><a href="#" target="_blank" rel="noopener">generics.js</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'NeuralNetworks',
  props: {
    msg: String
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
