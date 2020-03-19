const axios = require('axios')

const get = async (url, params, headers) => axios({
  url,
  params,
  headers,
  method: 'get'
})

const post = async (url, data, headers) => axios({
  url,
  data,
  headers,
  method: 'post'
})

const patch = async (url, data, headers) => axios({
  url,
  data,
  headers,
  method: 'patch'
})

module.exports = {
  get,
  post,
  patch
}
