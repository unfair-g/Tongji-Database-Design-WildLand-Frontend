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
    };  
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
  