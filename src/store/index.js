import { createStore } from 'vuex'
import user from './modules/user'
import camp from './modules/camp'
import product from './modules/product'
import order from './modules/order'

export default createStore({
  state: {
    tags: [
      {
        title: 'Tag1',
        image: require('@/assets/flash-1.png'),
      },
      {
        title: 'Tag1',
        image: require('@/assets/flash-1.png'),
      },
      {
        title: 'Tag1',
        image: require('@/assets/flash-1.png'),
      }], // 假设的tags列表  
    selectedTags: [] // 存储选中的tags  
  },
  getters: {
  },
  mutations: {
    toggleTag(state, tag) {
      const index = state.selectedTags.indexOf(tag);
      if (index > -1) {
        state.selectedTags.splice(index, 1);
      } else {
        state.selectedTags.push(tag);
      }
    }
  },
  actions: {
  },
  modules: {
    user,
    camp,
    product,
    order
  }
})
