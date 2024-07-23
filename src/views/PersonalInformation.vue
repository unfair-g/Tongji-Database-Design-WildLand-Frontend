<template>  
  <div>  
    <h2>消息通知</h2>
    <el-button
      text
      style="float: right; color: #1D5B5E;" 
    >
      全部已读
    </el-button>
    <div class=""></div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="全部" name="first"></el-tab-pane>
    <el-tab-pane label="关注" name="second"></el-tab-pane>
    <el-tab-pane label="活动" name="third"></el-tab-pane>
    <el-tab-pane label="举报" name="fourth"></el-tab-pane>
    </el-tabs>
    <MessageList />  
  </div>  
</template>  
  
<script>  
import MessageList from '../components/MessageList.vue';  
  
export default {  
  name: 'App',  
  components: {  
    MessageList  
  }  
}  
</script>  
  
<style>  

</style>