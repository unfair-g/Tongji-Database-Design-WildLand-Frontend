<template>  
  <div style="margin:1%">  
    <h2>消息通知</h2>
    <div class=""></div>
    <el-tabs v-model="activeTab" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="全部" name="all"></el-tab-pane>
    <el-tab-pane label="关注" name="follow"></el-tab-pane>
    <el-tab-pane label="活动" name="activity"></el-tab-pane>
    <el-tab-pane label="举报" name="report"></el-tab-pane>
    <el-tab-pane label="我卖出的闲置" name="purchased"></el-tab-pane>
    </el-tabs>
    <MessageList :activeTab="activeTab"/>  
  </div>  
</template>  
  
<script>  
import MessageList from '../components/MessageList.vue';  
  
export default {  
  name: 'App',  
  data () {
    return {
      activeTab: 'all'
    }
  },
  components: {  
    MessageList  
  }  ,
}  
</script>  
  
<style>  

</style>