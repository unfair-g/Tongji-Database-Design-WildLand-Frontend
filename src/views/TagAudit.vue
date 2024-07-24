<template>
  <div class="tag">
    <h2 >更新标签</h2>
    <tag/>
  </div>
  <div class="tag">
    <h2>添加标签</h2>
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
  