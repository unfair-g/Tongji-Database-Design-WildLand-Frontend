<template>  
  <div class="container">  
    <div class="left-panel">  
      <div class="flash-item">  
        <h2 class="flash-title">{{ flash.flashTitle }}</h2> 
        <h2 class="flash-meta">{{ flash.user_id }}</h2>
        <el-tag type="info" class="flash-tag">{{ flash.tagName }}</el-tag>  
        <div class="flash-like">
        <el-button class="flash-like" @click="toggleStar(flash.flashId)">
          <el-icon v-if="!this.isStarred"><Star /></el-icon>
          <el-icon v-else><StarFilled /></el-icon>
          <span>{{ this.isStarred ? '已收藏' : '收藏' }}</span>
        </el-button>
      </div>
        <p class="flash-content">{{ flash.flashContent }}</p>  
        <img :src="flash.flashImage" :alt="flash.flashTitle" class="flash-image" />  
      </div>  
    </div>  
    <div class="right-panel">  
      <section>  
        <h2>收藏量</h2>  
        <p class="flash-view">{{ flash.collectionNumber || 0 }}</p>  
        <div class="like-users">  
          <div class="like-item" v-for="(user, index) in flash.like_users" :key="index">  
            <el-avatar :src="user.avatar" alt="用户头像" class="avatar" />  
            <span class="name">{{ user.name }}</span>  
          </div>  
        </div>  
      </section>  
      <section>  
        <h2>浏览量</h2>  
        <p class="flash-view">{{ flash.viewsNumber || 0 }}</p>  
      </section>  
    </div>  
  </div>  
</template>  
  

<script>
import axios from '@/axios'; // 引入配置好的axios实例
import global from '@/store/global'

export default {
name: 'R_Flash',
props: ['flashID'],
data() {
    return {
      flash: [],
      isStarred:0
    };
  },
methods: {  
  fetchFlashes() {
      axios.get(`https://localhost:7218/api/Flashes/GetFlashByFlashId?flashId=${this.flashID}`)
        .then(response => {
          this.flash = response.data;
        })
        .catch(error => {
          console.error('Error fetching city names:', error);
        });
    },
  toggleStar(flashId) {  
    console.log("Hello, Console!",global.userId);  
    axios.post(`https://localhost:7218/api/StarFlashes/PostStarFlash?userId=${global.userId}&flashId=${flashId}`,{
      flash_id: flashId,
      user_id: global.userId
    })
  }  
  },  
  created() {
    this.fetchFlashes();
  }
}
</script>

  
<style scoped>  
.container {  
  display: flex;  
  height: 100%;  
  padding: 20px;  
}  
  
.flash-header {  
  display: flex;  
  justify-content: space-between; /* 保持其他内容的布局 */  
  align-items: center;  
  margin-bottom: 10px;  
  
}  
  
.flash-title {  
  font-size: 37px;  
  margin: 0;  
  display:inline-block;
}  
  
.flash-content {  
  font-size: 16px;  
  color: #666;  
  margin: 1%;
  display: flex;  
}  
.flash-tag{
  display: flex;  
  width:9%
}

.flash-meta {  
  font-size: 16px;  
  color: #666;  
  display:inline-block;
  margin-left: 3%;
}  
  
.flash-image {  
  width: 100%;  
  height: auto;  
  max-width: 730px;  
  border-radius: 10px;  
  margin-bottom: 20px;  
}  
  
.left-panel, .right-panel {  
  padding: 20px;  
  overflow-y: auto;  
}  
  
.left-panel {  
  flex: 1; /* 使用 flex: 1 让其占据剩余空间 */  
  background-color: rgba(255, 255, 255, 0.8);  
  margin-right: 20px;  
}  
  
.right-panel {  
  flex: 0 0 30%; /* 固定宽度为 30% */  
  border-left: 1px solid #ddd;  
}  
  
.flash-stats, .flash-like {  
  font-size: 18px;  
  color: #666;  
  justify-content: flex-end;
  display:flex;
}  
  
.like-users {  
  display: flex;  
  flex-wrap: wrap;  
  margin-top: 10px;  
}  
.like-item {  
  display: flex;  
  align-items: center;  
  margin-bottom: 10px;  
}   
.avatar {  
  width: 50px;  
  height: 50px;  
  border-radius: 50%;  
  margin-right: 10px;  
}  
</style>
