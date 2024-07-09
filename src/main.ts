import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
//import { store } from './store';

import VueCsvImport from 'vue-csv-import';

//config.productionTip = false;

const app = createApp(App);

app.use(VueCsvImport);
app.use(router);

app.mount('#app');
