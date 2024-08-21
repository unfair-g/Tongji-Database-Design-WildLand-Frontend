<template>
  <div class="container">
    <el-scrollbar max-height="100%">
      <el-main class="main">
        <el-carousel :interval="5000" arrow="default" v-if="camp && camp.campground_picurls">
          <el-carousel-item v-for="(image, index) in camp.campground_picurls" :key="index">
            <img :src="image" alt="camp image" class="carousel-image">
          </el-carousel-item>
        </el-carousel>
        
        <div class="up-container" v-if="camp">
        <h2>{{ camp.campground_name }}</h2>
        <p>{{ camp.slogan }}</p>

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
        <div class="infrastructure-container" v-if="camp">
          <img v-if="camp.has_fire_safety == '1'" src="@/assets/infrastructures/fire.png" alt="fire safety" class="infrastructure-image">
          <img v-if="camp.has_parking_lot == '1'" src="@/assets/infrastructures/parkinglot.png" alt="parking lot" class="infrastructure-image">
          <img v-if="camp.toilet_number >= '1'" src="@/assets/infrastructures/wc.png" alt="power supply" class="infrastructure-image">
          <img v-if="camp.has_shower_room == '1'" src="@/assets/infrastructures/shower.png" alt="shower room" class="infrastructure-image">
          <img v-if="camp.has_signal == '1'" src="@/assets/infrastructures/signal.png" alt="signal" class="infrastructure-image">
        </div>

<!-- -------------------------------------------------------------------------------- -->
        <p class="title">| 营地概览</p>
        <div class="short-divider"></div> 
        <p v-if="camp">{{ camp.address }}</p>
        <p margin-left="20px" v-if="camp">营位数量:{{ camp.campsite_number }}</p>
        <div class="availability-container" v-if="camp">
          <div v-if="camp.has_power_supply == 1" class="availability-item">可供电 <span class="check-mark">✔️</span></div>
          <div v-if="camp.can_stay_overnight == 1" class="availability-item">可拎包入住 <span class="check-mark">✔️</span></div>
          <div v-if="camp.is_pet_friendly == 1" class="availability-item">可携带宠物 <span class="check-mark">✔️</span></div>
          <div v-if="camp.is_own_tent_friendly == 1" class="availability-item">可自带帐篷 <span class="check-mark">✔️</span></div>
          <div v-if="camp.has_grass_ground == 1" class="availability-item">草地 <span class="check-mark">✔️</span></div>
          <div v-if="camp.has_sandy_ground == 1" class="availability-item">沙地 <span class="check-mark">✔️</span></div>
        </div>
        

<!-- -------------------------------------------------------------------------------- -->
        <p class="title">| 营地特色</p>
        <div class="short-divider"></div>
        <div class="introduction-image-container" v-if="camp">
          <img :src="camp.camp_intropic" alt="introduction image" class="introduction-image">
        </div> 


      
      </el-main>
    </el-scrollbar>

    <el-footer>
      <el-button class="booking-button" type="primary" @click="goToCampBooking(camp)">立即预约</el-button>
    </el-footer>
  </div>
</template>

<script>
import axios from '@/axios'; // 引入配置好的axios实例
import { ref } from 'vue'
import global from '@/store/global.js';

export default {
  name: 'CampDetail',
  props: ['campID'],
  data () {
    return {
      camp: null,
      isStarSolid: ref(true),
    }
  },
  created() {
    this.fetchCampDetails();
  },
  methods: {
    async fetchCampDetails() {
      try {
        const response = await axios.get(`api/Campgrounds/getcampgrounddetails/${this.campID}/${global.userId}`);
        this.camp = response.data;
      } catch (error) {
        console.error('获取营地具体信息失败:', error);
      }
    },
    goToCampBooking (camp) {
      this.$router.push({ path: `/home/campbooking/${camp.campground_id}` })
    },
    
    async toggleStarColor () {
      this.isStarSolid = !this.isStarSolid
      // 如果需要，你可以在这里添加额外的逻辑来改变图标的颜色
      // 但通常，我们会通过 CSS 来处理颜色的变化
      // 构造要发送的数据
    const data = {
      campground_id: this.camp.campground_id,
      user_id: global.userId,
    };

    try {
      const response = await axios.post('/api/Starcampgrounds/starcampground', data);
      console.log('收藏成功:', response.data);
    } catch (error) {
      console.error('收藏失败:', error);
    }
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
  height: 90.4vh; /* 设置容器高度为视口高度 */
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
