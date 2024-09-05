<template>
<el-card class="flash">
    <div class="flash-list">
      <div class="flash-item" v-for="(flash) in flashes" :key="flash.flash_id" @click="goToDetail(flash.flash)">
        <div class="img">
            <img style="width: 253px; height: 171px;" :src="flash.flash_image" />
        </div>
        <div class="flash-info">
            <span class="flash-title">{{ flash.flash.flash_title }}</span>
            <span class="flash-meta">作者： {{ flash.flash.user_id }}</span>
          <div>
            <span class="flash-like">{{ flash.flash.collection_number }}收藏</span>
            <span class="flash-like">{{ flash.flash.views_number }}浏览</span>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import axios from '@/axios';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: 'SearchFlash',
  setup() {
    const route = useRoute();
    const flashes = ref([]);
    const keyword = route.query.keyword || '';
    const fetchFlash = () => {
      axios.get(`/api/Flashes/SearchFlashes?keyword=${encodeURIComponent(keyword)}`) 
        .then(response => {
          // 使用 map 来处理每个元素并返回新数组  
          flashes.value = response.data.map(flash => { 
            console.log(flash.flash_pics[0]) 
            // 复制当前对象并添加或更新 flashImage 属性  
            return {  
              ...flash, // 浅拷贝当前对象  
              flash_image: flash.flash_pics[0] // 赋值 picUrls[0] 给 flashImage  
            };  
          });  
          console.log(flashes.value[0])
        })  
        .catch(error => {  
          console.error('Error fetching flashes:', error);  
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
      const flashId = flash.flash_id;
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

.el-card {  
  box-shadow: none !important; /* 覆盖默认的阴影效果 */  
  border: none !important; /* 覆盖默认的框线效果 */
}
</style>
