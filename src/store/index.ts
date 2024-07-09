import Vue from 'vue';
import Vuex from 'vuex';

import learnModel from './modules/learnModel';
import metrics from './modules/metrics';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    learnModel,
    metrics
  }
})
