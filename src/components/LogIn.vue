<template>
<div class="bg">
    <div class="role">
        <i class="iconfont icon-dianzan" />
         <el-button class="userbutton" type="primary" color="#1D5B5E" circle>游客</el-button>
         <el-button class="adbutton" type="primary" color="#308588" circle>管理</el-button>
    </div>
  <div style="margin: 20px" />
  <el-form
    :label-position="labelPosition"
    label-width="auto"
    :model="formLabelAlign"
    style="max-width: 600px"
  >
    <el-form-item label="Name">
      <el-input v-model="formLabelAlign.name" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-input v-model="formLabelAlign.region" />
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="formLabelAlign.type" />
    </el-form-item>
  </el-form>
</div>
</template>

<script setup>
import { reactive} from 'vue'

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
</script>

<style>
.bg{
    background-color:rgb(255,255,255,80%);
    bottom :0;
    left:0;
    height:100%;
    width:55%;
    position: absolute;
}

.role{
    margin-top: 15%;
}

.userbutton{
    min-width: 100px; /* 更改圆形按钮的宽度 */
    height: 100px; /* 更改圆形按钮的高度 */
    font-size:38px;
    margin-left:25%;
    margin-right: 20%;
}

.adbutton{
    min-width: 100px; /* 更改圆形按钮的宽度 */
    height: 100px; /* 更改圆形按钮的高度 */
    font-size:38px;
    margin-left:auto;
    margin-right: auto;
}

</style>