<template>
  <div>
      <div v-for="ldleitemspost in ldleitemsposts" :key="ldleitemspost.post_id" justify="center" >
        <el-card class="post-item" @click="goToPostDetail(ldleitemspost)">

    <div class="post-content">
      <img :src="ldleitemspost.post_pics[0]" class="image" alt="order image">
          <div style="padding: 14px;flex:1;">
            <h1>{{ ldleitemspost.item_name}}</h1>
              <div><span>商品简介: {{ ldleitemspost.item_summary}}</span></div>
              <div><span>商品新旧程度：{{ ldleitemspost.condition}}</span></div>
              <div class="bottom clearfix">
                <span class="price">¥{{ ldleitemspost.price }}</span>
                <el-button type="text" class="button" @click="goToPostDetail(ldleitemspost)">查看详情</el-button>
              </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>
    
    <script>
import { ref } from 'vue';
import axios from 'axios';
import  globalState  from '@/store/global.js'; // 引入 global.js 中的状态

    export default ({
      name: 'LeaseView',
      data() {
        return {
          ldleitemsposts: [],
        };
      },
      create(){
        this.fetchPosts();
      },
    mounted(){
     this.fetchPosts();
    },
      methods: {
    async fetchPosts() {
          try {
      await axios.get(`https://localhost:7218/api/Purchases/GetPurchasesByUserId?user_id=${globalState.userId}`)
        .then(response=>{
          this.ldleitemsposts=response.data;
        })
      } catch (error) {
        console.error('Error fetching ldleitemsposts:', error);
        this.handleError(error, '获取闲置帖失败');
      }
    },
        goToPostDetail (ldleitemspost) {
          const ldleitemsPostId = ldleitemspost.order_id

          this.$router.push({ path: `/home/userspace/leaseorder/${ldleitemsPostId}`,
          query: {  
            ldleitemsPostId: ldleitemsPostId
        }})
        },
        handleError(error, message) {
      if (error.response) {
        console.error(`${message}:`, error.response.data);
        this.$message.error(`${message} - 错误代码: ${error.response.status}`);
      } else if (error.request) {
        console.error(`${message}: No response received`);
        this.$message.error(`${message} - 没有收到响应`);
      } else {
        console.error(`${message}:`, error.message);
        this.$message.error(`${message} - 错误信息: ${error.message}`);
      }
    }
      },
      setup() {
    const isLiked = ref(false);
    const isStarred = ref(false);

    const toggleLike = () => {
      isLiked.value = !isLiked.value;
      this.recruitmentpost.likes.value = isLiked.value ? this.recruitmentpost.likes.value + 1 : this.recruitmentpost.likes.value - 1;
    };

    const toggleStar = () => {
      isStarred.value = !isStarred.value;
    };

    return {
      isLiked,
      toggleLike,
      isStarred,
      toggleStar
    };
  }
    }
    )
    </script>
    
    <style scoped>
    .post-item {
  margin-bottom: 20px;
  width: 100%; /* 调整宽度，根据需要设置合适的值 */
}
.post-header {
  display: flex;
  align-items: center;
}
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}
.post-details {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
.post-info {
  display: flex;
  flex-direction: column;
  margin-right: auto; /* 将 post-stats 推到右侧 */
}
.post-stats {
  display: flex;
  justify-content: space-between;
  width: 300px;
}
.stat-item {
  display: flex;
  align-items: center;
  margin-right: 15px; /* 间隙 */
  cursor: pointer; /* 表示这个图标是可以点击的 */
}
.time {
  color: darkgrey;
}

i {
  font-size: 25px;
}
    .product-card {
      width: 100%; /* 固定宽度 */
      height:30%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    
    .post-content {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    
    .image {
      width: 200px; /* 固定图片宽度 */
      height: 200px; /* 固定图片高度 */
      object-fit: cover;
      margin-right: 60px;
    }
    
    .price {
      color: #ff4949;
      font-size: 18px;
    }
    
    .button {
      float: right;
      padding: 0;
    }
    </style>
    