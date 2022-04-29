import Vue from 'vue'
import App from './App.vue'
// 适配
import "@/mobile/flexible"
// 初始化
import "@/styles/reset.css"
// 引入路由文件
import router from '@/router'
// 引入vant组件
import '@/Vant'
// import 'vant/lib/index.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
