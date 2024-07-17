<template>
  <div class="container">
    <el-scrollbar max-height="100%">
      <el-main class="main">
      
        <el-carousel :interval="5000" arrow="default">
          <el-carousel-item v-for="(image, index) in camp.detail_images" :key="index">
            <img :src="image" alt="camp image" class="carousel-image">
          </el-carousel-item>
        </el-carousel>
        
        <h2>{{ camp.name }}</h2>
        <p>{{ camp.introduction }}</p>
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
        <p>{{ camp.location }}</p>
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
      <el-button class="booking-button" type="primary" @click="goToCampsiteChoices(camp)">下一步：填写订单</el-button>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'CampDetail',
  props: ['campID'],
  computed: {
    camp() {
      const campId = this.campID;
      return this.$store.state.camp.camps.find(camp => camp.id === parseInt(campId));
    }
  },
  methods: {
    goToCampsiteChoices (camp) {
      this.$router.push({ path: `/home/campsite/${camp.id}` })
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
    }
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
</style>
