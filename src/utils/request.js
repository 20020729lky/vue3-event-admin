import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // 基地址，超过时间
  baseURL,
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 携带token
    const useStore = useUserStore()
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => {
    // 对请求错误做些什么
    return Promise.reject(err)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 对响应数据做点什么
    if (res.data.code === 0) {
      return res
    }
    ElMessage.error(res.data.message || '服务器异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // 对响应错误做点什么
    // 错误特殊情况401 权限不足或者身份过期 =>拦截
    if (err.response?.status === 401) {
      router.push('/login')
    }
    // 错误默认情况
    ElMessage.error(err.response.data.message || '服务器异常')

    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
