<template>
    <div class="mypost">
        <h2>我的帖子</h2>
        <el-tabs v-model="activeTab"  style="margin-top:1%">
            <el-tab-pane label="分享贴" name="share">
            </el-tab-pane>
            <el-tab-pane label="闲置贴" name="lease">
            </el-tab-pane>
            <el-tab-pane label="活动招募贴" name="recruit">
            </el-tab-pane>
        </el-tabs>
        <Post :view="activeTab"/>
    </div>
</template>

<script>
import Post from '../components/Article.vue'

export default {
    components: {
        Post
    },

    data() {
        return {
            activeTab:'share'
        }
    }
}
</script>

<style scoped>
.mypost{
    height:fit-content;
    background-color: rgb(255,255,255,80%);
    box-shadow: 0 0 5px 1px #888888;
    padding:1%;
}

::v-deep .el-tabs__item {
  font-size: 20px;
  font-weight: bold;
}

::v-deep .el-tabs__item:hover{
    color:#1D5B5E;
}

::v-deep .is-active{
    color:#1D5B5E;
}

</style>