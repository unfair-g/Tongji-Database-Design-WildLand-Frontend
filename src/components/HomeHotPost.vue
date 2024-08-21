<template>
 <el-card style="width: 85vw;margin-left:6vw;margin-bottom: 6vh;">
        <template #header>
        <div class="card-header">
        <span class="title">达人热帖</span>
        </div>
        </template>
        <div class="hot-post">
<<<<<<< Updated upstream
        <el-carousel style="width:100%" height="75vh" >
=======
        <el-carousel style="width:100%" height="75vh" :autoplay="false">
>>>>>>> Stashed changes
            <el-carousel-item v-for="post in this.postDetails" :key="post.post_id">
                <div style="width:90%;display: block;margin:0 auto;">
                <el-card v-if="post" style="min-height: fit-content;" @click="toPostDetail(post)">
                <template #header>
                    <h2>{{ post.title }}</h2>
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
<<<<<<< Updated upstream
                    <div style="width:50%">
                    <p style="margin-top:3%;margin-left:20px;">{{ post.content }}</p>

                    <div style="display: flex; align-items:center;position:absolute;bottom:10px;right:20px;">
                    <el-avatar :src="post.portrait"></el-avatar>
                    <p style="height:100%;margin-left: 1%;">{{ post.author_name }}</p>
                    <p style="margin-left: 25px;">{{ post.post_time }}</p>
                    </div>
=======
                    <div style="width:50%;display:flex;">
                      <p v-html="formatContent(post.content)" class="content-text"></p>
                      
                      <div class="author-info">
                        <el-avatar :src="post.portrait"></el-avatar>
                        <div class="author-details">
                          <p>{{ post.author_name }}</p>
                          <p>{{ this.formatDate(post.post_time) }}</p>
                        </div>
                      </div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
import State from '../store/global';
=======
//import State from '../store/global';
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
                const response = await axios.get('/api/Posts/TopPosts');  
                this.hotPosts = response.data; // 假设后端返回包含 post_id 的数组  

                const ldleitemspostsPromises = this.hotPosts.map(async post => {
                const detailResponse = await axios.get(`/api/Posts/GetPostDetail/${post.post_id}/${State.userId}`);
                const author_name=detailResponse.data.author_name;
                const portrait=detailResponse.data.portrait
                const author_id=detailResponse.data.author_id
                const post_pics=detailResponse.data.post_pics
                const content=detailResponse.data.content;
                const post_time=detailResponse.data.post_time;
                const post_position=detailResponse.data.post_position;

            // 将 order_id 添加到每个帖子对象中
            return { 
              ...post, 
              author_id:author_id,
              author_name:author_name,
              content:content,
              portrait:portrait,
              post_pics:post_pics,
              post_time:post_time,
              post_position:post_position
            };
      });
      // 等待所有请求完成
      this.postDetails = await Promise.all(ldleitemspostsPromises);
      console.log(this.postDetails)
      } catch (error) {
        console.error('Error fetching posts:', error);
      } 
=======
                await axios.get('/api/Posts/TopSharedPosts')
                .then(response=>{
                    this.postDetails=response.data;
                })
                console.log(this.postDetails)
            } catch (error) {
               console.error('Error fetching posts:', error);
            } 
>>>>>>> Stashed changes
        },  
        toPostDetail(post) {
            if(post.post_kind==0)
              this.type='share';
            else if(post.post_kind==1)
              this.type='lease';
            else
              this.type='recruit'
            this.$router.push({ path: `/home/forum/post/${this.type}/${post.post_id}` });
<<<<<<< Updated upstream
        }
=======
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
>>>>>>> Stashed changes
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
    position: absolute;
    bottom: 20px;
    right: 20px;
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