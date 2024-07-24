export default{
    state: {
        tags: [
            {
              title:'Tag1',
            image:require('@/assets/flash-1.png'),
            },
            {
              title:'Tag1',
              image:require('@/assets/flash-1.png'),
            },
            {
              title:'Tag1',
              image:require('@/assets/flash-1.png'),
            }], // 假设的tags列表  
          selectedTags: [] // 存储选中的tags  
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
}