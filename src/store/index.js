import Vue from 'vue';
import Vuex from 'vuex';

import learnModel from './modules/learnModel.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    learnModel
  }
})
