<template>
<div style="display: flex;padding-left:2%;padding-top:1% ">
    <h3 style="font-size:55px">我的收藏夹</h3>
    <el-tabs v-model="activeTab"  class="favourites" stretch="true">
        <el-tab-pane label="营地" name="营地" width="10px">
        </el-tab-pane>
        <el-tab-pane label="户外用品" name="户外用品">
        </el-tab-pane>
        <el-tab-pane label="帖子" name="帖子">
        </el-tab-pane>
        <el-tab-pane label="经验资讯" name="经验资讯">
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>

</script>

<style scoped>
::v-deep .el-tabs__item {
  font-size: 30px;
  font-weight: bold;
  color:#6f6d6d;
}

::v-deep .el-tabs__item:hover{
    color:#1D5B5E;
}

::v-deep .is-active{
    color:#1D5B5E;
}

.favourites{
    margin-left:5%;
    margin-top:1%;
    width:70%
}

</style>