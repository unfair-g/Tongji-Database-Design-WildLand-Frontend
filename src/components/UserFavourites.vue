<template>
<div style="display: flex;padding-left:2%;padding-top:1% ">
    <h3 style="font-size:55px">我的收藏夹</h3>
    <el-tabs v-model="componentTab"  class="favourites" stretch="true" @tab-click="handleClick">
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
    <span style="font-size:35px;color:grey;">{{ tips }}</span>
    <el-row :gutter="25" v-if="componentTab==='camp'">
        <el-col :span="8" v-for="camp in starcamp" :key="camp.id">
            <el-card  style="margin-bottom:8%" @click="goToCampDetail(camp)">
                <img :src="camp.camp_showpic" style="width:100%"/>
                <template #footer>
                    <h3>{{ camp.campground_name }}</h3>
                    <div style="margin-top:3%">{{ camp.slogan }}</div>
                </template>
            </el-card>
        </el-col>
  </el-row>
  <el-row :gutter="25" v-else-if="componentTab==='product'">
        <el-col :span="8" v-for="product in starproduct" :key="product.product_id">
            <el-card  style="margin-bottom:8%" @click="goToProductDetail(product.product.product_id)">
                <img :src="product.picUrl[0]" alt="product_img" style="width:100%;height:300px"/>
                <template #footer>
                    <h3>{{ product.product.product_name }}</h3>
                    <div style="margin-top:3%">{{ product.product.introduction }}</div>
                </template>
            </el-card>
        </el-col>
  </el-row>
  <el-row :gutter="25" v-else-if="componentTab==='flash'">
        <el-col :span="8" v-for="flash in starflash" :key="flash.flashId">
            <el-card  style="margin-bottom:8%" @click="goToFlashDetail(flash)">
                <img :src="flash.picUrls[0]" alt="flash-img" style="width:100%;height:300px"/>
                <template #footer>
                    <h3>{{ flash.flashTitle }}</h3>
                    <div style="margin-top:3%">作者：{{ flash.userId }}</div>
                </template>
            </el-card>
        </el-col>
  </el-row>
  <div v-else v-loading="loading" element-loading-text="Loading...">
    <div v-for="post in starpost" :key="post.post_id">
    <Post :view="post.post_kind" :post_id="post.post_id" star=true @loaded="onChildLoaded" />
    </div>
  </div>
</div>
</template>

<script setup>
import Post from '../components/Article.vue'
import global from '@/store/global'
import router from '@/router'
import axios from '@/axios'
import { ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

const componentTab = ref('camp')  
const starcamp = ref()
const starflash = ref()
const starproduct = ref()
const starpost=ref()
const tips = ref('')
const loading=ref(true)

const fetchStarCamps = async () => {
    try {
        const response =await axios.get(`/api/Users/getStarCampground/${global.userId}`)
        starcamp.value = response.data.data
    } catch (error) {
        if (error.response.status == 404)
            tips.value = '暂无收藏营地'
        else
            ElMessage.error(error.message)
        console.log(error)
    }
}

const fetchStarProducts = async () => {
    try {
        const response =await axios.get(`/api/Users/getStarOutdoorProduct/${global.userId}`)
        starproduct.value = response.data.data      
    } catch (error) {
        if (error.response.status == 404)
            tips.value = '暂无收藏户外用品'
        else
            ElMessage.error(error.message)
        console.log(error)
    }
}

const fetchStarFlashes = async () => {
    try {
        const response =await axios.get(`/api/StarFlashes/GetStarFlashByUserId?user_id=${global.userId}`)
        starflash.value = response.data
        if (starflash.value.length==0)
            tips.value = '暂无收藏经验资讯'
    } catch (error) {
        ElMessage.error(error.message)
    }
}

const loadedCount = ref(0); // 跟踪已加载的子组件数量

const onChildLoaded = () => {
  loadedCount.value++;
    if (loadedCount.value === starpost.value.length) {
        nextTick(()=> {
            loading.value = false; // 当所有子组件都加载完成时停止 loading
        })
  }
};

const fetchStarPosts = async () => {
    try {
        const response =await axios.get(`/api/Users/getStarPost/${global.userId}`)
        starpost.value = response.data.data
    } catch (error) {
        if (error.response.status == 404) 
            tips.value = '暂无收藏帖子'
        else
            ElMessage.error(error.message)
    }
}

const handleClick = async (tab) => {
    tips.value = ''
    if (tab.props.name == 'camp')
        fetchStarCamps();
    else if (tab.props.name == 'product')
        fetchStarProducts();
    else if (tab.props.name == 'post') {
        fetchStarPosts();
    }
    else
        fetchStarFlashes();
}

function goToProductDetail (product_id) {
    router.push({ path: `/home/product/${product_id}` })
}
        
function goToCampDetail (camp) {
    router.push({ path: `/home/campdetail/${camp.campground_id}` })
}

function goToFlashDetail (flash) {
    const flashId = flash.flashId
    router.push({ path: `/home/flash/${flashId}` })
}

onMounted(() => {
    fetchStarCamps();
})
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