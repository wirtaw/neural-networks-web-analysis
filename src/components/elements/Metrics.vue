<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <h5>Metrics</h5>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <p class="menu-label title is-5">
          Times:
        </p>
        Train:<br>
        <p
          v-for="(value, name, index) in trainTime"
          :key="`train-time-${index}`"
          class="menu-item"
        >
          {{ name }} - {{ value }} s
        </p>
        Predict:<br>
        <p
          v-for="(value, name, index) in predictTime"
          :key="`predict-time-${index}`"
          class="menu-item"
        >
          {{ name }} - {{ value }} s
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'Metrics',
    computed: {
      ...mapState({
        trainTime: state => state.metrics.trainTime,
        predictTime: state => state.metrics.predictTime,
      }),
    },
  }
</script>

<style scoped>

</style>
