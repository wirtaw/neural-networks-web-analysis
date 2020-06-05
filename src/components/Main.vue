<template>
  <div>
    <figure>
      <img alt="Brain with neural networks" src="./../assets/brain-2062057_640.jpg" width="640" height="487"/>
      <figcaption>Image <a href="https://pixabay.com/ru/users/ElisaRiva-1348268">ElisaRiva</a> from stock <a href="https://pixabay.com/ru/">Pixabay</a></figcaption>
    </figure>
    <NeuralNetworks msg="Neural network analysis"/>
  </div>
</template>

<script>
  import NeuralNetworks from './NeuralNetworks.vue';
  export default {
    name: 'Main',
    components: {
      NeuralNetworks
    }
  }
</script>

<style scoped>

</style>
