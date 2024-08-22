<template>
 <el-card style="width: 85vw;margin-left:6vw;margin-bottom: 6vh;">
        <template #header>
        <div class="card-header">
        <span class="title">达人热帖</span>
        </div>
        </template>
        <div class="hot-post">
        <el-carousel style="width:100%" height="75vh" :autoplay="false">
            <el-carousel-item v-for="post in this.postDetails" :key="post.post_id">
                <div style="width:90%;display: block;margin:0 auto;">
                <el-card v-if="post" style="min-height: fit-content;" @click="toPostDetail(post)">
                <template #header>
                    <div style="display: flex">
                        <h2>{{ post.title }}</h2>
                        <div class="author-info">
                            <el-avatar :src="post.portrait"></el-avatar>
                            <div class="author-details">
                            <p>{{ post.author_name }}</p>
                            <p>{{ this.formatDate(post.post_time) }}</p>
                            </div>
                        </div>
                    </div>
                </template>
                <div style="display: flex;">
                    <div style="width:50%">
                    <el-carousel height="55vh" autoplay>
                        <el-carousel-item v-for="img in post.post_pics" :key="img" 
                        style="height:fit-content;display: flex;justify-content: center;">
                            <img :src="img" style="height:55vh;width:auto"/>
                        </el-carousel-item>
                    </el-carousel>
                    </div>
                    <div style="width:50%;display:flex;flex-direction: column;">
                      <p v-html="formatContent(post.content)" class="content-text"></p>
                    </div>
                 </div>
                 
                </el-card>
            </div>
            </el-carousel-item>
        </el-carousel>
        </div>
</el-card>
</template>

<script>
import axios from '@/axios'
//import State from '../store/global';

export default{
    data() {
        return {
            hotPosts: [], // 存储从 API 获取的热帖 ID  
            postDetails: [], // 存储根据 hotPosts ID 获取的帖子详情 
            type:''

        }
    },
    created() {  
        this.fetchHotPosts();  
    },  
    methods: {
        async fetchHotPosts() {  
            try {  
                await axios.get('/api/Posts/TopSharedPosts')
                .then(response=>{
                    this.postDetails=response.data;
                })
                console.log(this.postDetails)
            } catch (error) {
               console.error('Error fetching posts:', error);
            } 
        },  
        toPostDetail(post) {
            this.$router.push({ path: `/home/forum/post/share/${post.post_id}` });
        },
        formatContent(content) {
            if (!content) return ''; // 如果 content 为 null 或 undefined，返回空字符串
           // 按句号分段，每段前面插入两个空格
           return content.split('。').map(sentence => '　　'+sentence + '。').join('<br><br>');
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
    }
}
</script>

<style scoped>
.hot-post{
    display:flex;
}

.title {
    color: #1D5B5E;
    font-size: 60px;
    font-family: 'FZYaoti';
    font-style: italic;
    font-weight: bold;
}

.content-text {
    margin-top:3%;
    margin-left:20px;
}

.text-section {
    width: 50%;
    display: flex;
    flex-direction: column;
}

.location-info {
    margin-top: 10px;
}

.author-info {
    display: flex;
    align-items: flex-start;
    margin-left: auto;
}

.author-info .author-details {
    margin-left: 10px;
    margin-right:60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.author-info .author-details p {
    margin: 0;
}

.userlist{
    --el-menu-hover-bg-color: rgb(48,133,136,40%);
    --el-menu-active-color: #C65E2D;
    font-weight: bold;
}

.userlist .el-menu-item{
    height:8vh;
}

</style>