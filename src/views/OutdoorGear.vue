<template>
  <div class="table-wrapper">
    <el-table :data="products" style="width: 100%">
      <el-table-column prop="product_name" label="名称" width="auto" align="center" />
      <el-table-column prop="price" label="价格" width="200" align="center">
        <template #default="scope">
          <!-- 确保“新增”这一行没有显示价格 -->
          <span v-if="!scope.row.isNewRow">¥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="stock_quantity" label="余量" width="200" align="center" />
      <el-table-column label="操作台" width="500" align="center">
        <template #default="scope">
          <el-button v-if="scope.row.isNewRow" type="primary" color="#1D5B5E" @click="handleUpload" class="add-button">
            新增
          </el-button>
          <template v-else>
          <el-button 
            type="primary" 
            @click="handleAction(scope.row, 'more')">
            <More />更多
          </el-button>
          <el-button 
            type="success" 
            @click="handleAction(scope.row, 'edit')">
            <Edit />编辑
          </el-button>
          <el-button 
            type="danger" 
            @click="handleAction(scope.row, 'delete')">
            <Delete />删除
          </el-button>
        </template>
      </template>
      </el-table-column>
    </el-table>
    <!-- 当 filteredProducts 为空时显示提示信息 -->
    <el-alert v-if="products.length === 1" title="当前无营地数据" type="info" center />
  </div>
</template>

<script>
import { More, Edit, Delete } from '@element-plus/icons-vue'
import axios from '@/axios';

export default {
  components: {
    More,
    Edit,
    Delete
  },
  data() {
    return {
      products:[],
      product_2:{
        product_id: 0,
          price: 0,
          stock_quantity: 0,
          size: '',
          material: '',
          suitable_users: 0,
          brand: '',
          introduction: '',
          product_name:'',
          product_tag:'',
      }
    }
  },
  created() {
    this.fetchProduct(); // 组件加载时获取所有产品
  },
  methods: {
    fetchProduct() {
      axios.get('/api/OutdoorProducts/adminList')
        .then(response => {
          this.products = response.data;
          // 添加一个特殊的“新增”行
        this.products.push({ isNewRow: true });
        })
        .catch(error => {
          console.log(this.products)
          console.error('Error fetching products:', error);
        });
    },
    handleAction(row, action) {
      if (action === 'more') {
        this.goToProductDetail(row);
      } else if (action === 'edit') {
        this.goToProductEdit(row);
      } else if (action === 'delete') {
        this.deleteProduct(row);
      }
    },
    goToProductDetail(product) {
      const productId = product.product_id;
      this.$router.push({ path: `/home/product/${productId}` });
    },
    goToProductEdit(product) {
      const productId = product.product_id;
      this.$router.push({ path: `/administrator/AdminProductEdit/${productId}` });
    },
    deleteProduct(product) {
      // 提交删除请求
      axios.delete(`/api/OutdoorProducts/${product.product_id}` )
        .then(response => {
          console.log('0k',response.data);
          this.$alert('删除成功！', '提示', {  
        confirmButtonText: '确定',  
        type: 'success',  
        callback: () => {  
          location.reload(); // 刷新页面  
        } 
      });
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          this.$alert('删除失败！', '错误', {  
        confirmButtonText: '确定',  
        type: 'error'  
      }); 
        });
    },
    handleUpload()
    {
      this.$router.push({ path: `/administrator/AdminProductAdd/${this.product_2.product_id}` ,
        query:{
          productid:0
        }
      });
    }
  }
}
</script>

<style scoped>
.table-wrapper {
  width: 85%;
  min-width: 1000px;
  margin: 0 auto;
  overflow-x: auto;
  display: flex; /* 使用flexbox使内容居中 */
  justify-content: center; /* 水平居中 */
}
.el-button {
  background-color: #1D5B5E;
  border-color: #1D5B5E;
  color: white;
}
.el-button:hover {
  background-color: #17494A;
  border-color: #17494A;
}

.custom-button {  
  position: absolute;  
  display: inline-block;  
  width: 60px; /* 按钮的宽度 */  
  height: 60px; /* 按钮的高度 */  
  border: none; /* 移除默认的边框 */  
  background-color: #1D5B5E; /* 背景色，以Element Plus的蓝色为例 */  
  color: white; /* 文字颜色（虽然这里没有文字，但可以作为参考） */  
  cursor: pointer; /* 鼠标悬停时的样式 */  
  /* 如果你想要圆形按钮 */  
  border-radius: 50%; 
  overflow: hidden; /* 确保加号不会溢出按钮 */  
  /* 可选：添加一些内边距，以便加号不完全贴边（如果需要的话） */  
  right: 10px;  
  bottom:20px;
  box-sizing: border-box; /* 让padding不影响总宽度和高度 */  
}  
  
.custom-button::before,  
.custom-button::after {  
  content: ''; /* 伪元素需要这个属性来生成内容 */  
  position: absolute;  
  top: 50%;  
  left: 50%;  
  transform: translate(-50%, -50%); /* 居中伪元素 */  
  background-color: white; /* 加号的颜色 */  
  width: 80%; /* 加号线的宽度 */  
  height: 2px; /* 实线加号的高度（对于水平线） */  
} 

.custom-button::after {  
  content: ''; /* 伪元素需要这个属性来生成内容（尽管这里的内容是空的） */  
  position: absolute;  
  top: 50%; /* 竖线在垂直方向上居中 */  
  left: 50%; /* 初始位置在按钮的左侧边缘的中间，但我们会通过transform来调整 */  
  transform: translateX(-50%,-50%); /* 将竖线向左移动其自身宽度的50%，以在按钮中居中 */  
  width: 2px; /* 竖线的宽度 */  
  height: 80%; /* 竖线的高度与按钮相同 */  
  background-color: white; /* 竖线的颜色 */  
} 

.add-button {
  display: block;
  margin: 0 auto; /* 居中按钮 */
  margin-bottom: 10px; /* 距离底部的间距 */
}
</style>
