export default{
    state: {
        messages: [
            {  
                id: 1,  
                type:'follow',
                username: '张三',  
                timestamp: '1小时前',  
                content: '这是一条测试消息。',  
                avatarUrl: 'https://gd-hbimg.huaban.com/7968f776596196a8061e9ee0ee51c0606d785fc42400b-9aWWPH_fw236' // 假设的头像URL  
              },  
              {  
                id: 2,  
                username: '张三',  
                type:'activity',
                timestamp: '1小时前',  
                title: '上海滴水湖组队——露营爱好者来！',  
                state:'待审核',
                avatarUrl: 'https://gd-hbimg.huaban.com/7968f776596196a8061e9ee0ee51c0606d785fc42400b-9aWWPH_fw236' // 假设的头像URL  
              },  
              { id: 3, username: '李四',
                type:'report',
                timestamp: '刚刚',
                title: '泉州露营溯溪好去处 | 营地超详细攻略来了',
                state: '待审核',
                avatarUrl: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.uMf5AX3a6yYpIhpEkyDxiQAAAA?rs=1&pid=ImgDetMain'
              },  
              { id: 4, username: '王五',
                type:'rent',
                timestamp: '刚刚',
                title: '折叠椅-十分好用，安利一下',
                state: '已发货',
                avatarUrl: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.uMf5AX3a6yYpIhpEkyDxiQAAAA?rs=1&pid=ImgDetMain'
              }, 
            ] 
    },
    mutations: {  
      addPaymentSuccessMessage(state, message) {  
        state.messages.push(message);  
      } 
    }
}