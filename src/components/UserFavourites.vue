<template>
<div style="display: flex;padding-left:2%;padding-top:1% ">
    <h3 style="font-size:55px">我的收藏夹</h3>
    <el-tabs v-model="componentTab"  class="favourites" stretch="true">
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
    <el-row :gutter="25" v-if="componentTab==='camp'">
        <el-col :span="8" v-for="camp in starcamp" :key="camp.id">
            <el-card  style="margin-bottom:8%" @click="goToCampDetail(camp)">
                <img :src="camp.image" style="width:100%"/>
                <template #footer>
                    <h3>{{ camp.campground_name }}</h3>
                    <div style="margin-top:3%">{{ camp.introduction }}</div>
                </template>
            </el-card>
        </el-col>
  </el-row>
  <el-row :gutter="25" v-else-if="componentTab==='product'">
        <el-col :span="8" v-for="product in starproduct" :key="product.product_id">
            <el-card  style="margin-bottom:8%" @click="goToProductDetail(product)">
                <img :src="product.product_image" style="width:100%;height:300px"/>
                <template #footer>
                    <h3>{{ product.product_name }}</h3>
                    <div style="margin-top:3%">{{ product.introduction }}</div>
                </template>
            </el-card>
        </el-col>
  </el-row>
  <el-row :gutter="25" v-else-if="componentTab==='flash'">
        <el-col :span="8" v-for="flash in starflash" :key="flash.flash_id">
            <el-card  style="margin-bottom:8%" @click="goToFlashDetail(flash)">
                <img :src="flash.image" style="width:100%"/>
                <template #footer>
                    <h3>{{ flash.title }}</h3>
                    <div style="margin-top:3%">作者：{{ flash.meta }}</div>
                </template>
            </el-card>
        </el-col>
  </el-row>
  <div v-else>
    <Post view="share" />
    <Post view="recruit" />
    <Post view="lease" />
  </div>
</div>
</template>

<script>
import Post from '../components/Article.vue'

export default {
    components: {
        Post
    },
     computed: {
        starcamp() {
            return this.$store.state.camp.camps;
        },
        starproduct() {
            return this.$store.state.product.products;
        },
        starflash() {
            return this.$store.state.flash.flashes;
         }
    },
    data() {
        return {
            componentTab:'camp'  
        }
    },
    methods: {
        goToProductDetail (product) {
            const productId = product.product_id
            this.$router.push({ path: `/home/product/${productId}` })
        },
        goToCampDetail (camp) {
            this.$router.push({ path: `/home/campdetail/${camp.campground_id}` })
        },
        goToFlashDetail (flash) {
            const flashId = flash.flash_id
            this.$router.push({ path: `/home/flash/${flashId}` })
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