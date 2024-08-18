<template>  
    <div>  
      <div class="messages">  
        <div v-for="message in filteredMessages" :key="message.id"> 
          <!-- 头像 -->
          <div  class="message">  
          <div v-if="message.type==='follow'" class="message-avatar" style="margin-right: 1%;">  
            <img :src="message.avatarUrl" alt="头像" class="avatar">  
          </div>  
          <!-- 用户名和消息内容 -->  
          <div v-if="message.type==='follow'" class="message-info">  
            <div class="message-header">  
              <span class="username">{{ message.username }}</span>  
            </div>  
            <div class="message-content">  
              <p>关注了你</p>  
            </div>  
          </div>
          <div v-else-if="message.type==='activity'" class="message-info" @click="handleClick">  
            <div class="message-header">  
              <span class="username">{{ message.title }}</span>  
            </div>  
            <div class="message-content">  
              <span  style="color:black">报名状态：</span>
              <span v-if="message.state==='待审核'">{{message.state}}</span>  
              <span v-else-if="message.state==='审核通过'" style="color:green">{{message.state}}</span>  
              <span v-else style="color:red">{{message.state}}</span>  
            </div>  
          </div>    
           <div v-else-if="message.type==='report'" class="message-info" @click="handleClick">  
            <div class="message-header">  
              <span class="username">{{ message.title }}</span>  
            </div>  
            <div class="message-content">  
              <span  style="color:black">举报状态：</span>
              <span v-if="message.state==='待审核'">{{message.state}}</span>  
              <span v-else-if="message.state==='审核通过'" style="color:green">{{message.state}}</span>  
              <span v-else style="color:red">{{message.state}}</span>  
            </div>  
          </div>   
          <div v-else class="message-info" @click="handleClick(message)">  
            <div class="message-header">  
              <span class="username">{{ message.title }}</span>
              <span class="username">{{ message.content }}</span>   
            </div>  
            <div class="message-content">  
              <span  style="color:black">订单状态：</span>
              <span v-if="message.order_status===1">已支付</span>  
              <span v-else-if="message.order_state===2" style="color:green">已发货</span>  
              <span v-else style="color:red">已收货</span>  
            </div>  
          </div> 
          <!-- 时间戳 -->  
          <div class="message-timestamp">  
            <div class="timestamp">{{ message.timestamp }}</div> 
            <el-link v-if="message.type==='report'||message.type==='activity'||message.type==='rent'" type="primary" @click="handleClick(message)">查看详情</el-link>  
          </div>
          </div>
          <el-divider />
        </div>
      </div>  
    </div>  
  </template> 
    
  <script>  
  import axios from '@/axios'
  import  globalState  from '../store/global'; // 引入 global.js 中的状态

  export default {
  name: 'personal_message',
  props: {
    activeTab: String
  },
  data() {  
  return {  
    filteredMessages: [], // 初始化空数组  

    // 其他数据...  
  };  
},  
watch: {  
  activeTab(newVal) {  
    if (newVal === 'rent') {  
      this.fetchRentMessages();  
    } else {  
      // 如果需要，可以根据newVal设置filteredMessages的默认值  
      this.filteredMessages = this.calculateFilteredMessages();  
    }  
  },  
}, 
  methods: {
    handleClick(message){
      if (this.activeTab === 'tip-off') {
        //  this.$router.push({ name: 'myPostReport', params: { id: 1 } });
      }
      if(message.type === 'rent')
      {
        console.log(message)
        console.log(message.order_id)
        this.$router.push({ path: `/home/userspace/leaseorder/${message.order_id}`,
          query: {  
            ldleitemsPostId: message.order_id
        }})
      }
    },
    async fetchRentMessages() {  
    try {  
      // 调用第一个API以获取购买信息  
    const response = await axios.get(`/api/Purchases/GetPurchasesByUserId?user_id=${globalState.userId}`);  
    let purchases = response.data;  
  
    // 初始化一个空数组来存储增强后的消息  
    let enhancedMessages = [];  
  
    // 遍历购买信息，对每个购买项执行异步操作  
    for (let purchase of purchases) {  
      try {  
        // 调用第二个API以获取帖子的详细信息  
        const postResponse = await axios.get(`api/Posts/GetPostDetail/${purchase.post_id}/${globalState.userId}`);  
        let post = postResponse.data;  
  
        // 将帖子的title和content添加到购买项中  
        purchase.title = post.title;  
        purchase.content = post.content; 
        purchase.timestamp = this.formatDate(purchase.order_date);
        purchase.type='rent';
  
        // 将增强后的购买项添加到数组中  
        enhancedMessages.push(purchase); 
        console.log(enhancedMessages) 
      } catch (postError) {  
        // 处理获取帖子信息时的错误  
        console.error(`Error fetching post details for post_id ${purchase.post_id}:`, postError);  
      }  
    }  
  
    // 将增强后的消息数组赋值给filteredMessages（假设这是组件的data属性）  
    this.filteredMessages = enhancedMessages;  
    console.log(this.filteredMessages)
  } catch (error) {  
    // 处理调用第一个API时的错误  
    console.error('Error fetching purchases:', error);  
    // 处理错误，例如显示错误消息  
    // 注意：这里不能使用this.filteredMessages，除非这个函数是Vue组件的方法  
  }
  },  
  formatDate(dateTimeString) {  
      // 创建一个Date对象  
      const date = new Date(dateTimeString);  
  
      // 使用getFullYear(), getMonth() + 1, 和 getDate() 方法来获取年、月和日  
      // 注意：getMonth() 返回的是从0开始的月份，所以需要加1  
      const year = date.getFullYear();  
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 使用padStart确保月份是两位数  
      const day = date.getDate().toString().padStart(2, '0'); // 使用padStart确保日期是两位数  
  
      // 返回格式化的日期字符串  
      return `${year}-${month}-${day}`;   
      }, 
  calculateFilteredMessages() {  
    if(this.activeTab === 'rent'){
      this.fetchRentMessages()
    }
    if (this.activeTab === 'all') {  
      return this.$store.state.message.messages;  
    }  
    return this.$store.state.message.messages.filter(message => message.type.includes(this.activeTab));  
  }, 
  }
} 
  </script>  
    
  <style scoped>  
  .message {  
  display: flex;  
  align-items: flex-start; /* 垂直对齐顶部 */  
  margin-bottom: 1%;
}  
  
.message-avatar {  
  margin-right: 10px; /* 头像与右侧内容之间的间距 */  
}  
  
.avatar {  
  width: 50px;  
  height: 50px;  
  border-radius: 50%;  
}  
  
.message-info {  
  flex-grow: 1; /* 使得用户名和消息内容占据剩余空间 */  
  display: flex;  
  flex-direction: column; /* 垂直排列用户名和消息内容 */  
}  
.message-header {  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  font-weight: bold; 
  font-size: 18px;
  margin-bottom: 5px;
}

.message-content{
  font-size: large;
  color:gray;
}
  
.message-timestamp {  
  margin-left: auto; /* 将时间戳推到最右边 */  
  margin-right: 5%;
  align-self: center; /* 垂直居中时间戳（可选） */  
}  
  </style>