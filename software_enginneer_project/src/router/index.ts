import { createRouter, createWebHistory } from 'vue-router';
const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  
  {
    path: '/index',
    name: 'index',
    redirect:'/index/home',
    component: () => import('../views/layout/Layout.vue'),
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
        path: '/detail/:questionId',
        name: 'detail',
        component: () => import('../views/details/details.vue'),
        children: []
      },
      {
        path: '/inform',
        name: 'inform',
        component: () => import('../views/Index/Inform.vue'),
        children: []
      },
      {
        path: '/search/:searchType/:content',
        name: 'search',
        component: () => import('../views/Index/Search.vue'),
        children: []
      },

    ]
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login.vue'),
    beforeEnter: (to, from, next) => {
      sessionStorage.isLogin=false
      next()
   }
  },

  {
    path: '/editQuestion',
    name: 'edit',
    component: () => import('../views/forum/createQuestion.vue'),
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

  // router.beforeEach((to,from,next)=>{
  //   const isLogin = sessionStorage.getItem('isLogin')==='true';
  //   console.log(  (isLogin||(to.name==="login")));

  //   if(isLogin||(to.name==='login')){
  //     console.log("notmylogin");
  //     next();
  //   }
  //   else{
  //     console.log("mylogin");
  //     next('/login');
  //   }
  // })
export default router;