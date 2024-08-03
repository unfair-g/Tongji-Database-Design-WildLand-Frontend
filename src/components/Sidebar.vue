<template>
  <div class="sidebar">
    <el-popover
      v-if="isAlertVisible"
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
          <el-button type="primary" color="#1D5B5E" class="post-status-button" ref="buttonRef" v-click-outside="onClickOutside">
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
      <SharePublish v-model:isSharePostDialogVisible="isSharePostDialogVisible"/>
      <RecruitPublish v-model:isRecruitPostDialogVisible="isRecruitPostDialogVisible"/>
  </div>
  <!--this.$router.push('/home/forum/Ldleitems-post');-->
</template>

<script>
import HotUsers from './HotUsers.vue';
import HotPosts from './HotPosts.vue';
import LdlePost from '@/components/LdlePostWindow.vue'
import SharePublish from '@/components/SharepostPublish.vue'
import RecruitPublish from '@/components/RecruitPostPublish.vue'

export default {
  name: 'SidebarContent',
  components: {
    HotUsers,
    HotPosts,
    LdlePost,
    SharePublish,
    RecruitPublish
  },
  data() {
    return {
      isAlertVisible: false,
      isLdlePostDialogVisible: false,
      isSharePostDialogVisible: false,
      isRecruitPostDialogVisible:false,
      BeSilenced: false // 默认为 false
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
      console.log('Opening dialog');
      if (command === 'rent') {
        this.isLdlePostDialogVisible = true;
        console.log('Dialog Visible:', this.isLdlePostDialogVisible);
      }
      else if (command === 'share') {
        this.isSharePostDialogVisible = true;
        console.log('Dialog Visible:', this.isSharePostDialogVisible);
      }
      else  {
        this.isRecruitPostDialogVisible = true;
        console.log('Dialog Visible:', this.isRecruitPostDialogVisible);
      }
    },

    handleButtonClick() {
      if (this.BeSilenced) {
        this.isAlertVisible = true;
      } else {
        // BeSilenced 为 false 时，不执行任何操作
        return;
      }
    },
    onClickOutside() {
      if (this.$refs.popoverRef && this.$refs.popoverRef.popperRef) {
        this.$refs.popoverRef.popperRef.delayHide?.();
      }
    }
  },
}
</script>

<script setup>
import { ref } from 'vue'
import { ClickOutside as vClickOutside } from 'element-plus'

const buttonRef = ref(null)
const popoverRef = ref(null)

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
  width: 300px;
  border-radius: 10px; /* 修改边框圆角 */
  font-size: 16px; /* 修改字体大小 */
  padding: 10px 20px; /* 修改内边距 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影 */
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2); /* 添加文字阴影 */
}

::v-deep.dropdown-item {
  font-size: 28px;
   font-weight: bold; /* 设置选项字体加粗 */
}

</style>