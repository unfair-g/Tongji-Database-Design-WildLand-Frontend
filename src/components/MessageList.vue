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
           <div v-else class="message-info" @click="handleClick">  
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
          <!-- 时间戳 -->  
          <div class="message-timestamp">  
            <div class="timestamp">{{ message.timestamp }}</div> 
            <el-link v-if="message.type==='report'||message.type==='activity'" type="primary">查看详情</el-link>  
          </div>
          </div>
          <el-divider />
        </div>
      </div>  
    </div>  
  </template> 
    
  <script>  
  export default {
  name: 'personal_message',
  props: {
    activeTab: String
  },
  computed: {
    filteredMessages () {
      if (this.activeTab === 'all') {
        return this.$store.state.message.messages
      } else {
        return this.$store.state.message.messages.filter(message => message.type.includes(this.activeTab))
      }
    },
    },
  methods: {
    handleClick(){
      if (this.activeTab === 'tip-off') {
        //  this.$router.push({ name: 'myPostReport', params: { id: 1 } });
      }
    }
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