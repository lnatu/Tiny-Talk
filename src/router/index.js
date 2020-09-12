import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/account/activate/:token',
    name: 'AccountActivate',
    component: () => import('@/views/auth/ActivateAccount.vue')
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: () => import('@/views/contacts/ContactMain.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/auth/Signup.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/ProfileMain.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/search',
    name: 'SearchResult',
    component: () => import('@/views/users/UserSearch.vue'),
    meta: { requiresAuth: true }
  }
  /* {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( webpackChunkName: "about" '../views/About.vue')
  } */
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.GET_LOGIN_STATUS) {
      return next({
        name: 'Login'
      });
    }

    return next();
  }

  if (
    (store.getters.GET_LOGIN_STATUS && to.name === 'Login') ||
    (store.getters.GET_LOGIN_STATUS && to.name === 'Signup')
  ) {
    return next({ name: 'Home' });
  }

  next();
});

export default router;
