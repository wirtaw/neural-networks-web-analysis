import Vue from 'vue';
import Router from 'vue-router';

// Components
import Main from '@/views/Main.vue';
import Page from '@/views/Page.vue';
import Results from '@/views/Results.vue';
import NotFoundComponent from '@/views/NotFoundComponent.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    // routes
    { name: 'home', path: '/', component: Main },
    { name: 'page', path: '/page/:neuralname', component: Page },
    { name: 'results', path: '/results', component: Results },
    { path: '*', component: NotFoundComponent }
  ],
});
