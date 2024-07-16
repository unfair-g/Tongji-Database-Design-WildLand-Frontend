
<template>
  <div class="camp-list">
    
      <el-col :span="20" v-for="camp in filteredCamps" :key="camp.id" style="margin-bottom:25px;">
        <el-card :body-style="{ padding: '5px' }" shadow="hover" class="camp-card" @click="goToCampDetail(camp.id)">
          <img :src="camp.image" class="image" alt="camp image">
          <div style="padding: 14px;">
            <span class="name">{{ camp.name}}</span>
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
        { id: 1, name: '小野（半岛）', image: require('@/assets/camp11.png'), introduction: '上海最美的日落营地，可体验浆板、帆船', tags: ['上海'] },
        { id: 21, name: '竹野公园', image: require('@/assets/camp21.png'), introduction: '竹林环绕的静谧之所', tags: ['绍兴'] },
        { id: 22, name: '诸暨红枫岭营地', image: require('@/assets/camp22.png'), introduction: '藏在五泄森林中的法式小清新', tags: ['绍兴'] },
        { id: 31, name: '小野（森谷）', image: require('@/assets/camp31.png'), introduction: '林间山野，溪流石苔', tags: ['桐庐'] },
        { id: 41, name: '小野（杭州）', image: require('@/assets/camp41.png'), introduction: '不设限的城市乌托邦', tags: ['杭州'] },
        { id: 51, name: '小野（松屿）', image: require('@/assets/camp51.png'), introduction: '与湖景相伴，与松林为伍，全景观营地', tags: ['湖州'] },
        { id: 52, name: '小野（莫干山）', image: require('@/assets/camp52.png'), introduction: '抹茶千层味的山顶营地，晨起看云雾，黄昏有夕阳', tags: ['湖州'] },
    
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
  margin:20px auto;
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

.name {
  font-size: 20px;
  font-weight: bold; /* 将字体设置为加粗 */
}

.introduction {
  color: #7b7b7b;
  font-size: 14px;
}

.button {
  float: right;
  padding: 0;
}
</style>


