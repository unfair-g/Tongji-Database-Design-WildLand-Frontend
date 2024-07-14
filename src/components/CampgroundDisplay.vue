
<template>
  <div class="camp-list">
    
      <el-col :span="21" v-for="camp in filteredCamps" :key="camp.id" style="margin-bottom:25px;">
        <el-card :body-style="{ padding: '5px' }" shadow="hover" class="camp-card" @click="goToCampDetail(camp.id)">
          <img :src="camp.image" class="image" alt="camp image">
          <div style="padding: 14px;">
            <span>{{ camp.name}}</span>
            <div class="bottom clearfix">
              <span class="introduction">{{ camp.introduction }}</span>
              <el-button type="text" class="button" @click="goToCampDetail(camp.id)">查看详情</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    
  </div>
</template>

<script>
export default {
  name: 'CampgroundDisplay',
  props: {
    currentMenu: String
  },
  data () {
    return {
      camps: [
        { id: 1, name: '小野（半岛）', image: require('@/assets/camp11.png'), introduction: '¥100', tags: ['上海'] },
        { id: 21, name: '竹野公园', image: require('@/assets/camp21.png'), introduction: '¥200', tags: ['绍兴'] },
        { id: 22, name: '诸暨红枫岭营地', image: require('@/assets/camp22.png'), introduction: '¥300', tags: ['绍兴'] },
        { id: 31, name: '小野（森谷）', image: require('@/assets/camp31.png'), introduction: '¥400', tags: ['桐庐'] },
        { id: 41, name: '小野（杭州）', image: require('@/assets/camp41.png'), introduction: '¥600', tags: ['杭州'] },
        //{ id: 51, name: '小野（松屿）', image: require('@/assets/2.png'), introduction: '¥600', tags: ['湖州'] },
        //{ id: 52, name: '小野（莫干山）', image: require('@/assets/1.png'), introduction: '¥500', tags: ['湖州'] },
    
      ]
    }
  },
  computed: {
    filteredCamps () {
 
      return this.camps.filter(camp => camp.tags.includes(this.currentMenu))
      
    }
  },
  methods: {
    goToCampDetail (productId) {
      this.$router.push({ path: `/product/${productId}` })
    }
  }
}
</script>

<style scoped>
.camp-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* 新增此行 */
}

.camp-card {
  width:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: auto; /* 新增此行 */
}

.image {
  width: 100%;
  object-fit: cover;
}

.introduction {
  color: #ff4949;
  font-size: 18px;
}

.button {
  float: right;
  padding: 0;
}
</style>

<style scoped>
.container {
  margin: 0 auto; /* 居中显示容器 */
  display: flex;
  background-color: #ffffff; /* 设置容器的背景色为白色 */
  border: 1px solid #ccc; /* 添加1像素灰色实线边框 */
}
.campground-display {
  margin-bottom: 20px; /* 调整组件之间的间距 */
}

.campground-image {
  width: 100%;
  display:flex;
  height: auto;
  
}

.campground-description {
  margin-top: 10px; /* 文字描述与图片之间的间距 */
}
</style>
