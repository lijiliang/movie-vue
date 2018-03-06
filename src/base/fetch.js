/**
 * @fileOverview 获取数据方法
 * 参考：http://blog.csdn.net/qq673318522/article/details/55506650  一个项目学会前端实现登录拦截
 * http://blog.csdn.net/crper/article/details/77619067  给axios做个挺靠谱的封装(报错,鉴权,跳转,拦截,提示)
 * https://juejin.im/post/591aa14f570c35006961acac#heading-12
 * https://github.com/PanJiaChen/vue-element-admin/blob/master/src/utils/request.js
 * https://mp.weixin.qq.com/s/KabBPItayxBEv56_g9y6KQ
 */

/*
需求：
  统一捕获接口数据
  弹窗提示
  报错重定向
  基础鉴权
  表单序列化

实现：
  统一捕获接口数据： 用axios内置的拦截器
  弹窗提示： 引入一个组件进行弹窗
  报错重定向: 路由钩子
  基础鉴权： 服务端过期时间戳和token,还有借助路由的钩子
  表单序列化： qs模块
*/
import axios from 'axios'
import qs from 'qs'
import { Indicator, Toast } from 'mint-ui'
import { API_ROOT } from './config'

const fetch = axios.create({
  baseURL: API_ROOT,
  responseType: 'json',
  timeout: 5000, // request timeout
  // withCredentials: true, // 是否允许带cookie这些
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  }
})
// 请求拦截器
fetch.interceptors.request.use(config => {
  // 在发送请求之前做某些事
  // loading效果开始
  Indicator.open('Loading...')

  if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
    // 序列化
    config.data = qs.stringify(config.data)
  }
  // 若是需要做鉴权token，就给头部带上token
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token
  }
  return config
}, err => {
  // 错误弹窗
  return Promise.resolve(err)
})

// 响应拦截器
fetch.interceptors.response.use(res => {
  // 关闭loading效果
  Indicator.close()

  // 对响应回来的数据做些事
  /*
  if (res.data && !res.data.success) {
    // 如果服务器返回错误，就弹窗提示
    console.log(res.data.error.message)
    return Promise.reject(res.data.error.message)
  }
  */
  return res
}, err => {
  // 这里是处理需要重新登录, 404, 500相关处理
  console.log(err.response)
  Indicator.close()
  Toast('获取数据失败...')
  return Promise.resolve(err)
})

let base = ''
// get请求
export const getFetch = (url, params) => {
  return fetch({
    method: 'get',
    url: `${base}${url}`,
    params: params
  })
}

// post请求
export const postFetch = (url, params) => {
  return fetch({
    method: 'post',
    url: `${base}${url}`,
    data: params
  })
}

// put请求
export const putFetch = (url, params) => {
  return fetch({
    method: 'put',
    url: `${base}${url}`,
    data: params
  })
}

export const deleteFetch = (url) => {
  return fetch({
    method: 'delete',
    url: `${base}${url}`
  })
}
// 上传操作
export const uploadFileFetch = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// export default fetch

/*
axios 的一些配置

export default {
  // 请求地址
  url: "/user",
  // 请求类型
  method: "get",
  // 请根路径
  baseURL: "http://www.mt.com/api",
  // 请求前的数据处理
  transformRequest: [function(data) {}],
  // 请求后的数据处理
  transformResponse: [function(data) {}],
  // 自定义的请求头
  headers: { "x-Requested-With": "XMLHttpRequest" },
  // URL查询对象
  params: { id: 12 },
  // 查询对象序列化函数
  paramsSerializer: function(params) {},
  // request body
  data: { key: "aa" },
  // 超时设置s
  timeout: 1000,
  // 跨域是否带Token
  withCredentials: false,
  // 自定义请求处理
  adapter: function(resolve, reject, config) {},
  // 身份验证信息
  auth: { uname: "", pwd: "12" },
  // 响应的数据格式 json / blob /document /arraybuffer / text / stream
  responseType: "json",
  // xsrf 设置
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",

  // 下传和下载进度回调
  onUploadProgress: function(progressEvent) {
    Math.round(progressEvent.loaded * 100 / progressEvent.total);
  },
  onDownloadProgress: function(progressEvent) {},

  // 最多转发数，用于node.js
  maxRedirects: 5,
  // 最大响应数据大小
  maxContentLength: 2000,
  // 自定义错误状态码范围
  validateStatus: function(status) {
    return status >= 200 && status < 300;
  },
  // 用于node.js
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 用于设置跨域请求代理
  proxy: {
    host: "127.0.0.1",
    port: 8080,
    auth: {
      username: "aa",
      password: "2123"
    }
  },
  // 用于取消请求
  cancelToken: new CancelToken(function(cancel) {})
};
*/
