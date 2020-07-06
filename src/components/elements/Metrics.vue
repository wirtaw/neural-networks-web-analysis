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
        <p
          v-for="(value, name) in modelTime"
          :key="`${name}-train-time`"
          class="menu-item"
        >
          <router-link :to="`/results`">
            {{ name }}
          </router-link>
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
        modelTime: state => state.metrics.modelTime,
      }),
    },
  }
</script>

<style scoped>

</style>
