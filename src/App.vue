<template>
  <div id="app">
    <img alt="Brain" src="./assets/brain-2062057_640.jpg">
    <caption>Image <a href="https://pixabay.com/ru/users/ElisaRiva-1348268">ElisaRiva</a> from stock <a href="https://pixabay.com/ru/">Pixabay</a></caption>
    <NeuralNetworks msg="Neural network analysis"/>
  </div>
</template>

<script>
import NeuralNetworks from './components/NeuralNetworks.vue';

export default {
  name: 'App',
  components: {
    NeuralNetworks
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
