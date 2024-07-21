import { createStore } from 'vuex'
import user from './modules/user'
import camp from './modules/camp'
import product from './modules/product'
import order from './modules/order'
import tag from './modules/tag'
import flash from './modules/flash'

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
    user,
    camp,
    product,
    order,
    tag,
    flash
  }
})
