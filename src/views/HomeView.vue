<template>
<div class="group1">
        <el-card style="max-width: 52vw;min-width:52vw;margin-left:6vw;">
        <template #header>
        <div class="card-header">
        <span class="title">热门营地</span>
        </div>
        </template>
            <div class="hot-container" @click="ToHotCamp">
            <img :src="hotcamps[this.currentcamp].image" style="width:75%">
            <div style="min-width:25%;max-width:25%;padding-top:10%;text-align: center;white-space:normal; word-break:break-all;overflow:hidden;">
                <p style="font-weight: bold;font-size:25px;margin-bottom: 20%">{{ this.hotcamps[currentcamp].campground_name }}</p>
                {{ hotcamps[currentcamp].introduction }}
            </div>
            </div>
        <template #footer>
            <div class="footer">
            <el-pagination :size=large :page-size=1 layout="prev, pager, next"
            v-model:current-page="this.currentcamp"
            :total="5" style="margin:auto;" />
            </div>
        </template>
        </el-card>

        <el-card style="max-width: 25vw;min-width:25vw;margin-left:8vw;margin-right:2vw">
        <template #header>
        <div class="card-header">
        <span class="title">热销爆款</span>
        </div>
        </template>
            <div class="hot-container" @click="ToHotProduct">
                <img :src="hotproducts[currentproduct].product_image" style="width:70%;height:300px">
                <div style="min-width:30%;max-width:30%;white-space:normal; word-break:break-all;overflow:hidden;">
                <p style="font-weight: bold;font-size:25px;margin-bottom: 20%">{{ hotproducts[currentproduct].product_name }}</p>
                <p>{{ hotproducts[currentproduct].introduction }}</p>
                <p style="font-weight:bold;font-size: 20px;margin-top: 50%;">${{ hotproducts[currentproduct].price }}</p>
                </div>
            </div>
        <template #footer>
            <div class="footer" >
            <el-pagination :size=large :page-size=1 layout="prev, pager, next" 
            v-model:current-page="this.currentproduct"
            :total="5" style="margin:auto;" />
            </div>
        </template>
        </el-card>
</div>
<HotPost />
</template>

<script>
import HotPost from "../components/HomeHotPost.vue"

export default {
    data() {
        return {
            currentcamp: 1,
            currentproduct: 1,
        }
    },
    components: {
        HotPost
    },
    computed: {
        hotcamps() {
            return this.$store.state.camp.camps
        },
        hotproducts() {
            return this.$store.state.product.products
        }
    },
    methods: {
        ToHotCamp() {
            this.$router.push({ path: `/home/campdetail/${this.hotcamps[this.currentcamp].campground_id}` });
        },
        ToHotProduct() {
            this.$router.push({ path: `/home/product/${this.hotproducts[this.currentproduct].product_id}` })
        }
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
    width:100%;
    justify-content: center;
    display:flex;
}

.icon{
    margin-left:auto;
    font-size:30px;
    cursor: pointer;
    color:#1D5B5E;
}

.hot-container{
    display: flex;
    max-width: 100%;
}

</style>