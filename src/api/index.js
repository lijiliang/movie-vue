import { getFetch, postFetch } from '@/base/fetch'

// 首页数据
export function getIndex (params) {
  return getFetch('index', params)
}
// 详情页
export function getFilmsDetail (filmId) {
  return getFetch(`films/${filmId}`)
}
// 电影列表
export function getFilmsList (params) {
  return getFetch(`films`, params)
}
// 电视列表
export function getTvList (params) {
  return getFetch('tvs', params)
}

export function createArticle (data) {
  return postFetch('/article/create', data)
}
