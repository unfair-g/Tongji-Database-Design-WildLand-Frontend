<template>
<div class="group1">
        <el-card style="max-width: 52vw;min-width:52vw;margin-left:6vw;">
        <template #header>
        <div class="card-header">
        <span class="title">热门营地</span>
        </div>
        </template>
            <div class="hot-container" v-if="hotcamps.length > 0" @click="ToHotCamp">
            <img :src="hotcamps[currentcamp-1].camp_showpic" class="camp-image">
            <div style="min-width:25%;max-width:25%;padding-top:10%;text-align: center;white-space:normal; word-break:break-all;overflow:hidden;">
                <p style="font-weight: bold;font-size:25px;margin-bottom: 20%">{{ hotcamps[currentcamp-1].campground_name }}</p>
                {{ hotcamps[currentcamp-1].slogan }}
            </div>
            </div>
        <template #footer>
            <div class="footer">
            <el-pagination :size=large :page-size=1 layout="prev, pager, next"
            v-model:current-page="currentcamp"
            :total="hotcamps.length" style="margin:auto;" />
            </div>
        </template>
        </el-card>

        <el-card style="max-width: 25vw;min-width:25vw;margin-left:8vw;margin-right:2vw">
        <template #header>
        <div class="card-header">
        <span class="title">热销爆款</span>
        </div>
        </template>
            <div class="hot-container" v-if="hotproducts.length > 0" @click="ToHotProduct">
                <img :src="hotproducts[currentproduct-1].product_pic" class="product-image">
            <div style="min-width:30%;max-width:30%;white-space:normal; word-break:break-all;overflow:hidden;">
                <p style="font-weight: bold;font-size:25px;margin-bottom: 20%">{{ hotproducts[currentproduct-1].product_name }}</p>
                <p>{{ hotproducts[currentproduct-1].introduction }}</p>
                <p style="font-weight:bold;font-size: 20px;margin-top: 50%;">¥{{ hotproducts[currentproduct-1].price }}</p>
            </div>
            </div>
        <template #footer>
            <div class="footer" >
            <el-pagination :size=large :page-size=1 layout="prev, pager, next" 
            v-model:current-page="currentproduct"
            :total="hotproducts.length" style="margin:auto;" />
            </div>
        </template>
        </el-card>
</div>
<HotPost />
</template>

<script>
import axios from '@/axios';
import HotPost from "../components/HomeHotPost.vue"

export default {
    data() {
        return {
            currentcamp: 1,
            currentproduct: 1,
            hotcamps: [], // 存储从接口获取的热门营地信息
            hotproducts: [] // 存储从接口获取的热销户外用品信息
        }
    },
    components: {
        HotPost
    },
    created() {
      this.fetchHotCamps();
      this.fetchHotProducts();
    },
    methods: {
        //调用接口来获取hotcamps
        async fetchHotCamps() {
        try {
        const response = await axios.get('api/Campgrounds/TopFiveByOrders');
        this.hotcamps = response.data;
        } catch (error) {
        console.error('获取热门营地失败:', error);
        }
        },
        // 调用接口获取热销户外用品信息
        async fetchHotProducts() {
            try {
                const response = await axios.get('api/OutdoorProducts/RandomProducts');
                this.hotproducts = response.data;
            } catch (error) {
                console.error('获取热销户外用品失败:', error);
            }
        },
        ToHotCamp() {
            this.$router.push({ path: `/home/campdetail/${this.hotcamps[this.currentcamp-1].campground_id}` });
        },
        ToHotProduct() {
            this.$router.push({ path: `/home/product/${this.hotproducts[this.currentproduct-1].product_id}` })
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

.camp-image {
  width: 75%;      /* 设定图片的宽度 */
  height: 260px;    /* 设定图片的高度 */
  object-fit: cover; /* 使图片内容覆盖容器 */
}

.product-image {
  width: 60%;      /* 设定图片的宽度 */
  height: 260px;    /* 设定图片的高度 */
  object-fit: cover; /* 使图片内容覆盖容器 */
  margin-right: 20px;
}
</style>