<template>
<el-card class="flash">
    <div class="flash-list">
      <div class="flash-item" v-for="(flash) in flashes" :key="flash.flash_id" @click="goToDetail(flash)">
        <div class="img">
            <img :src="flash.flash_image" />
        </div>
        <div class="flash-info">
            <span class="flash-title">{{ flash.flash_title }}</span>
            <span class="flash-meta">作者： {{ flash.user_id }}</span>
          <div>
            <span class="flash-like">{{ flash.collection_number }}收藏</span>
            <span class="flash-like">{{ flash.views_number }}浏览</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import axios from 'axios';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'SearchFlash',
  setup() {
    const route = useRoute();
    const flashes = ref([]);
    const keyword = route.query.keyword || '';

    const fetchFlash = () => {
      axios.get(`https://localhost:7218/api/Flashes/SearchFlashes?keyword=${encodeURIComponent(keyword)}`) 
        .then(response => {
          flashes.value = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    };

    onMounted(() => {
      fetchFlash();
    });
    return {  
      flashes  
    };  
  },
  methods: {
    goToDetail (flash) {
      const flashId = flash.flashId;
      this.$router.push({ path: `/home/flash/${flashId}` })
    },
  }
};
</script>

<style scoped>
.img{
    width:253px;
    height:171px;
}
.flash {
  margin-bottom: 20px;
  background: transparent;
}
.flash-list {
  background: transparent;
}
.flash-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.flash-info {
  margin: 3%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.flash-title {
  color:#333;
      margin-top: 1px;
      margin-bottom: 14px;
      height:48px;
      font-size: 37px;
}
.flash-meta {
  color: #999;
  font-size: 0.9em;
}
.flash-view {
  padding: 1%;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
}
.flash-like {
  padding: 1%;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
}
.flash-comment {
  padding: 1%;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
}
.el-card {  
  box-shadow: none !important; /* 覆盖默认的阴影效果 */  
  border: none !important; /* 覆盖默认的框线效果 */
}
</style>
