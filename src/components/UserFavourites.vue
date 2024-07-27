<template>
<div style="display: flex;padding-left:2%;padding-top:1% ">
    <h3 style="font-size:55px">我的收藏夹</h3>
    <el-tabs v-model="componentTag"  class="favourites" stretch="true">
        <el-tab-pane label="营地" name="camp" width="10px">
        </el-tab-pane>
        <el-tab-pane label="户外用品" name="product">
        </el-tab-pane>
        <el-tab-pane label="帖子" name="post">
        </el-tab-pane>
        <el-tab-pane label="经验资讯" name="flash">
        </el-tab-pane>
    </el-tabs>
</div>
<div style="margin:2%;">
<component :is="componentTag"></component>
</div>
</template>

<script>
import camp from './StarCamp.vue'

export default {
    components: {
        camp
    },
    data() {
        return {
            activeTab: '营地',
            componentTag:'camp'  
        }
    }
}

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