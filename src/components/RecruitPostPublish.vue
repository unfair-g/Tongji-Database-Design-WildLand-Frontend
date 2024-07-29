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
          <el-form-item label="活动时间：">
            <el-input v-model="form.time" placeholder="请输入你的活动时间" />
          </el-form-item>
          <el-form-item label="活动地点：">
            <el-input v-model="form.location" placeholder="请输入你的活动地点" />
          </el-form-item>
          <el-form-item label="招募人数：">
            <el-input v-model="form.memberNum" placeholder="请输入你的计划招募人数" />
          </el-form-item>
          <el-form-item label="相关要求：">
            <el-input 
              type="textarea"
              v-model="form.requirements" 
              placeholder="请输入你对报名者的要求" 
              rows="5"
            />
          </el-form-item>

        </el-form>
      </div>
    </div>
</template>

<script>
import { reactive } from 'vue';


export default {
    name: 'RecruitPublish',
    data() {
        return {
            shutDialogVisible: false, // 控制关闭弹窗显示
            form: reactive({
                title: '',
                time: '',
                location: '',
                memberNum: '',
                requirements:'',
            }),
            

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
  width:75%;
}
.form-element {
  font-size: 18px;
}
.share-kind,
.rent-kind {
  background-color: white;
  color: black;
  border-color: #1D5B5E;
}
.recruit-kind {
  background-color: #1D5B5E;
  color: white;
}
</style>