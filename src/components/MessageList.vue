<template>
  <div>
    <div class="messages">
      <div v-for="(message, index) in filteredMessages" :key="index">
        <!-- 头像 -->
        <div class="message">
          <div v-if="message.type === 'follow'" class="message-avatar" style="margin-right: 1%;">
            <img :src="message.portrait" alt="头像" class="avatar" @click="goToUserSpace(message.user_id)">
          </div>
          <!-- 用户名和消息内容 -->
          <div v-if="message.type === 'follow'" class="message-info">
            <div class="message-header">{{message.user_name}}</div>
            <div class="message-content">
              <p>关注了你</p>
            </div>
          </div>
          <!-- 活动招募消息 -->
          <div v-else-if="message.type === 'activity'" class="message-info" @click="handleClick(message)">
            <div class="message-header">
              <span>{{ message.recruitmentPost.title }}</span>
            </div>
            <div class="message-content">
              <span style="color:black">报名状态：</span>
              <span v-if="message.activity.review_status === 2">待审核</span>
              <span v-else-if="message.activity.review_status === 1" style="color:green">通过</span>
              <span v-else style="color:red">不通过</span>
            </div>
          </div>
          <!-- 举报消息 -->
          <div v-else-if="message.type==='report'" class="message-info">
            <div class="message-header">
              <span>{{ message.content }}</span>
            </div>
            <div class="message-content">
              <span style="color:black">举报状态：</span>
              <span v-if="message.status === 2">待审核</span>
              <span v-else-if="message.status === 1" style="color:green">通过</span>
              <span v-else style="color:red">不通过</span>
              <br/>
              <span>举报理由：{{ message.report_reason }}</span>
            </div>
          </div>
          <!-- 卖出的闲置 -->
          <div v-else class="message-info" @click="handleClick(message)">  
            <div class="message-header">  
              <span>{{ message.post.title }}&nbsp;&nbsp;&nbsp;&nbsp;￥{{ message.price }}</span>
            </div>  
            <div class="message-content">  
              <span  style="color:black">订单状态：</span>
              <span v-if="message.order_status===1">已支付</span>  
              <span v-else-if="message.order_state===2" style="color:red">已发货</span>  
              <span v-else style="color:#00B146">已收货</span>  
            </div>  
          </div> 
          <!-- 时间戳 -->
          <div class="message-timestamp">
            <div class="timestamp">
              <span v-if="message.type==='follow'">{{ formatDate(message.follow_time) }}</span>
              <span v-else-if="message.type==='purchased'">{{ formatDate(message.post.post_time) }}</span>
              <span v-else-if="message.type==='activity'">{{ formatDate(message.activity.application_time) }}</span>
              <span v-else>{{ formatDate(message.update_time) }}</span>
            </div>
            <el-link v-if="message.type === 'activity'" type="primary" @click="handleClick(message)">查看详情</el-link>
          </div>
        </div>
        <el-divider />
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/axios';
import global from '@/store/global';

export default {
  name: 'personal_message',
  data() {
    return {
      reportMessages: [],
      followMessages: [],
      purchasesMessages: [],
      activityMessages:[]
    }
  },
  props: {
    activeTab: String
  },
  computed: {
    filteredMessages() {
      const allMessages = this.reportMessages.concat(this.followMessages).concat(this.purchasesMessages).concat(this.activityMessages);

      if (this.activeTab === 'all') {
        return allMessages;
      } else {
        return allMessages.filter(message => {
          // 确保 message 对象有 type 属性，并且 activeTab 不是 undefined
          return message.type && this.activeTab && message.type.includes(this.activeTab);
        });
      }
    },
  },
  methods: {
    handleClick(message) {
      if (this.activeTab === 'tip-off') {
        //  this.$router.push({ name: 'myPostReport', params: { id: 1 } });
      }
      else if (message.type === 'purchased') {
        this.$router.push({
          path: `/home/userspace/leaseorder/${message.order_id}`,
          query: {
            ldleitemsPostId: message.order_id
          }
        })
      }
      else if (message.type === 'activity') {
        this.$router.push({
          path: `/home/forum/post/recruit/${message.recruitmentPost.post_id}`
        })
      }
    },

    fetchReportMessages() {
      const userId = global.userId;
      axios.get(`/api/Users/reportUserViewList/${userId}`).then(response => {
          this.reportMessages = response.data.data;
          this.reportMessages.forEach(item => {
              item.type='report'
          })
      }).catch(error => {
        console.error('获取举报消息时发生错误:', error);
      });
    },

    fetchFollowMessages() {
      const userId = global.userId;

      axios.get(`/api/Follows/getFollowersData/${userId}`).then(response => {
          this.followMessages = response.data.data;
          this.followMessages.forEach(item => {
              item.type='follow'
          })
      }).catch(error => {
        console.error('获取关注消息时发生错误:', error);
      });
    },

    async fetchRentMessages() {  
    try {  
    const response = await axios.get(`/api/Purchases/GetSellerItems?user_id=${global.userId}`);  
    this.purchasesMessages = response.data.soldItems;
    this.purchasesMessages.forEach(item => {
      item.type='purchased'
    })
  } catch (error) {  
    console.error('Error fetching purchases:', error);  
  }
    },

    async fetchActivityMessages() {  
    try {  
    const response = await axios.get(`/api/Users/GetUserActivities/${global.userId}`);  
    this.activityMessages = response.data;
    this.activityMessages.forEach(item => {
      item.type='activity'
    })
  } catch (error) {  
    console.error('Error fetching purchases:', error);  
  }
    },    

    goToUserSpace(user_id) {
      this.$router.push({
          path: `/home/userspace/${user_id}`
        })
    },

    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString();
    },
  },
  
  mounted() {
    this.fetchReportMessages();
    this.fetchFollowMessages();
    this.fetchRentMessages();
    this.fetchActivityMessages();
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

.message-content {
  font-size: large;
  color: gray;
}

.username{
  margin-left:30px;
}

.message-timestamp {
  margin-left: auto; /* 将时间戳推到最右边 */
  margin-right: 5%;
  align-self: center; /* 垂直居中时间戳（可选） */
}
</style>
