<template>
  <el-dialog
    title="招募贴发布"
    v-model="localIsRecruitPostDialogVisible"
    width="55%"
    center
    @close="handleClose"
  >

    <div class="publish-container">
      <el-divider></el-divider>

      <div class="publish-info-form">
        <el-form :model="postForm" ref="postForm" @submit.prevent="submitForm" label-width="100px">
          <el-form-item label="帖子标题：" prop="myTitle" style="font-weight: bold;">
            <el-input v-model="postForm.myTitle" placeholder="请输入帖子标题" />
          </el-form-item>
          <el-form-item label="活动时间：" prop="time" style="font-weight: bold;">
            <el-input v-model="postForm.time" placeholder="请输入你的活动时间" />
          </el-form-item>
          <el-form-item label="活动地点：" prop="location" style="font-weight: bold;">
            <el-input v-model="postForm.location" placeholder="请输入你的活动地点" />
          </el-form-item>
          <el-form-item label="招募人数：" prop="memberNum" style="font-weight: bold;">
            <el-input v-model="postForm.memberNum" placeholder="请输入你的计划招募人数" />
          </el-form-item>
          <el-form-item label="相关要求：" prop="requirements" style="font-weight: bold;">
            <el-input 
              type="textarea"
              v-model="postForm.requirements" 
              placeholder="请输入你对报名者的要求" 
              rows="5"
            />
          </el-form-item>
          <el-form-item class="buttons">
            <el-button type="default" @click="handleClose">取消</el-button>
            <el-button type="primary" color="#1D5B5E" native-type="submit" @click="confirmDialog()">立即发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </el-dialog>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'RecruitPublish',
  props: {
    isRecruitPostDialogVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const postForm = ref({
      myTitle: '',
      time: '',
      location: '',
      memberNum: '',
      requirements: ''
    });

    const localIsRecruitPostDialogVisible = ref(props.isRecruitPostDialogVisible);

    watch(() => props.isRecruitPostDialogVisible, (newVal) => {
      localIsRecruitPostDialogVisible.value = newVal;
    });

    watch(localIsRecruitPostDialogVisible, (newVal) => {
      emit('update:isRecruitPostDialogVisible', newVal);
    });

    const submitForm = () => {
      console.log('Form submitted:', postForm.value);
    };

    const resetForm = () => {
      postForm.value = {
        myTitle: '',
        time: '',
        location: '',
        memberNum: '',
        requirements: '',
      };
    };

    const handleClose = () => {
      closeDialog();
      resetForm();
    };

    const closeDialog = () => {
      localIsRecruitPostDialogVisible.value = false;
    };

    return {
      postForm,
      localIsRecruitPostDialogVisible,
      submitForm,
      resetForm,
      handleClose,
      closeDialog
    };
  },
  methods: {
    confirmDialog() {
      this.localIsRecruitPostDialogVisible = false
      this.PostSuccess = true
      //添加发布成功逻辑
    }
  }
};
</script>

<style scoped>
.publish-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.divider {
  height: 1px;
  background-color: grey; /* 分界线颜色 */
  margin: 20px 0; /* 上下间距 */
  width: 100%;
}
.publish-info-form {
  margin-top: 2px;
  width:75%;
}
</style>
