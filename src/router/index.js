import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index')

  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/userinfo/register.vue')
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component: () => import('../views/homepage/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
