// axios.js
import axios from 'axios';
import { ElLoading } from 'element-plus';

const instance = axios.create({
  baseURL: 'https://localhost:7218'
});

let loadingInstance;

instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  loadingInstance = ElLoading.service({
    fullscreen: true,
    text: 'Loading....'
  });
  return config;
}, error => {
  // 对请求错误做些什么
  if (loadingInstance) loadingInstance.close();
  return Promise.reject(error);
});

instance.interceptors.response.use(response => {
  // 对响应数据做点什么
  if (loadingInstance) loadingInstance.close();
  return response;
}, error => {
  // 对响应错误做点什么
  if (loadingInstance) loadingInstance.close();
  return Promise.reject(error);
});

export default instance;
