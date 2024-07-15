<template>
<div class="group1">
    <div class="hotcamp" style="max-width:100%">
        <el-card style="width: 45vw;margin-left:6vw;">
        <template #header>
        <div class="card-header">
        <span class="title">热门营地</span>
        </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
        <template #footer>
            <el-pagination :size=large layout="prev, pager, next" :total="50" />
        </template>
        </el-card>
    </div>
    <div class="hotproduct" style="background-color:#FFFFFF">
        <el-card style="width: 30vw;margin-left:10vw;">
        <template #header>
        <div class="card-header">
        <span class="title">热销爆款</span>
        </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
        <template #footer>
            <el-pagination :size=large layout="prev, pager, next" :total="50" />
        </template>
        </el-card>
    </div>
</div>
<div>
     <el-card style="width: 85vw;margin-left:6vw;">
        <template #header>
        <div class="card-header">
        <span class="title">热门帖子</span>
        </div>
        </template>
        <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
        <template #footer>
            <el-pagination :size=large layout="prev, pager, next" :total="50" />
        </template>
        </el-card>
</div>
</template>

<script>

</script>

<style>
.group1{
    display:flex;
    min-width:100%;
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
</style>