import { createRouter, createWebHistory } from 'vue-router';


// Components
import Main from '../views/Main.vue';
import Page from '../views/Page.vue';
import Results from '../views/Results.vue';
import NotFoundComponent from '../views/NotFoundComponent.vue';

const router = createRouter({
  history: createWebHistory(),
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

export default router;
