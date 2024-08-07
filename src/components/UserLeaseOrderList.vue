<template>
  <div>
      <div v-for="ldleitemspost in ldleitemsposts" :key="ldleitemspost.post_id" justify="center" >
        <el-card class="post-item" @click="goToPostDetail(ldleitemspost)">

    <div class="post-content">
      <img :src="ldleitemspost.item_image" class="image" alt="order image">
          <div style="padding: 14px;flex:1;">
            <span>{{ ldleitemspost.item_name}}</span>
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

    export default ({
      name: 'LeaseView',
      computed: {
        ldleitemsposts() {
            return this.$store.state.post.ldleitemsposts
        }
      },
      methods: {
        goToPostDetail (ldleitemspost) {
          const ldleitemsPostId = ldleitemspost.post_id
          this.$router.push({ path: `/home/userspace/leaseorder/${ldleitemsPostId}`,
          query: {  
            ldleitemsPostId: ldleitemsPostId
        }})
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
    