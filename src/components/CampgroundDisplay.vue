<template>
  <div class="camp-list">
      <el-col :span="20" v-for="camp in filteredCamps" :key="camp.id" style="margin-bottom:25px;">
        <el-card :body-style="{ padding: '5px' }" shadow="hover" class="camp-card" @click="goToCampDetail(camp)">
          <img :src="camp.image" class="image" alt="camp image">
          <div style="padding: 14px;">
            <span class="name">{{ camp.name}}</span>
            <div class="bottom clearfix">
              <span class="introduction">{{ camp.introduction }}</span>
              <el-button type="text" class="button" @click="goToCampDetail(camp)">查看详情</el-button>
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
  computed: {
    // 从 Vuex Store 中获取数据
    camps() {
      return this.$store.state.camp.camps;
    },
    filteredCamps() {
      return this.camps.filter(camp => camp.city.includes(this.currentMenu));
    }
  },
  methods: {
    goToCampDetail (camp) {
      this.$router.push({ path: `/home/campdetail/${camp.campground_id}` })
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


