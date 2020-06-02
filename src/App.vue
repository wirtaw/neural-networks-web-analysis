<template>
  <div id="app">
    <figure>
      <img alt="Brain with neural networks" src="./assets/brain-2062057_640.jpg" width="640" height="487"/>
      <figcaption>Image <a href="https://pixabay.com/ru/users/ElisaRiva-1348268">ElisaRiva</a> from stock <a href="https://pixabay.com/ru/">Pixabay</a></figcaption>
    </figure>
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
a, figure {
  display: inline-block;
}
figcaption {
  margin: 10px 0 0 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
figure {
  padding: 5px;
}
img:hover {
  transform: scale(1.1);
  -ms-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -o-transform: scale(1.1);
}
img {
  transition: transform 0.2s;
  -webkit-transition: -webkit-transform 0.2s;
  -moz-transition: -moz-transform 0.2s;
  -o-transition: -o-transform 0.2s;
}
</style>
