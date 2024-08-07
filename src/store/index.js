import { createStore } from 'vuex'
import camp from './modules/camp'
import camp_order from './modules/camp_order'
import product from './modules/product'
import order from './modules/order'
import tag from './modules/tag'
import flash from './modules/flash'
import admin from './modules/admin'
import message from './modules/message'
import post from './modules/post'
import lease from './modules/lease'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    camp,
    camp_order,
    order,
    product,
    tag,
    flash,
    admin,
    message,
    post,
    lease
  }
})
