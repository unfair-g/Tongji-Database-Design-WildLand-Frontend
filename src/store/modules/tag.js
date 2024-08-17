export default{
    state: {
        tags: [
            {
              id:2,
              title:'推荐',
            image:require('@/assets/flash-1.png'),
            ps:'营地位于上海',
            similarTags:'营地推荐',
            },
            {
              id:1,
              title:'营地推荐',
              image:require('@/assets/flash-1.png'),
              ps:'营地位于上海',
              similarTags:'推荐',
            },
            {id:3,
              title:'营地',
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