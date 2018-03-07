import { getIndex, getFilmsDetail } from '@/api'

export default {
  // 获取首页数据
  getAllList ({ commit, state }, params) {
    return getIndex({page: 1})
  },
  // 获取详情页
  getFilmsDetail ({ commit, state }, params) {
    return getFilmsDetail(params.film_id)
  }
}
