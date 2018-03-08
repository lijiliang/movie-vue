import Vue from 'vue'
import App from './App'
import router from './router'
import Fastclick from 'fastclick'
import store from './vuex/store'
import filters from './filters'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-teal.css' // 默认 teal 主题
// import 'mint-ui/lib/style.css'

Fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(MuseUI)
Vue.use(store)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
