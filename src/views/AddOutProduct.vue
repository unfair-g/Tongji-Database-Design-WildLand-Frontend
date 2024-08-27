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
        <el-form-item label="标签分类">  
        <el-select v-model="product.product_tag" placeholder="请选择标签分类">  
          <el-option  
            v-for="tag in tags"  
            :key="tag.value"  
            :label="tag.label"  
            :value="tag.value">  
          </el-option>  
        </el-select>  
      </el-form-item> 

        <!--<el-form-item label="户外用品图片">
          <el-input v-model="this.product_image" />
        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="saveProduct">保存</el-button>
          <el-button @click="cancelEdit">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
 import axios from '@/axios';

  export default {
    data() {
      return {
        product: {
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
        },
        tags: [ // 静态标签列表，实际应用中可能来自后端  
        { value: '烹饪类', label: '烹饪类' },  
        { value: '帐篷天幕类', label: '帐篷天幕类' },  
        { value: '工具类', label: '工具类' },  
        { value: '桌椅类', label: '桌椅类' },  
        { value: '娱乐类', label: '娱乐类' },  
        { value: '其他', label: '其他' }  
      ] ,
      product_name: '',
      };
    },
    methods: {
        saveProduct() {  
      // http://139.9.193.78:90/images/outdoor_product/4.png 
       // 构造要发送的数据  
       const productData = {  
        product_id: this.generateProductId(), // 注意：如果 product_id 是由后端生成的，这里可能不需要或应该设置为 null/undefined  
        product_name: this.product.product_name,  
        product_tag: this.product.product_tag,  
        size: this.product.size,  
        material: this.product.material,  
        price: this.product.price,  
        suitable_users: this.product.suitable_users,  
        brand: this.product.brand,  
        stock_quantity: this.product.stock_quantity,  
        //product_image: this.product.product_image, // 假设这是图片的URL或Base64编码的字符串  
        introduction: this.product.introduction  
      };  
  
      // 发送 POST 请求到 /api/OutdoorProducts  
      axios.post('/api/OutdoorProducts', productData, {  
        headers: {  
            'accept': 'text/plain' ,
          'Content-Type': 'application/json'  
        }  
      })  
      .then(response => {  
        // 处理成功响应  
        console.log('Product saved successfully', response.data);  
        // 可以在这里添加额外的逻辑，比如重置表单或显示成功消息  
        this.$router.push({ path: `/administrator/OutdoorGear` });

      })  
      .catch(error => {  
        // 处理错误  
        console.log(this.product);
        console.error('Error saving product:', error);  
        // 可以在这里添加错误处理逻辑，比如显示错误消息  
      }); 
    },  
    cancelEdit() {  
      // 取消编辑的逻辑，例如重置表单或关闭对话框  
      console.log('Cancel clicked');  
      this.$router.push({ path: `/administrator/OutdoorGear` });
      //this.$refs.yourFormRef.resetFields(); // 如果你需要重置表单  
    },
    generateProductId() {  
      // 生成一个随机的 product_id  
      // 这里使用简单的随机字符串生成作为示例，但请注意它可能不是唯一的  
      this.product.product_id = Math.floor(Math.random() * 100000);  
      return this.product.product_id;
      // 如果你需要整数，并且不担心溢出，你可以使用：  
      // this.product.product_id = Math.floor(Math.random() * 1000000000); // 生成一个9位数的随机数  
    },
    },
    created() {
        this.generateProductId()
    }
  }
  </script>
  
  <style scoped>
  .edit-wrapper {
    width: 80%;
    margin: 0 auto;
  }
  </style>
  