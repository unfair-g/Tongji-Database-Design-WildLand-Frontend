<template>
  <div class="container">
    <el-scrollbar max-height="100%">
      <el-main class="main">
      
        <el-carousel :interval="5000" arrow="default">
          <el-carousel-item v-for="(image, index) in camp.detail_images" :key="index">
            <img :src="image" alt="camp image" class="carousel-image">
          </el-carousel-item>
        </el-carousel>
        
        <div class="up-container">
        <h2>{{ camp.campground_name }}</h2>
        <p>{{ camp.introduction }}</p>

        <el-tag class="love" style="color: 529A98" @click="toggleStarColor" >
            <span>
              <el-button type="text" class="like-button">收藏</el-button>
              <el-icon class="star" color="#ffed49" :size="30"><component class="is_solid" :is="isStarSolid ? 'Star' : 'StarFilled'"></component></el-icon>
            </span>
        </el-tag>
     
        </div>
        <div class="divider"></div> <!-- Divider line -->

<!-- -------------------------------------------------------------------------------- -->
        <p class="title">| 基础设施</p>
        <div class="short-divider"></div> 
        <div class="infrastructure-container">
              <img v-for="infrastructure in camp.infrastructures" :key="infrastructure" :src="getInfrastructureImage(infrastructure)" :alt="infrastructure" class="infrastructure-image">
        </div>

<!-- -------------------------------------------------------------------------------- -->
        <p class="title">| 营地概览</p>
        <div class="short-divider"></div> 
        <p>{{ camp.address }}</p>
        <p margin-left="20px">营位数量:{{ camp.campsite_number }}</p>
        <div class="availability-container">
          <div v-for="availability in camp.availabilities" :key="availability" class="availability-item">
            {{ availability }} <span class="check-mark">✔️</span>
          </div>
        </div>

<!-- -------------------------------------------------------------------------------- -->
        <p class="title">| 营地特色</p>
        <div class="short-divider"></div>
        <div class="introduction-image-container">
          <img :src="camp.introduction_image" alt="introduction image" class="introduction-image">
        </div> 

       
      
      </el-main>
    </el-scrollbar>

    <el-footer>
      <el-button class="booking-button" type="primary" @click="goToCampBooking(camp)">立即预约</el-button>
    </el-footer>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'CampDetail',
  props: ['campID'],
  data () {
    return {
      isStarSolid: ref(true),
    }
  },
  computed: {
    camp() {
      const campId = this.campID;
      return this.$store.state.camp.camps.find(camp => camp.campground_id === parseInt(campId));
    }
  },
  methods: {
    goToCampBooking (camp) {
      this.$router.push({ path: `/home/campbooking/${camp.campground_id}` })
    },

    getInfrastructureImage (infrastructure) {
      const images = {
        '停车场': require('@/assets/infrastructures/parkinglot.png'),
        '信号': require('@/assets/infrastructures/signal.png'),
        '卫生间': require('@/assets/infrastructures/wc.png'),
        '消防措施': require('@/assets/infrastructures/fire.png'),
        '淋浴房': require('@/assets/infrastructures/shower.png'),
      };
      return images[infrastructure] || '';
    },
    toggleStarColor () {
      this.isStarSolid = !this.isStarSolid
      // 如果需要，你可以在这里添加额外的逻辑来改变图标的颜色
      // 但通常，我们会通过 CSS 来处理颜色的变化
    },
  }
}

</script>

<style scoped>
html, body {
  height: 100%;
  line-height: 1.6; /* 调整为你需要的行间距 */
  margin: 0;
}

.container {
  width: 70%; /* 设置容器的最大宽度 */
  height: 100vh; /* 设置容器高度为视口高度 */
  margin: 0 auto; /* 居中显示容器 */
  display: flex;
  flex-direction: column; /* 设置子元素为纵向排列 */
  background-color: #ffffff; /* 设置容器的背景色为白色 */
}

.main {
  flex: 1; /* 使主内容区占据剩余空间 */
  overflow: auto; /* 如果内容溢出，则显示滚动条 */
  padding-left: 100px;
  padding-right: 100px;
}

.el-footer {
  background-color: #ffffff; /* 设置容器的背景色为白色 */
  padding: 20px; /* 设置footer的内边距 */
  padding-right: 80px; /* 设置footer的内边距 */
  border-top: 1px solid #ccc; /* 设置footer的边框 */
  height:90px;
  display: flex; /* 使用flex布局 */
  justify-content: flex-end; /* 将内容对齐到右侧 */
}

.booking-button {
  height:50px;
  width: 240px;
  background-color: #1D5B5E;

}
.booking-button:hover {
  background-color: #2e7478; /* 更改为你希望的hover背景颜色 */
  color: #fff; /* 更改为你希望的hover文字颜色 */
}

.el-carousel {
  margin: 10px 140px; /* 设置走马灯组件的外边距 */
}

.carousel-image {
  width: 100%;
  height: auto;
  object-fit: fit; /* Adjust this property as needed */
}

.divider {
  height: 1px;
  background-color: #ddd; /* Divider color */
  margin: 10px 10px; /* Adjust the margin as needed */
}

.short-divider {
  height: 1px;
  width: 70px;
  background-color: #1D5B5E; /* Divider color */
  margin: 10px 10px; /* Adjust the margin as needed */
}

.infrastructure-container {
  display: flex;
  justify-content: center;
  gap: 30px; /* 图片间距，可以根据需要调整 */
  margin-bottom: 20px; /* 与上方内容的间隔 */
}

.infrastructure-image {
  width: 100px;  /* Adjust the width as needed */
  height: auto;
}

.availability-container {
  display: inline-flex;
  flex-wrap: wrap; /* 容不下时换行 */
  gap: 10px; /* 每个元素之间的间隔 */
  margin-top: 20px; /* 与上方内容的间隔 */
  margin-bottom: 40px; /* 与上方内容的间隔 */
}

.availability-item {
  color:#1D5B5E;
  display: flex;
  margin-left: 80px; /* 每个元素之间的间隔 */
}

.introduction-image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px; /* 与上方内容的间隔 */
}

.introduction-image {
  width: 80%;  /* Adjust the width as needed */
  height: auto;
}

.up-container {
  margin-bottom: 10px; /* 与上方内容的间隔 */
  position: relative;
}

.love {
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 20px;
  padding-left: 30px;
  background-color: #3085887d;
}

.like-button {
  font-size: 17px;
  color: #ffffff;
}
.like-button :hover{
  color: #1D5B5E;
}


.star {
  color: #ffed49;
  margin-left: 8px;
  width: 28px;
  height: 28px;
  vertical-align: middle;
}
</style>
