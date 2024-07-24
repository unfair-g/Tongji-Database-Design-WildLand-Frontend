<template>
    <el-dialog
      :visible="localVisible"
      title="支付确认"
      width="30%"
      @close="handleClose"
    >
      <span>总价: ¥{{ totalPrice }}</span>
      <template #footer>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handlePay">确认支付</el-button>
      </template>
    </el-dialog>
  </template>
  
  <script>
  export default {
    name: 'CampPayWindow',
    props: {
      visible: {
        type: Boolean,
        required: true
      },
      totalPrice: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        localVisible: this.visible
      };
    },
    watch: {
      visible(newVal) {
        this.localVisible = newVal;
      },
      localVisible(newVal) {
        this.$emit('update:visible', newVal);
      }
    },
    methods: {
      handleClose() {
        this.localVisible = false;
      },
      handlePay() {
        this.$emit('pay');
        this.handleClose();
      }
    }
  };
  </script>
  
  <style scoped>
  .dialog-footer {
    display: flex;
    justify-content: space-between;
  }
  </style>
  