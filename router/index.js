import Vue from 'vue';
import Router from 'vue-router';

// Components
import Main from './../src/components/Main.vue';
import Page from './../src/components/Page.vue';
import NotFoundComponent from './../src/components/NotFoundComponent.vue';

Vue.use(Router);

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    // routes
    { name: 'home', path: '/', component: Main },
    { name: 'page', path: '/page/:neuralname', component: Page },
    { path: '*', component: NotFoundComponent }
  ],
});
