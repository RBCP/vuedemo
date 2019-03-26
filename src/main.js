// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false

import '@/styles/index.scss'
import '@/icons'
Vue.use(ElementUI)
new Vue({
  el:'#app',
  router,
  store,
  template:'<App/>',
  components:{App}
})
