import Vue from 'vue';
import Vuex from 'vuex';

import learnModel from './modules/learnModel.js';
import metrics from './modules/metrics.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    learnModel,
    metrics
  }
})
