<template>
    <div class="container">
      <el-scrollbar max-height="100%">
        <el-main class="main">
        
          <h2>{{ camp.campground_name }}</h2>
          <div class="divider"></div> <!-- Divider line -->
<!-- -------------------------------------------------------------------------------- -->
        <span class="title">| 选择预定日期</span>
        <div class="short-divider"></div> 
        <div class="up-container">
          
          <div class="date-range-picker">
            <span >请选择预定的日期</span>
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleDateChange"
            >
            </el-date-picker>
          </div>
          
          <div class="introduction-image-container">
            <img :src="camp.campsite_image" alt="campsite image" class="campsite-image">
          </div> 
        </div>
  
  <!-- -------------------------------------------------------------------------------- -->
          <span class="title">| 选择预定营位</span>
          <div class="short-divider"></div> 

          <el-collapse v-model="activeSections">
          <el-collapse-item
            v-for="(ids, section) in groupedCampsiteIds"
            :key="section"
            :title="`${section}区`"
            :name="section"
          >
            <div class="campsite-buttons">
              <el-button
                v-for="id in ids"
                :key="id"
                type="primary"
                :class="{ selected: selectedCampsiteIds.includes(id) , 'campsite-button': true}"
                @click="toggleSelection(id)"
              >
                {{ id }}
              </el-button>
            </div>
          </el-collapse-item>
        </el-collapse>
  
        </el-main>
      </el-scrollbar>
  
      <el-footer>
        <el-button class="booking-button" type="primary" @click="goToCampOrder()">填写订单</el-button>
      </el-footer>
    </div>
  </template>
  

<script>
import { ref } from 'vue';
import { ElDatePicker } from 'element-plus';
import dayjs from 'dayjs';

  export default {
    name: 'CampBooking',
    props: ['campID'],
    components: {
    ElDatePicker
    },
    data() {
    return {
      activeSections: [], // 控制折叠面板的展开和折叠
      selectedCampsiteIds: [] // 选中的营位ID
    };
  },
  
  setup() {
    const dateRange = ref([null, null]);
    const startDate = ref('');
    const endDate = ref('');

    const handleDateChange = (value) => {
      if (value && value.length === 2) {
        startDate.value = dayjs(value[0]).format('YYYY年MM月DD日');
        endDate.value = dayjs(value[1]).format('YYYY年MM月DD日');
      } else {
        startDate.value = '';
        endDate.value = '';
      }
    };

    return {
      dateRange,
      startDate,
      endDate,
      handleDateChange
    };
  },
    computed: {
      camp() {
        const campId = this.campID;
        return this.$store.state.camp.camps.find(camp => camp.campground_id === parseInt(campId));
      },
      groupedCampsiteIds() {
      if (!this.camp || !this.camp.campsites) return {};
      return this.camp.campsites.reduce((groups, campsite) => {
        const section = campsite.id.charAt(0).toUpperCase();
        if (!groups[section]) {
          groups[section] = [];
        }
        groups[section].push(campsite.id);
        return groups;
      }, {});
    },
    },
    methods: {
      goToCampOrder () {
        this.$router.push({
        path: '/home/camporder',
        query: {
          campID: this.campID,
          startDate: this.startDate,
          endDate: this.endDate,
          selectedCampsiteIds: this.selectedCampsiteIds.join(',')
        }
      });
      },
      
      toggleSelection(id) {
        //如果 id 尚未选中，则将其添加到 selectedCampsiteIds 数组中；如果 id 已经选中，则将其从数组中移除。
      const index = this.selectedCampsiteIds.indexOf(id);
      if (index === -1) {
        this.selectedCampsiteIds.push(id);
      } else {
        this.selectedCampsiteIds.splice(index, 1);
      }
    },
    },
    created() {
    // 初始化所有折叠面板展开
    this.activeSections = Object.keys(this.groupedCampsiteIds);
  },

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

.up-container {
  display: flex;
  align-items: center;
}
.date-range-picker {
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap:20px;
  margin-bottom: 250px;
}
.date-range-picker span{
  color:#1D5B5E;
  font-size:15px;
}



.campsite-image {
    width: 90%;  /* Adjust the width as needed */
    height: auto;
    margin-left:20px;
}


.campsite-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* 间隔 */
}

.campsite-button {
  margin: 5px;
  width:60px;
  background-color: #8dc6c9;
  border-width: 0px;
  color: white;
  
}

.campsite-button.selected {
  background-color: #61a2a5;
  border-color: #1D5B5E;
  border-width: 3px;
  color: #1D5B5E;
  font-weight: bold;
}
  

</style>
  