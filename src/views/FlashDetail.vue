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
      <img :src="this.pic1" style="height:500px">
        <p class="flash-content">{{ flash.flashContent }}</p> 
        <img :src="this.pic2" style="height:500px">
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
      isStarred:0,
      pic1:'',
      pic2:'',
    };
  },
methods: {  
  fetchFlashes() {
      axios.get(`/api/Flashes/GetFlashByFlashId?flashId=${this.flashID}`)
        .then(response => {
          this.flash = response.data;
          console.log(this.flash);
          this.pic1=this.flash.flash_pics[0]
          this.pic2=this.flash.flash_pics[1]
          console.log(this.pic2)
          this.flash.viewsNumber=this.flash.viewsNumber+1
          axios.put(`/api/Flashes/UpdateFlashAndTag`, [{  
            userId: this.flash.userId,  
            flashDate: this.flash.flashDate,  
            flashImage: this.flash.flashImage,  
            collectionNumber: this.flash.collectionNumber,  
            viewsNumber: this.flash.viewsNumber,  
            flashTitle: this.flash.flashTitle,  
            flashContent: this.flash.flashContent,  
            flashId: this.flash.flashId,  
            tagId: this.flash.tagId,  
            tagName: this.flash.tagName // 这里使用更新后的 tagName  
            // 如果需要更新其他字段，也可以在这里添加  
          }])  
        })
        .catch(error => {
          console.error('Error fetching city names:', error);
        });
    },
  toggleStar(flashId) {  
    console.log("Hello, Console!",global.userId);  
    axios.post(`/api/StarFlashes/PostStarFlash?userId=${global.userId}&flashId=${flashId}`,{
      flash_id: flashId,
      user_id: global.userId
    })
    this.isStarred=1-this.isStarred;
  }  ,
  fetchstar(){          
    console.log(this.flashID);
    axios.get(`/api/StarFlashes/GetStarFlashByFlashAndUserId?flash_id=${this.flashID}&user_id=${global.userId}`)
        .then(response => {
          console.log(response);
          this.isStarred=1;
          console.log(this.isStarred);
        })
        .catch(error => {
          console.error('Error fetching city names:', error);
        });
  }
  },  
  created() {
    this.fetchFlashes();
    this.fetchstar();
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
  margin: 1%;
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
  display: flex;
  justify-content: center;
  height: 500px; 
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
