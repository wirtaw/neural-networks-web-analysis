import Vue from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';

import { VueCsvImportPlugin } from 'vue-csv-import';

Vue.use(VueCsvImportPlugin);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
