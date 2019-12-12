import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Play from '@/components/Play';
import Scoreboard from '@/components/Scoreboard';
import Setup from '@/components/Setup';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    },
    {
      path: '/scoreboard',
      name: 'Scoreboard',
      component: Scoreboard
    },
    {
      path: '/setup',
      name: 'Setup',
      component: Setup
    }
  ]
});
