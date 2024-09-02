<template>
  <div class="tag">
    <h2 >更新标签</h2>
    <tag/>
  </div>
  <div class="tag">
    <h2>添加标签</h2>
    <el-button plain 
    :color="'#1D5B5E'" 
    style="margin-top: 1%;margin-left: 3%;"
    @click="dialogFormVisible = true">
      添加标签
    </el-button>
  </div>
  <el-dialog v-model="dialogFormVisible" title="输入新tag" width="500">
    <el-input
      v-model="tag.tag_name"
      style="margin-top: 20px; margin-bottom: 20px;"
      :rows="10"
      type="textarea"
      placeholder="Please input"
    />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button :color="'#1D5B5E'" @click="updateTag">添加标签</el-button>  
      </div>
    </template>
  </el-dialog>
  </template>
  
  <script>
  import tag from '../components/Tag.vue';
  import axios from '@/axios'; // 引入配置好的axios实例
  import { ref} from 'vue'

  export default {
    data() {
    return {
      tag:{
        tag_id:37,
        tag_name:'输入新tag'
      }
    };
  },
    components: {
    tag
},
setup() {
  const dialogTableVisible = ref(false)
  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'

  return{
    dialogTableVisible,
    dialogFormVisible,
    formLabelWidth,
  }
},
methods: {  
    updateTag() {  
      // 发送 PUT 请求来更新 Flash  
      axios.post(`/api/FlashTags`, {  
          tag_name: this.tag.tag_name
        // 如果需要更新其他字段，也可以在这里添加  
      })  
      .catch(error => {  
        console.error('Error updating flash:', error);  
        this.$message.error('资讯更新失败，请重试！');  
      });  
    },   
  }  ,
  };
  </script>
  
  <style scoped>
.tag{
  margin-left: 10%;
}
  </style>
  