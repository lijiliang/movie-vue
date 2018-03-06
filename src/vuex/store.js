import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'

import user from './modules/user'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)
Vue.config.debug = debug

export default new Vuex.Store({
  actions,
  modules: {
    user
  },
  strict: debug
})
