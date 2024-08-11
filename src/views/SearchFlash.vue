<template>
<el-card class="flash">
    <div class="flash-list">
      <div class="flash-item" v-for="(flash) in filteredFlashes" :key="flash.flashTitle" @click="goToDetail(flash)">
        <div class="img">
            <img :src="flash.flashImage" />
        </div>
        <div class="flash-info">
            <span class="flash-title">{{ flash.flashTitle }}</span>
            <span class="flash-meta">作者： {{ flash.meta }}</span>
          <div>
            <span class="flash-like">{{ flash.collectionNumber }}收藏</span>
            <span class="flash-like">{{ flash.viewsNumber }}浏览</span>
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
    const router = useRouter();
    const products = ref([]);
    const filteredFlashes = ref([]);

    const fetchProduct = () => {
      axios.get('')
        .then(response => {
          flashes.value = response.data;
          filterFlashes(); // 数据获取后进行过滤
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
    };

    const filterFlashes = () => {
      const keyword = route.query.keyword || '';
      if (keyword.trim()) {
        filteredFlashes.value = flashes.value.filter(flash => 
        flash.flash_title.toLowerCase().includes(keyword.toLowerCase())
        );
      } else {
        filteredFlashes.value = flashes.value;
      }
    };

    onMounted(() => {
      fetchFlashn();
    });

    watch(() => route.query.keyword, filterFlashes);

    const goToFlashDetail = (product) => {
      const flashId =  flash.flash_title;
      router.push({ path: `/home/flash/${flashId}` });
    };

    return { filteredFlashe, goToFlashDetail };
  }
};
</script>

<style scoped>

</style>
