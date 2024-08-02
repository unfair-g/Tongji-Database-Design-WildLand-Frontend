<template>  
    <div>  
      <div class="messages">  
        <div v-for="message in filteredMessages" :key="message.id" class="message"> 
          <!-- 头像 -->  
          <div class="message-avatar">  
            <img :src="message.avatarUrl" alt="头像" class="avatar">  
          </div>  
          <!-- 用户名和消息内容 -->  
          <div class="message-info">  
            <div class="message-header">  
              <span class="username">{{ message.username }}</span>  
            </div>  
            <div class="message-content">  
              <p>{{ message.content }}</p>  
            </div>  
          </div>  
          <!-- 时间戳 -->  
          <div class="message-timestamp">  
            <span class="timestamp">{{ message.timestamp }}</span>  
          </div>  
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
    }
  },
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
}  
  
.message-timestamp {  
  margin-left: auto; /* 将时间戳推到最右边 */  
  align-self: center; /* 垂直居中时间戳（可选） */  
}  
  </style>