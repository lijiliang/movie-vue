import { getIndex, getFilmsDetail, getFilmsList, getTvList } from '@/api'

export default {
  // 获取首页数据
  getAllList ({ commit, state }, params) {
    return getIndex({page: 1})
  },
  // 获取详情页
  getFilmsDetail ({ commit, state }, params) {
    return getFilmsDetail(params.film_id)
  },
  // 电影列表
  getFilmsList ({ commit, state }, params) {
    return getFilmsList({page: params.page})
  },
  // 电视列表
  getTvList ({ commit, state }, params) {
    return getTvList({page: params.page})
  }
}
