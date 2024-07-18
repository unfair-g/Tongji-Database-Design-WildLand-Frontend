import { createStore } from 'vuex'
import user from './modules/user'
import camp from './modules/camp'
import product from './modules/product'

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
    product
  }
})
