<template>
 <el-card style="width: 85vw;margin-left:6vw;margin-bottom: 6vh;">
        <template #header>
        <div class="card-header">
        <span class="title">达人热帖</span>
        </div>
        </template>
        <div class="hot-post">
        <el-carousel style="width:100%" height="75vh" >
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
                    <div style="width:50%">
                    <p style="margin-top:3%;margin-left:20px;">{{ post.content }}</p>

                    <div style="display: flex; align-items:center;position:absolute;bottom:10px;right:20px;">
                    <el-avatar :src="post.portrait"></el-avatar>
                    <p style="height:100%;margin-left: 1%;">{{ post.author_name }}</p>
                    <p style="margin-left: 25px;">{{ post.post_time }}</p>
                    </div>
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
import State from '../store/global';

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
        },  
        toPostDetail(post) {
            if(post.post_kind==0)
              this.type='share';
            else if(post.post_kind==1)
              this.type='lease';
            else
              this.type='recruit'
            this.$router.push({ path: `/home/forum/post/${this.type}/${post.post_id}` });
        }
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

.userlist{
    --el-menu-hover-bg-color: rgb(48,133,136,40%);
    --el-menu-active-color: #C65E2D;
    font-weight: bold;
}

.userlist .el-menu-item{
    height:8vh;
}

</style>