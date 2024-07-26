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
  }  ,
  computed: {  
    // 使用计算属性来根据selectedType过滤消息  
    filteredMessages() {  
      if (!this.selectedType) {  
        // 如果没有选择类型，则返回所有消息  
        return this.messages;  
      }  
      // 否则，返回匹配指定类型的消息  
      return this.messages.filter(message => message.type === this.selectedType);  
    }  
  } 
}  
</script>  
  
<style>  

</style>