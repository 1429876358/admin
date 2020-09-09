import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'MapGaoDe',
    component: () => import('../views/MapGaoDe.vue'),
    children: [
      {
        path: 'homechilren',
        name: 'HomeChilren',
        component: () => {
          import ('../views/HomeChilren.vue')
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/userinfo/login.vue')

  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/userinfo/register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
