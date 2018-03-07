import { getFetch, postFetch } from '@/base/fetch'

// 首页数据
export function getIndex (query) {
  return getFetch('index', query)
}

// 详情页
export function getFilmsDetail (filmId) {
  return getFetch(`films/${filmId}`)
}

export function createArticle (data) {
  return postFetch('/article/create', data)
}
