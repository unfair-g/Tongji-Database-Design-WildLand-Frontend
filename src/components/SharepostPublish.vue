<template>
  <div class="publish-container">
    <div class="publish-header">
      <div class="publish-title">发布帖子</div>
    
      <el-button @click="openShutDialog" style="width: 20px">
        <el-icon><Close /></el-icon>
      </el-button>
      
      <el-dialog
        v-model="shutDialogVisible"
        title="确认删除"
        width="30%"
      >
        <span>您是否确认取消发布贴子？</span>
        <template #footer>
          <el-button @click="cancelShut">否</el-button>
          <el-button type="primary" @click="confirmShut">是</el-button>
        </template>
      </el-dialog>
    </div>
    <el-divider></el-divider>
    <div class="publish-info-form">
      <el-form :model="form" label-width="100px">
        <el-form-item label="帖子标题：" class="form-element">
          <el-input v-model="form.title" placeholder="请输入帖子标题" />
        </el-form-item>
        <el-form-item label="帖子类别：">
          <el-button class="share-kind">分享贴</el-button>
          <el-button class="recruit-kind">招募贴</el-button>
          <el-button class="rent-kind">闲置贴</el-button>
        </el-form-item>
        <el-form-item label="帖子内容：">
          <el-input 
            type="textarea" 
            v-model="form.content"
            placeholder="请输入帖子内容"
            rows="5"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="openImageUpload">点击添加图片</el-button>
          <el-dialog
            title="上传图片"
            v-model="imageUploadVisible"
            width="50%"
          >
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              multiple
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="fileList"
              list-type="picture-card"
              :on-success="handleUploadSuccess"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
            >
              <i class="el-icon-upload"></i>
              <template #tip>
                <div class="el-upload__tip">
                  只能上传jpg/png文件，且不超过500kb
                </div>
              </template>
            </el-upload>
            <el-dialog v-model="previewVisible">
              <img width="100%" :src="previewImage" alt="Preview Image"/>
            </el-dialog>
            <template #footer>
              <el-button @click="cancelUpload">取消</el-button>
              <el-button type="primary" @click="confirmUpload">确定</el-button>
            </template>
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';

export default {
  name: 'SharePublish',
  data() {
    return {
      shutDialogVisible: false, // 控制关闭弹窗显示
      imageUploadVisible: false, // 控制图片上传弹窗显示
      previewVisible: false, // 控制图片预览弹窗显示
      previewImage: '', // 预览的图片 URL
      form: reactive({
        title: '',
        content: '',
      }),
      fileList: [], // 已上传的文件列表
    };
  },
  methods: {
    openShutDialog() {
      this.shutDialogVisible = true;
    },
    confirmShut() {
      this.$router.push({ path: `/home/forum` });
    },
    cancelShut() {
      this.shutDialogVisible = false;
    },
    openImageUpload() {
      this.imageUploadVisible = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    handleUploadSuccess(response, file, fileList) {
      file.url = URL.createObjectURL(file.raw);
      this.fileList = fileList;
      this.$message.success(`上传成功：${file.name}`);
    },
    handleRemove(file, fileList) {
      this.$message.info(`删除成功：${file.name}`);
      this.fileList = fileList;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.raw;
      this.previewVisible = true;
    },
    cancelUpload() {
      this.imageUploadVisible = false;
    },
    confirmUpload() {
      this.$message.success('图片上传成功');
      this.imageUploadVisible = false;
    },
  }
}
</script>

<style scoped>
.publish-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.publish-header {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between; /* 标题和按钮分别位于两侧 */
}
.publish-title {
  font-size: 25px;
}
.divider {
  height: 1px;
  background-color: grey; /* 分界线颜色 */
  margin: 20px 0; /* 上下间距 */
  width: 100%;
}
.publish-info-form {
  margin-top: 2px;
}
.form-element {
  font-size: 18px;
}
.recruit-kind,
.rent-kind {
  background-color: white;
  color: black;
  border-color: #1D5B5E;
}
.share-kind {
  background-color: #1D5B5E;
  color: white;
}
.upload-demo {
  width: 100%;
}
</style>
