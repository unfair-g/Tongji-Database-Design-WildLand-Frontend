<template>
<div class="group1">
        <el-card style="max-width: 52vw;min-width:52vw;margin-left:6vw;">
        <template #header>
        <div class="card-header">
        <span class="title">热门营地</span>
        </div>
        </template>
            <div class="container">
            <img src="../assets/camp11.png" style="width:75%">
            <div style="min-width:20%;max-width:20%;padding-top:10%;text-align: center;white-space:normal; word-break:break-all;overflow:hidden;">
                <p style="font-weight: bold;font-size:25px;margin-bottom: 20%">小野营地</p>
                给你家一般的感受
            </div>
            </div>
        <template #footer>
            <div class="footer">
            <el-pagination :size=large layout="prev, pager, next" :total="50" style="margin-top:0.5%;margin-left:auto;" />
            <el-icon class="icon"><Star /></el-icon>
            </div>
        </template>
        </el-card>
        <el-card style="max-width: 25vw;min-width:25vw;margin-left:8vw;margin-right:2vw">
        <template #header>
        <div class="card-header">
        <span class="title">热销爆款</span>
        </div>
        </template>
            <div class="container">
                <img src="../assets/product-1.png" style="width:70%">
                <div style="min-width:30%;max-width:30%;padding-top:10%;white-space:normal; word-break:break-all;overflow:hidden;">
                <p style="font-weight: bold;font-size:25px;margin-bottom: 20%">帐篷</p>
                <p>牢固防水，坚不可摧11111111111111111111111111111111111111</p>
                <p style="font-weight:bold;font-size: 20px;margin-top: 50%;">$255</p>
                </div>
            </div>
        <template #footer>
            <div class="footer">
            <el-pagination :size=large layout="prev, pager, next" :total="50" style="margin-top:0.5%;margin-left:auto;" />
            <el-icon class="icon"><Star /></el-icon>
            </div>
        </template>
        </el-card>
</div>
<HotPost />
</template>

<script>
import HotPost from "../components/HomeHotPost.vue"

export default{
    components: {
        HotPost
    }
}

</script>

<style scoped>
.group1{
    display:flex;
    min-width:100%;
    max-width: 100%;
    margin-top:3%;
    margin-bottom:5%;
}

.title{
    color:#1D5B5E;
    font-size:60px;
    font-family:'FZYaoti';
    font-style:italic;
    font-weight:bold;
}

.footer{
    display:flex;
    width:100%;
}

.icon{
    margin-left:auto;
    font-size:30px;
    cursor: pointer;
    color:#1D5B5E;
}

.container{
    display: flex;
    max-width: 100%;
}

</style>