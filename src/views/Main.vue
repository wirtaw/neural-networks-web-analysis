<template>
  <div>
    <figure>
      <img
        alt="Brain with neural networks"
        src="./../assets/brain-2062057_640.jpg"
        width="640"
        height="487"
      >
      <figcaption>Image <a href="https://pixabay.com/ru/users/ElisaRiva-1348268">ElisaRiva</a> from stock <a href="https://pixabay.com/en/">Pixabay</a></figcaption>
    </figure>
    <NeuralNetworks msg="This interactive single-page application (SPA) demonstrates the power of neural networks for sports analytics.

  Using the classic example of predicting baseball player types (pitcher, catcher, etc.) based on how they throw a ball, we'll compare the performance and capabilities of several popular JavaScript neural network libraries:

Key Features:

    Live Throwing Analysis: Capture video of a baseball throw directly in your browser or upload a pre-recorded clip. The SPA will analyze the motion, speed, and trajectory of the ball.
    Real-time Prediction: Watch as different neural network models, built with libraries like TensorFlow.js, Brain.js, and Synaptic.js, simultaneously process the data and provide predictions on the player type.
    Performance Comparison: See instant side-by-side results comparing the accuracy, speed, and resource usage of each model.
    Interactive Model Exploration: Dive deeper into the architecture and hyperparameters of each neural network. Experiment with adjustments to see how they impact prediction outcomes.
    Mobile-Friendly Design: The SPA is optimized for both desktop and mobile devices, so you can analyze throws anywhere.

Why This Matters:

    Machine Learning in Sports: This app showcases how machine learning can be applied to real-world sports scenarios, potentially uncovering insights for player development and scouting.
    JavaScript Neural Networks: The comparison of JavaScript libraries highlights the evolving landscape of web-based machine learning tools.
    Accessible Education: The intuitive interface and clear explanations make complex neural network concepts approachable for a wide audience.

Technical Highlights:

    TensorFlow.js Backbone: The core neural network models leverage the power of TensorFlow.js for its extensive capabilities and browser compatibility.
    Vue.js Framework: The SPA is built with Vue.js for its flexibility, ease of use, and excellent performance, providing a smooth, dynamic user experience.
    User-Friendly Data Visualization: Charts and graphs clearly display the results for easy comparison." />
  </div>
</template>

<script>
  import NeuralNetworks from '@/components/NeuralNetworks.vue';
  export default {
    name: 'Main',
    components: {
      NeuralNetworks
    }
  }
</script>

<style scoped>

</style>
