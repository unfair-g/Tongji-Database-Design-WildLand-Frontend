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
        <el-form-item v-if="!this.isEdit">
          <el-button type="primary" @click="saveProduct">保存</el-button>
          <el-button @click="cancelEdit">取消</el-button>
        </el-form-item>

        <el-form-item label="标签分类" v-if="this.isEdit">  
        <el-select v-model="product.product_tag" placeholder="请选择标签分类">  
          <el-option  
            v-for="tag in tags"  
            :key="tag.value"  
            :label="tag.label"  
            :value="tag.value">  
          </el-option>  
        </el-select>  
      </el-form-item> 

        

        <el-form-item label="户外用品图片" v-if="this.isEdit">  
        <div>  
          <input type="file" @change="handleFileChange" />  
          <!--<el-button type="primary" @click="submitUpload" :disabled="!selectedFile">上传文件</el-button>-->
        </div>  
      </el-form-item> 
      <el-form-item v-if="this.isEdit">
          <el-button type="primary" @click="saveProduct_2">上传</el-button>
          <el-button @click="cancelEdit_2">取消</el-button>
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
        isEdit:false,
        tags: [ // 静态标签列表，实际应用中可能来自后端  
        { value: '烹饪类', label: '烹饪类' },  
        { value: '帐篷天幕类', label: '帐篷天幕类' },  
        { value: '工具类', label: '工具类' },  
        { value: '桌椅类', label: '桌椅类' },  
        { value: '娱乐类', label: '娱乐类' },  
        { value: '其他', label: '其他' }  
      ] ,
      product_name: '',
      selectedFile: null,  
      uploadUrl: 'https://localhost:7218/api/OutdoorProductPics/UploadOutdoorProductPic',
      productId:0,
      productid:1,
      };
    },
    methods: {
      saveProduct() {
        const productId = this.product.product_id; // 确保这个值已经被正确设置   
    const updatedProduct = {  
      ...this.product,  
    };  
    axios.put(`/api/OutdoorProducts/${productId}`, updatedProduct)  
      .then(response => {  
        // 更新成功后的处理，比如清空表单或显示成功消息  
        console.log('Product updated successfully', response);  
        console.log(this.product);
      })  
      .catch(error => {  
        // 处理错误，比如显示错误消息  
        console.error('Error updating product:', error);  
      });
      this.$alert('修改成功！', '提示', {  
        confirmButtonText: '确定',  
        type: 'success',  
        callback: () => {  
          location.reload(); // 刷新页面  
        } 
      });
        this.$router.push({ path: '/administrator/outdoorGear' }); // 保存后跳转回 OutdoorGear 页面
      },
      cancelEdit() {
        this.$router.push({ path: '/administrator/outdoorGear' }); // 取消编辑，跳转回 OutdoorGear 页面
      },
      saveProduct_2() {  
      // http://139.9.193.78:90/images/outdoor_product/4.png 
       // 构造要发送的数据  
       const productData = {  
        product_id: this.product.product_id, // 注意：如果 product_id 是由后端生成的，这里可能不需要或应该设置为 null/undefined  
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
      axios.post('/api/OutdoorProducts', productData, {  
        headers: {  
            'accept': 'text/plain' ,
          'Content-Type': 'application/json'  
        }  
      })  
      .then(response => {  
        console.log('Product saved successfully', response.data);  
        this.productId=response.data.product_id;
        this.submitUpload();
      })  
      .catch(error => {  
        console.log(this.product);
        console.error('Error saving product:', error);  
      }); 
    },  
    cancelEdit_2() {  
      // 取消编辑的逻辑，例如重置表单或关闭对话框  
      console.log('Cancel clicked');  
      this.$refs.productForm.resetFields(); // 重置表单 
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
    handleFileChange(event) {  
      this.selectedFile = event.target.files[0];  
    },  
    submitUpload() {  
  if (!this.selectedFile) {  
    this.$message.error('请先选择文件！');  
    return;  
  }  
  
  const formData = new FormData();  
  formData.append('file', this.selectedFile);  
  
  // 构造带有 query 参数的 URL  
  const uploadUrlWithProductId = `${this.uploadUrl}?productId=${this.productId}`;  
  
  // 使用axios或其他HTTP客户端发送请求  
  axios.post(uploadUrlWithProductId, formData, {  
    headers: {  
      'Content-Type': 'multipart/form-data'  
    }  
  })  
  .then(response => {  
    console.log(response.data);  
    // 处理成功响应  
    this.$message.success('文件上传成功！');  
    this.$router.push({ path: `/administrator/OutdoorGear` });  
  })  
  .catch(error => {  
    // 处理错误  
    this.$message.error('文件上传失败！', error);  
  });  
}
    },
    created() {
      this.productid=this.$route.query.productid;
      if(this.productid==0)
        this.isEdit=true;
      if(this.isEdit)
          this.generateProductId();
    },
    
    beforeRouteEnter(to, from, next) {
      const productId = to.params.productId;
      // 在 next 中使用 Vuex Store
      next(vm => {
        axios.get(`/api/OutdoorProducts/${productId}`)
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
  