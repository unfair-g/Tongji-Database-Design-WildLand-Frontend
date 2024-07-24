export default{
    state: {
        messages: [
            {  
                id: 1,  
                username: '张三',  
                timestamp: '1小时前',  
                content: '这是一条测试消息。',  
                avatarUrl: 'https://gd-hbimg.huaban.com/7968f776596196a8061e9ee0ee51c0606d785fc42400b-9aWWPH_fw236' // 假设的头像URL  
              },  
              {  
                id: 2,  
                username: '张三',  
                timestamp: '1小时前',  
                content: '这是一条测试消息。',  
                avatarUrl: 'https://gd-hbimg.huaban.com/7968f776596196a8061e9ee0ee51c0606d785fc42400b-9aWWPH_fw236' // 假设的头像URL  
              },  
              { id: 3, username: '李四', timestamp: '刚刚', content: '这是新加载的一条消息。',avatarUrl: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.uMf5AX3a6yYpIhpEkyDxiQAAAA?rs=1&pid=ImgDetMain' },  
            ], // 假设的tags列表  
          selectedTags: [] // 存储选中的tags  
    },
}