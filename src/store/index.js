import { createStore } from 'vuex'
import admin from './modules/admin'
import camp from './modules/camp'
import product from './modules/product'

export default createStore({
  state: {
    apiUrl: 'http://139.9.193.78' // 将你的IP地址存储在这里
  },
  getters: {
    getApiUrl: state => state.apiUrl
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    admin,
    camp,
    product
  }
})
