<template>
  <div class="sidebar">
    <el-popover
      ref="popoverRef"
      :virtual-ref="buttonRef"
      trigger="click"
      virtual-triggering
      width="400"
      @hide="onPopoverHide"
    >
      <el-alert
        v-if="isAlertVisible"
        title="您已被禁言不可发帖至2024年9月28日14:30"
        type="error"
        show-icon
        class="custom-alert"
        @close="onAlertClose"
      />
    </el-popover>
    <div class="fixed-item post-status">
      <el-dropdown @command="handleCommand">
        <template v-slot:default>
          <el-button type="primary" class="post-status-button" ref="buttonRef" v-click-outside="onClickOutside">
            点击发布帖子
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </template>
        <template v-slot:dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="share" class="dropdown-item" style="font-size: 20px; ">分享贴</el-dropdown-item>
            <el-dropdown-item command="rent" class="dropdown-item" style="font-size: 20px;">闲置贴</el-dropdown-item>
            <el-dropdown-item command="recruit" class="dropdown-item" style="font-size: 20px;">招募贴</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
        </div>
    <div class="fixed-item hot-users">
      <HotUsers />
    </div>
    <div class="fixed-item hot-posts">
      <HotPosts />
    </div>
    <!-- Add the LdlePost dialog component -->
      <LdlePost v-model:isLdlePostDialogVisible="isLdlePostDialogVisible" />
  </div>
  <!--this.$router.push('/home/forum/Ldleitems-post');-->
</template>

<script>
import HotUsers from './HotUsers.vue';
import HotPosts from './HotPosts.vue';
import LdlePost from '@/components/LdlePostWindow.vue'

export default {
  name: 'SidebarContent',
  components: {
    HotUsers,
    HotPosts,
    LdlePost
  },
  data() {
    return {
      isAlertVisible: true,
      isLdlePostDialogVisible:false
    };
  },
  methods: {
    onAlertClose() {
      this.isAlertVisible = false;
      if (this.popoverRef && this.popoverRef.popperRef) {
        this.popoverRef.popperRef.hide();
      }
    },
    onPopoverHide() {
      // 每次隐藏 popover 时重置 alert 的显示状态
      this.isAlertVisible = true;
    },
    handleCommand(command) {
      if (command === 'share') {
        this.$router.push('/share-post');
      } else if (command === 'rent') {
        this.openDialog();
      } else if (command === 'recruit') {
        this.$router.push('/recruit-post');
      }
    },
    openDialog() {
      console.log('Opening dialog');
      this.isLdlePostDialogVisible = true;
      console.log('Dialog Visible:', this.isLdlePostDialogVisible);
    }
  },
}
</script>

<script setup>
import { ref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'

const buttonRef = ref(null)
const popoverRef = ref(null)
const onClickOutside = () => {
  if (popoverRef.value && popoverRef.value.popperRef) {
    popoverRef.value.popperRef.delayHide?.()
  }
}
</script>

<style scoped>
.sidebar {
  padding: 20px;
  position: relative; /* 确保 fixed 子元素相对于它定位 */
}
.fixed-item {
  position: fixed;
  width: 300px; /* 设置固定宽度 */
}
.post-status {
  top: 110px;
}
.hot-users {
  top: 160px; /* 调整距离顶部的距离，根据需要设置 */
}
.hot-posts {
  top: 550px; /* 调整距离顶部的距离，根据需要设置 */
}
.post-status,
.hot-users,
.hot-posts {
  margin-bottom: 20px;
}
.post-status-button {
  width: 100%;
  background-color: #fff; /* 修改背景颜色 */
  color: #1D5B5e; /* 修改文字颜色 */
  border-radius: 10px; /* 修改边框圆角 */
  font-size: 16px; /* 修改字体大小 */
  padding: 10px 20px; /* 修改内边距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影 */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); /* 添加文字阴影 */
}
.post-status-button:hover {
  background-color: #2e5e5e; /* 修改悬停背景颜色 */
  color: #fff; /* 修改文字颜色 */
}
.post-status-button:active {
  background-color: #1e4040; /* 修改点击背景颜色 */
  color: #fff; /* 修改文字颜色 */
}

::v-deep.dropdown-item {
  font-size: 28px;
   font-weight: bold; /* 设置选项字体加粗 */
}

</style>
