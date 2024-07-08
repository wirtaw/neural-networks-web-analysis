<template>
  <div class="container">
    <div class="columns">
      <div class="column">
        <h5>Results</h5>
      </div>
    </div>
    <div
      v-if="activeStep"
      class="columns"
    >
      <div class="column">
        <router-link
          :to="`/results`"
        >
          results
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { mapState } from 'vuex';

  export default {
    name: 'Menu',
    data () {
      return {
        activeStep: 1,
      }
    },
    computed: {
      ...mapState({
        trainStatus: state => state.learnModel.trainStatus,
      }),
    },
    watch: {
      trainStatus(to, from) {
        switch(to){
          case 'trainComplete':
            this.activeStep = 1;
            break;
          case 'predict':
            this.activeStep = 1;
            break;
          default:
            this.activeStep = 0;
            break;
        }
      }
    },
  }
</script>

<style scoped>

</style>
