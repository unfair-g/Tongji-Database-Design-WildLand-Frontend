<template>
  <div class="bg">
    <HomeHead/>
    <div class="product-detail">
      <div class="product-img">
        <img :src="product.product_image" class="image" alt="product image">
      </div>
      <div class="product-info">
        <div class="right">
          <div class="product-mess">
           <h2>{{ product.product_name }}</h2>
           <p>{{ product.description }}</p>
           <div class="price">{{ product.price }}</div>
          </div>
          <el-tag class="love" style="color: 529A98" @click="toggleStarColor" >
            <span>
              <el-button type="text" class="button">收藏</el-button>
              <el-icon class="star" color="#ffed49" :size="30"><component class="is_solid" :is="isStarSolid ? 'Star' : 'StarFilled'"></component></el-icon>
            </span>
          </el-tag>
          <div class="pay">
            <el-button class="pay" @click="openDialog">立即租赁</el-button>
            <PayWindow v-model:dialogVisible="dialogVisible" :product="product" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import PayWindow from '@/components/PayWindow.vue'
import HomeHead from '@/components/HomeHead.vue'

export default {
  name: 'ProductDetail',
  components: {
    PayWindow,
    HomeHead
  },
  data () {
    return {
      isStarSolid: ref(true),
      product: {},
      dialogVisible: false
    }
  },
  created () {
    const productId = this.$route.params.id
    // 这里模拟获取商品详情，你可以从API获取
    const product = {
      product_id: productId,
      product_name: `商品${productId}`,
      product_image: require(`@/assets/product-${productId}.png`),
      description: '这是商品的详细描述。',
      price: `¥${productId * 100}`
    }
    this.product = product
  },
  methods: {
    toggleStarColor () {
      this.isStarSolid = !this.isStarSolid
      // 如果需要，你可以在这里添加额外的逻辑来改变图标的颜色
      // 但通常，我们会通过 CSS 来处理颜色的变化
    },
    openDialog() {
      console.log('Opening dialog');
      this.dialogVisible = true;
      console.log('Dialog Visible:', this.dialogVisible);
    }
  }
}
</script>

<style scoped>
.bg {
  height: 100vh;
  background: url('@/assets/bg.jpg') no-repeat;
  background-size:100% 100%;
}

.product-detail {
  display: flex;
  padding: 100px;
}

.product-img {
  flex: 1;
  padding: 10px;
  margin-right: 50px;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.product-info {
  flex: 2;
  padding: 10px;
  display: inline-block;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
}

.right {
  display: flex;
  position: relative;
  padding: 10px;
  min-height: 50px;
}

.product-mess {
  flex: 1;
}

.love {
  flex: 2;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: larger;
  padding: 20px;
  padding-left: 30px;
  background-color: #3085887d;
}

.button {
  font-size: larger;
  color: #0c0c0c;
}

.star {
  color: #ffed49;
  margin-left: 8px;
  font-size: 40px;
  width: 24px;
  height: 24px;
  vertical-align: middle;
}

.image {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.content {
  padding: 20px;
}

.price {
  color: #ff4949;
  font-size: 24px;
  margin-bottom: 10px;
}

.pay {
  position: absolute;
  background-size: 60px;
  background-color: #3085887d;
  right: 5px;
  bottom: -60px;
  font-size:x-large;
  color: #0c0c0c;
}
</style>
