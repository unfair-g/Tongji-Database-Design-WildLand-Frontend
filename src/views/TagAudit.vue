<template>
  <div class="tag">
    <h2 >更新标签</h2>
    <tag/>
  </div>
  <div class="tag">
    <h2>添加标签</h2>
    <el-input
    v-model="textarea"
    style="width: 73%; margin-top: 20px; margin-bottom: 20px;"
    :rows="10"
    type="textarea"
    placeholder="Please input"
  />
  <div>
    <el-button :color="'#1D5B5E'">添加标签</el-button>  
  </div>
  </div>
  </template>
  
  <script>
  import tag from '../components/Tag.vue';

  export default {
    components: {
    tag
},
  };
  </script>
  
  <style scoped>
.tag{
  margin-left: 10%;
}
  </style>
  