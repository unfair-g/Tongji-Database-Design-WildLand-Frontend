<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.el-loading-spinner .circular{
  width: 42px;
  height: 42px;
  animation: loading-rotate 2s linear infinite;
  display: none;
}

.el-loading-spinner{

  /* 图片替换为你自定义的即可 */
  background: url('./assets/loading.gif') no-repeat;
  background-size: 250px 250px;
  width: 100%;
  height: 100%;
  background-position:center;
  top:0;
}

.el-loading-spinner .el-loading-text{
  /*为了使得文字在loading图下面*/
  color: #1D5B5E;
  font-size: 25px;
  margin-top:60vh
}
</style>
