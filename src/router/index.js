import Vue from 'vue';
import Router from 'vue-router';

// Components
import Main from './../components/Main.vue';
import Page from './../components/Page.vue';
import NotFoundComponent from './../components/NotFoundComponent.vue';

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes: [
    // routes
    { name: 'home', path: '/', component: Main },
    { name: 'page', path: '/page/:neuralname', component: Page },
    { path: '*', component: NotFoundComponent }
  ],
});
