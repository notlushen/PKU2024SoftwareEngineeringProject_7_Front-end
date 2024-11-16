import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/index/Home.vue';
import Question from '@/views/index/Question.vue';
import Team from '@/views/index/Team.vue';


const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  
  {
    path: '/index',
    name: 'index',
    redirect:'/index/home',
    component: () => import('../components/layout/Index.vue'),
    children: [
      {
        path: '/index/home',
        name: 'home',
        component: () => import('../views/Index/Home.vue'),
        children: []
      },
      {
        path: '/index/question',
        name: 'question',
        component: () => import('../views/Index/Question.vue'),
        children: []
      },
      {
        path: '/index/team',
        name: 'team',
        component: () => import('../views/Index/Team.vue'),
        children: []
      },
      {
        path: '/detail',
        name: 'detail',
        component: () => import('../views/details/index.vue'),
        children: []
      },
    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/index.vue'),
   
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;