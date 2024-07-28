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
          <el-button type="primary" class="post-status-button" ref="buttonRef" @click="handleButtonClick" v-click-outside="onClickOutside">
            点击发布帖子
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </template>
        <template v-slot:dropdown v-if="!BeSilenced">
          <el-dropdown-menu>
            <el-dropdown-item command="share" class="dropdown-item" style="font-size: 20px;">分享贴</el-dropdown-item>
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
    <LdlePost v-model:isLdlePostDialogVisible="isLdlePostDialogVisible" />
  </div>
</template>

<script>
import HotUsers from './HotUsers.vue';
import HotPosts from './HotPosts.vue';
import LdlePost from '@/components/LdlePostWindow.vue';

export default {
  name: 'SidebarContent',
  components: {
    HotUsers,
    HotPosts,
    LdlePost
  },
  data() {
    return {
      isAlertVisible: false,
      isLdlePostDialogVisible: false,
      BeSilenced: false // 默认为 false
    };
  },
  methods: {
    onAlertClose() {
      this.isAlertVisible = false;
      if (this.$refs.popoverRef && this.$refs.popoverRef.popperRef) {
        this.$refs.popoverRef.popperRef.hide();
      }
    },
    onPopoverHide() {
      this.isAlertVisible = true;
    },
    handleCommand(command) {
        this.$router.push({ path: '/home/forum/publish', query: { command } });
    },
    openDialog() {
      this.isLdlePostDialogVisible = true;
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
  }
}
</script>

<script setup>
import { ref } from 'vue';
import { ClickOutside as vClickOutside } from 'element-plus';

const buttonRef = ref(null);
const popoverRef = ref(null);
</script>

<style scoped>
.sidebar {
  padding: 20px;
  position: relative;
}
.fixed-item {
  position: fixed;
  width: 300px;
}
.post-status {
  top: 110px;
}
.hot-users {
  top: 160px;
}
.hot-posts {
  top: 550px;
}
.post-status,
.hot-users,
.hot-posts {
  margin-bottom: 20px;
}
.post-status-button {
  width: 100%;
  background-color: #fff;
  color: #1D5B5E;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.post-status-button:hover {
  background-color: #2e5e5e;
  color: #fff;
}
.post-status-button:active {
  background-color: #1e4040;
  color: #fff;
}
::v-deep.dropdown-item {
  font-size: 28px;
  font-weight: bold;
}
</style>
