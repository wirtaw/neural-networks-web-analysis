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
          v-for="(value, name) in trainTime"
          :key="`${name}-train-time`"
          class="menu-item"
        >
          {{ name }} - {{ value.time }} s
        </p>
        Predict:<br>
        <p
          v-for="(value, name) in predictTime"
          :key="`${name}-predict-time`"
          class="menu-item"
        >
          {{ name }} - {{ value.time }} s
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
