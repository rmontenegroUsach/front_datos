import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CppView from '../views/CppView.vue'
import InMatNoCpp from '../views/InMatNoCpp.vue'
import Users from '../views/Users.vue'
import Login from '../views/Login.vue'
import store from '../store/index'
import jwt_decode from 'jwt-decode';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true, roles: ['User','Admin', 'Superadmin'] }
  },
  {
    path: '/noencpp',
    name: 'InMatNoCpp',
    component: InMatNoCpp,
    meta: { requiresAuth: true, roles: ['Admin', 'Superadmin'] }
  },
  {
    path: '/cpp',
    name: 'CppView',
    component: CppView,
    meta: { requiresAuth: true, roles: ['Admin', 'Superadmin'] }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { requiresAuth: true, roles: ['Superadmin'] }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const roles = to.meta.roles;
  const token = localStorage.getItem('token');

  if (requiresAuth && !token) {
    next('/login');
  } else if (requiresAuth && token) {
    const decoded = jwt_decode(token);
    const userRole = decoded.rol; 
    const userEmail = decoded.email; 

    if (roles.includes(userRole)) {
      store.commit('setToken', token);
      store.commit('setRol', userRole); //utiliza la mutación setRol para asignar el valor del rol al state
      store.commit('setEmail', userEmail);

      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
});
export default router
