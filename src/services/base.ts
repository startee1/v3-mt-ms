/**
 * 用作 axios 基本的路由拦截
 */

import axios from "axios";
import type {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
const api:AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10*1000
})

api.interceptors.request.use(
  (config:InternalAxiosRequestConfig) => {
    let token = window.sessionStorage.getItem('token')
    if (token) {
      config.headers.token = token
    }
    return config
  }, 
  (_err:AxiosError) => {}
)
api.interceptors.response.use(
  (response:AxiosResponse) => {
    const { status, message, err } = response.data; 
    if (status === 1) {
      return response.data;
    } else {

      if (err) console.log(err) // 临时 console 调试


      if (message) {
        ElMessage.error(message);
      } else if (err) {
        ElMessage.error(err);
      } else {
        ElMessage.error('连接错误');
      }
      return null;
    }
  }, 
  (error: AxiosError) => {
    // 处理 HTTP 网络错误
    let message = "";
    // HTTP 状态码
    const status = error.response?.status;
    console.log('error',error)
    switch (status) {
      case 401:
        message = "token失效，请重新登录";
        // 这里可以触发退出的 action
        break;
      case 403:
        message = "没有权限,请获取权限后登录";
        break;
      case 404:
        message = "页面不存在";
        break;
      case 500:
        message = "服务器故障";
        break;
      case 502:
        message = "数据库查询错误";
        break;
      default:
        message = "网络连接错误";
    }
    ElMessage.error(message);
    return Promise.reject(error);
  }
)

export default api