<template>
  <div class="tag">
    <h2 >更新标签</h2>
    <tag/>
  </div>
  <div class="tag">
    <h2>添加标签</h2>
    <el-input
    v-model="tag.tag_name"
    style="width: 73%; margin-top: 20px; margin-bottom: 20px;"
    :rows="10"
    type="textarea"
    placeholder="Please input"
  />
  <div>
    <el-button :color="'#1D5B5E'" @click="updateTag">添加标签</el-button>  
  </div>
  </div>
  </template>
  
  <script>
  import tag from '../components/Tag.vue';
  import axios from '@/axios'; // 引入配置好的axios实例

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
methods: {  
    updateTag() {  
      // 发送 PUT 请求来更新 Flash  
      axios.post(`https://localhost:7218/api/FlashTags`, {  
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
  