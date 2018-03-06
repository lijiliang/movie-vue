const state = {
  is_login: false,
  self_user: {}
}

const mutations = {
  'SET_SELF_USER' (state, user) {
    state.self_user = user
  },
  'SEL_IS_LOGIN' (state, isLogin) {
    state.is_login = isLogin
  },
  'UPDATE_SELF_USER' (state, userinfo) {
    for (let key in userinfo) {
      state.self_user[key] = userinfo[key]
    }
  }
}

export default {
  state,
  mutations
}
