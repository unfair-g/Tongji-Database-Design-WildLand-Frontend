<template>
  <div class="publish-container">
    <el-aside width="15%" class="aside">
        <PublishAside :active-index="currentMenu" @menu-select="handleMenuSelect" />
    </el-aside>
    <el-main width="80%" class="publish-main">
      <!-- 根据左侧导航栏的选项显示不同的内容 -->
      <!-- <router-view></router-view> -->
      <!-- 根据选项显示不同内容 -->
      <PublishMain :currentMenu="currentMenu" />
    </el-main>
  </div>
</template>

<script>
import PublishAside from "../components/PublishPostAside.vue";
import PublishMain from "../components/PublishDetails.vue";

export default {
  name: 'PublishView',
  props: {
    command: {
      type: String,
      required: true
    }
  },
  components: {
    PublishAside,
    PublishMain
  },
  data() {
    return {
      currentMenu: 'share' // 默认值
    };
  },
  created() {
    this.currentMenu = this.command; // 将command的值赋给currentMenu
  },
  methods: {
    handleMenuSelect(index) {
      this.currentMenu = index;
    }
  }
};
</script>

<style scope>
.publish-container{
  margin-top: 25px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: flex-start; /* 顶部对齐 */
  
  width: 80%; /* 占满视口宽度 */
 
}
.aside {
  flex-shrink: 0; /* 防止 aside 收缩 */
  height: 100%; /* 占满容器高度 */
}
.publish-main { 
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  width: 70%; /* 确保 main 的宽度 */
  
  background-color: #ffffff; /* 设置容器的背景色为白色 */
  border: 3px solid #1D5B5E;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
}

.PublishAside {
  margin-right:25px;
}
</style>
