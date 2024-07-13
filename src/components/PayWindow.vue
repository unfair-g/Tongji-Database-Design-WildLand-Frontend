<template>
    <el-dialog
      title="支付窗口"
      :visible="localDialogVisible"
      width="30%"
      @close="handleClose">
      <span>支付内容</span>
      <template v-slot:footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="confirmDialog">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script>
  export default {
    name: 'PayWindow',
    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        localDialogVisible: this.dialogVisible
      };
    },
    watch: {
      dialogVisible(newVal) {
        console.log('dialogVisible prop changed:', newVal);
        this.localDialogVisible = newVal;
      },
      localDialogVisible(newVal) {
      console.log('localDialogVisible changed:', newVal);
      this.$emit('update:dialogVisible', newVal);
    }
    },
    methods: {
      handleClose() {
        this.closeDialog();
      },
      closeDialog() {
        this.localDialogVisible = false;
      },
      confirmDialog() {
        this.localDialogVisible = false;
        // 这里可以添加更多逻辑，如处理支付确认
      }
    }
  }
  </script>
  
  <style scoped>
  .dialog-footer {
    text-align: right;
  }
  </style>
  