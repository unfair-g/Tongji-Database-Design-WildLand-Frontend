<template>
    <div class="container">
      <div class="left-panel">
        <div class="flash-item">
            <div class="flash-like" @click="toggleStar(flashId)">  
              <strong>收藏</strong>  
              <el-icon v-if="!flash.isSolid"><Star /></el-icon>
            </div>  
            <div class="flash-like">
              <span>{{ flash.favorite }}</span>
            </div>
            <span class="flash-title">{{ flash.title }}</span>
            <span class="flash-meta">{{ flash.meta }}</span>
            <div>
              <el-tag type="info" class="custom-tag">{{ flash.tag }}</el-tag>  
            </div>
            <span class="flash-content">{{ flash.content }}</span>
            <img :src="flash.image" width="730" style="border-radius: 10px; margin-right: 10px;">
        </div>
      </div>
      <div class="right-panel">  
        <h2>收藏量</h2>  
        <div>  
          <span class="flash-view"> {{ flash.like || '未知' }}</span>  
          <div class="like-item" v-for="(user, userIndex) in flash.like_users" :key="`${flash.flash_id}-${userIndex}`">  
            <el-avatar :src="user.avatar" alt="用户头像" class="avatar" />  
            <span class="name">{{ user.name }}</span>  
          </div>  
        </div>  
        <h2>浏览量</h2>  
        <div>  
          <span class="flash-view"> {{ flash.view || '未知' }}</span>  
        </div>  
      </div>  
    </div>
</template>

<script>
import axios from '@/axios'; // 引入配置好的axios实例

export default {
name: 'R_Flash',
props: ['flashID'],
computed: {
flash() {
  const flashId = this.flashID;
  return this.$store.state.flash.flashes.find(flash => flash.flash_id === parseInt(flashId));
}
},
methods: {  
  
  toggleStar(flashId) {  
    axios.post(`https://localhost:7218/api/StarFlashes/PostStarFlash?userId=1&flashId=${flashId}`)  
  }  
  },  
}
</script>

<style scoped>
.container {
display: flex;
height: 100%;
margin-top: 2%;
}
.flash-info {
  margin: 3%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.flash-title {
  color:#333;
      font-size: 37px;
      overflow:hidden;
}
.flash-meta {
  color: #999;
  font-size: 0.9em;
  margin-left: 1%;
}
.flash-view {
  padding: 3%;
  margin:3%;
  color: #636363;
  font-size: 25px;
}
.flash-like {
  padding: 1%;
  font-size: 25px;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
}
.comment-container {  
  margin-bottom: 20px;  
  border-bottom: 1px solid #ccc;  
  padding-bottom: 10px;  
}  
  
.comment p {  
  font-weight: bold;  
}  
  
.replies p {  
  margin-left: 20px;  
  font-size: 0.9em;  
} 
.comment-content {  
  display: flex;  
  flex-direction: column;  
  margin: 10px; /* 与头像保持一些间距 */  
}  
.flash-content {  
  display: flex;  
  flex-direction: column;  
  margin: 2%; /* 与头像保持一些间距 */  
  font-size: 20px;
  line-height: 1.6; 
}  
  
.replies {  
  margin-top: 10px;  
}  
  
.inner-timeline {  
  /* 可能需要一些额外的样式来确保内部时间线看起来更紧凑或与其他部分协调 */  
  margin: 0;  
  padding: 0;  
}  
.left-panel, .right-panel {
  display: flex;  
overflow-y: auto;
padding: 20px;
flex-direction:row;
}
.left-panel {
  background-color: rgb(255,255,255,80%);
  margin-top: 1%;
  margin-left: 6%;
  margin-bottom: 1%;
  flex: 70%;
}
.right-panel {
flex: 30%;
display: flex;
flex-direction: column;
}
.like-list {
  display: flex;  
  flex-direction: column;  
  align-items: flex-start;  
  padding: 10px;  
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
.custom-tag {  
  /* 增大标签的字体大小和padding来使标签看起来更大 */  
  font-size: 20px; /* 或者你需要的任何大小 */  
  padding: 15px 15px; /* 增大padding以匹配字体大小 */  
  
  /* 减小与上方元素的间距 */  
  margin-top: 1%; /* 根据需要调整 */  
  /* 如果需要，还可以调整其他样式 */  
}  
  
.name {  
  font-size: 16px;  
}  
</style>
