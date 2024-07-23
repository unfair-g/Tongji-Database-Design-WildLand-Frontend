import { createStore } from 'vuex'
import user from './modules/user'
import camp from './modules/camp'
import product from './modules/product'
import order from './modules/order'
import admin from './modules/admin'
import flash from './modules/flash'
import tag from './modules/tag'
import message from './modules/message'

export default createStore({
  actions: {
  },
  modules: {
    user,
    camp,
    product,
    order,
    admin,
    flash,
    message
    tag,
    flash,
    admin
  }
})
