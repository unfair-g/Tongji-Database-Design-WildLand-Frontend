import { createStore } from 'vuex'
import user from './modules/user'
import camp from './modules/camp'
import camp_order from './modules/camp_order'
import product from './modules/product'
import order from './modules/order'
import tag from './modules/tag'
import flash from './modules/flash'
import admin from './modules/admin'
import message from './modules/message'
import post from './modules/post'

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
    user,
    camp,
    camp_order,
    order,
    product,
    tag,
    flash,
    admin,
    message,
    post
  }
})
