<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue' // 导入 Plus 图标

export default {
  name: 'OrderView',
  components: {
    Plus // 注册 Plus 图标组件
  },
  setup() {
    const imageUrl = ref('')

    const handleAvatarSuccess = (response, file) => {
      imageUrl.value = URL.createObjectURL(file.raw);
      ElMessage.success('Upload success');
    }

    const beforeAvatarUpload = (file) => {
      const isJPG = file.type === 'image/jpeg';
      const isPNG = file.type === 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        ElMessage.error('Avatar picture must be JPG or PNG format!');
        return false;
      }

      if (!isLt2M) {
        ElMessage.error('Avatar picture size must be less than 2MB!');
        return false;
      }
      return true;
    }

    return {
      imageUrl,
      handleAvatarSuccess,
      beforeAvatarUpload
    }
  }
}
</script>

<style scoped>
.avatar-uploader {
  width: 200px;
  height: 200px;
  border: 1px dashed #d9d9d9;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}
.avatar {
  width: 100%;
  height: 100%;
}
</style>
