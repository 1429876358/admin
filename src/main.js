import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import echarts from 'echarts'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import animated from 'animate.css' // npm install animate.css --save安装，在引入
import './assets/font/font.css'

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
