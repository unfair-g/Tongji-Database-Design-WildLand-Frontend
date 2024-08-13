<template>
    <div class="edit-wrapper">
      <el-form :model="product" label-width="120px">
        <el-form-item label="商品名称">
          <el-input v-model="product.product_name" />
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model.number="product.price" />
        </el-form-item>
        <el-form-item label="余量">
          <el-input v-model.number="product.stock_quantity" />
        </el-form-item>
        <el-form-item label="尺寸">
          <el-input v-model="product.size" />
        </el-form-item>
        <el-form-item label="材质">
          <el-input v-model="product.material" />
        </el-form-item>
        <el-form-item label="适用人数">
          <el-input v-model.number="product.suitable_users" />
        </el-form-item>
        <el-form-item label="品牌">
          <el-input v-model="product.brand" />
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="product.introduction" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveProduct">保存</el-button>
          <el-button @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
 import axios from 'axios';

  export default {
    data() {
      return {
        product: {
          product_id: '',
          product_name: '',
          price: 0,
          stock_quantity: 0,
          size: '',
          material: '',
          suitable_users: 0,
          brand: '',
          introduction: ''
        }
      };
    },
    methods: {
      saveProduct() {
        const productId = this.product.product_id; // 确保这个值已经被正确设置   
    const updatedProduct = {  
      ...this.product,  
      // 如果 product_tag 是必需的但你不想改变它，你可以这样设置  
      // product_tag: this.product.product_tag || '',  
      // 如果 product_image 需要处理，你可能需要将其添加到 FormData 对象中  
      // 但在这个例子中，我们假设它不包含文件上传  
    };  
  
    // 删除不需要发送到服务器的属性（例如，如果后端不需要 product_id）  
    // delete updatedProduct.product_id; // 根据你的 API 要求来决定是否保留这个字段  
  
    // 发送 PUT 请求  
    axios.put(`https://localhost:7218/api/OutdoorProducts/${productId}`, updatedProduct)  
      .then(response => {  
        // 更新成功后的处理，比如清空表单或显示成功消息  
        console.log('Product updated successfully', response);  
        console.log(this.product);
      })  
      .catch(error => {  
        // 处理错误，比如显示错误消息  
        console.error('Error updating product:', error);  
      });

        this.$router.push({ path: '/administrator/outdoorGear' }); // 保存后跳转回 OutdoorGear 页面
      },
      cancelEdit() {
        this.$router.push({ path: '/administrator/outdoorGear' }); // 取消编辑，跳转回 OutdoorGear 页面
      }
    },
    beforeRouteEnter(to, from, next) {
      const productId = to.params.productId;
      // 在 next 中使用 Vuex Store
      next(vm => {
        axios.get(`https://localhost:7218/api/OutdoorProducts/${productId}`)
        .then(response => {
          vm.product = response.data;
        })
        .catch(error => {
          console.error('Error fetching products:', error);
        });
      });
    }
  }
  </script>
  
  <style scoped>
  .edit-wrapper {
    width: 80%;
    margin: 0 auto;
  }
  </style>
  