import { getIndex } from '@/api'

export default {
  // 获取首页数据
  getAllList ({ commit, state }, params) {
    return getIndex({page: 1})
  }
}
