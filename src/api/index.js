import fetch from '@/base/fetch'

export function getIndex (query) {
  return fetch({
    url: 'index',
    method: 'get',
    params: query
  })
}

export function fetchPv (pv) {
  return fetch({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle (data) {
  return fetch({
    url: '/article/create',
    method: 'post',
    data
  })
}
