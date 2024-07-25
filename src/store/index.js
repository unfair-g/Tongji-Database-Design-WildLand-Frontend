import { createStore } from 'vuex'
import user from './modules/user'
import camp from './modules/camp'
import product from './modules/product'
import order from './modules/order'
import tag from './modules/tag'
import flash from './modules/flash'
import admin from './modules/admin'
import message from './modules/message'
import post from './modules/post'

export default createStore({
  actions: {
  },
  modules: {
    user,
    camp,
    order,
    admin,
    flash,
<<<<<<< HEAD
    message,
    product,
    tag,
=======
    message，
    product,
    tag,
    flash,
>>>>>>> a7c12f2046547b92905608057ee339666e142b90
    post
  }
})
