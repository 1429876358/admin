import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import animated from 'animate.css' // npm install animate.css --save安装，在引入
import './assets/fonts/font.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(animated)
Vue.prototype.echarts = echarts
Vue.prototype.axios = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  // if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
  if (localStorage.getItem('JWToken')) { // 判断本地是否存在access_token
    next({
      path: '/homepage'
    })
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})
