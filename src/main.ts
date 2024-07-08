import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
import { store } from './store';

import { VueCsvImportPlugin } from 'vue-csv-import';

Vue.use(VueCsvImportPlugin);
Vue.config.productionTip = false;

createApp(App).$mount('#app');
