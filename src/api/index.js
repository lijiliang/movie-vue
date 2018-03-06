import { getFetch, postFetch } from '@/base/fetch'

export function getIndex (query) {
  return getFetch('index', query)
}

export function createArticle (data) {
  return postFetch('/article/create', data)
}
