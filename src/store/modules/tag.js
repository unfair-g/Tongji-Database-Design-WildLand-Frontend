export default{
    state: {
        tags: [
            {
              title:'Tag1',
            image:require('@/assets/flash-1.png'),
            ps:'营地位于上海',
            similarTags:'营地推荐',
            },
            {
              title:'Tag1',
              image:require('@/assets/flash-1.png'),
              ps:'营地位于上海',
              similarTags:'推荐',
            },
            {
              title:'Tag1',
              image:require('@/assets/flash-1.png'),
              ps:'营地位于上海',
              similarTags:'推荐',
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