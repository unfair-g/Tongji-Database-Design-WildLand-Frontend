<template>
  <el-card class="post-container" v-if="ldleitemsPost">
    <div v-if="ldleitemsPost">
      <div class="watermark" v-if="ldleitemsPost.orderId>0"></div>

      <div class="post-header">
        <img :src="ldleitemsPost.portrait" alt="avatar" class="avatar" @click="goToUserSpace(ldleitemsPost.author_id)">
        <div class="post-header-info">
          <span class="username">{{ ldleitemsPost.user_name }}</span>
        </div>
        <el-button @click="goBackToForumView" class="close-button">
          <el-icon><Close /></el-icon>
        </el-button>
      </div>

      <div style="display:flex;">
        <div style="flex:1;">
          <div class="post-details" style="display:flex;">
            <div class="details-text" style="flex:1;">
            <span class="time">发布时间：{{ ldleitemsPost.post_time }}</span>
            <h1 class="item-name">{{ ldleitemsPost.title }}</h1>
            <span class="item-summary">商品简介: {{ ldleitemsPost.item_summary }}</span>
            <span class="item-condition">商品新旧程度：{{ ldleitemsPost.condition }}</span>
            <span class="item-price">￥{{ ldleitemsPost.price }}</span>
          </div>
      </div>

      <div style="padding-top:20px;margin-bottom:20px;">
        <el-icon><Location/></el-icon>{{ldleitemsPost. post_position }}
        <span v-if="this.userid===ldleitemsPost.author_id" class="delete-button" @click="openDeleteDialog">删除</span>
      </div>
      <el-dialog
          v-model="deleteDialogVisible"
          title="确认删除"
          width="30%"
        >
          <span>{{'您是否确认删除这条帖子'}}</span>
          <template v-slot:footer>
            <el-button @click="cancelDelete">否</el-button>
            <el-button type="primary" @click="confirmDelete">是</el-button>
          </template>
        </el-dialog>
    </div>
    
      <div>
        <div class="post-visible-states"  v-if="this.userid===ldleitemsPost.author_id">
          <el-select
            v-model="ldleitemsPost.exhibit_status"
            placeholder="修改帖子可见状态"
            size="small"
            class="visibility-select"
            :disabled="ldleitemsPost.orderId>0"
            @change="handleChange"  
          >
            <el-option
              v-for="option in options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
            </el-select>
        </div>
        <div class="post-visible-states"  v-else>
          <div

            class="visibility-select-2"
          >
        </div>
        </div>
        <div class="image-gallery">
          <el-carousel indicator-position="outside">
          <el-carousel-item v-for="(image, index) in ldleitemsPost.post_pics" :key="index">
            <img :src="image" class="carousel-image">
          </el-carousel-item>
        </el-carousel>
        </div>
      </div>
      </div>

 

      <div class="post-stats">
        <el-button class="stat-item" @click="toggleLike(ldleitemsPost)">
          <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !ldleitemsPost.isLiked, 'icon-dianzanxuanzhong': ldleitemsPost.isLiked}"></i>
          <span>点赞</span>
          <span>{{ ldleitemsPost.likes_number }}</span>
        </el-button>
        <el-button class="stat-item" @click="toggleStar(ldleitemsPost)">
          <el-icon v-if="!ldleitemsPost.isStarred"><Star /></el-icon>
          <el-icon v-else><StarFilled /></el-icon>
          收藏
        </el-button>
        <el-button class="stat-item" @click="goToReportPostWindow">
          <el-icon><Bell/></el-icon>举报
        </el-button>
      </div>


      <div class="dashed-line"></div>

      <!-- 新增的表单区域 -->
      <div class="recipient-form" v-if="userid!==ldleitemsPost.author_id">
        <el-form :model="recipientInfo" :rules="rules" ref="recipientForm">
          <el-form-item label="收件人姓名" prop="name">
            <el-input v-model="recipientInfo.name" placeholder="请输入收件人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收件人地址" prop="address">
            <el-input v-model="recipientInfo.address" placeholder="请输入收件地址"></el-input>
          </el-form-item>
          <el-form-item label="收件人电话" prop="phone">
            <el-input v-model="recipientInfo.phone" placeholder="请输入收件人电话"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="action-buttons" v-if="userid!==ldleitemsPost.author_id">
        <el-button class="pay" id="rentButton" :disabled="!isButtonDisabled" @click="Rent_Success()" v-if="isButtonDisabled">立即租赁</el-button>
        <PostPayWindow v-model:RentdialogVisible="RentdialogVisible" :ldleitemsPost="ldleitemsPost" :recipientInfo="recipientInfo" />
      </div>
      <div class="action-buttons"  v-else>
        <el-button class="pay" @click="GoToOrder(ldleitemsPost)" v-if="ldleitemsPost.orderId>0">查看订单</el-button>
      </div>

      <ReportWindow
          v-model:isReportDialogVisible="isReportPostWindowVisible"
          :reportID="Number(ldleitemsPost.post_id)"
          :isReportPost="true"
          
        /> 
    </div>
  </el-card> 
        <!-- 用于举报帖子 -->

</template>

<script>
import axios from '@/axios';
import PostPayWindow from '@/components/PostPayWindow.vue'
import ReportWindow from '@/components/ReportPostWindow.vue'
import  globalState  from '@/store/global'; // 引入 global.js 中的状态
import { ElMessage } from "element-plus";

export default {
  name: 'ldleitemsPost', 
  props: ['ldleitemsPostID'],
  components: {
    PostPayWindow,
    ReportWindow
  },
  data() {
    return {
      dialogVisible: false,
      deleteDialogVisible: false,
      currentImage: '',
      currentIndex: 0,
      isStarSolid: true,
      value: '',
      comment: '',
      deleteMessage: '',
      deleteType: '',
      deleteComment: null,
      deleteReply: null,
      parentComment: null,
      options: [
        { label: '仅自己可见', value: 0 },
        { label: '所有人可见', value: 1 }
      ],
      RentSuccess:false,
      recipientInfo: {
        name: '',
        address: '',
        phone:null
      },
      RentdialogVisible: false,
      ldleitemsPost: null,
      isLike:false,
      liStar:false,
      location:'',
      rent:[], 
      userid:globalState.userId,
      isReportPostWindowVisible:false,//举报弹窗显示
      rules: {
      name: [
        { required: true, message: '请输入收件人姓名', trigger: 'blur' }
      ],
      address: [
        { required: true, message: '请输入收件地址', trigger: 'blur' }
      ],
      phone: [
        { required: true, message: '请输入收件人电话', trigger: 'blur' },
        { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入有效的电话号', trigger: 'blur' }
      ]
    }
    };
  },
  created() {
    this.fetchLdleitemsPosts();
    this.BanRent();
  },
  methods: {
      fetchLdleitemsPosts() {
        axios.get(`/api/LdleitemsPosts/GetPostDetailsById?post_id=${this.ldleitemsPostID}`)
        .then(response => {
          this.ldleitemsPost = response.data;
          console.log(this.ldleitemsPost)
        })
        .catch(error => {
          console.log(this.ldleitemsPost)
          console.error('Error fetching products:', error);
        });
    },
    handleError(error, message) {
      if (error.response) {
        console.error(`${message}:`, error.response.data);
        ElMessage.error(`${message} - 错误代码: ${error.response.status}`);
      } else if (error.request) {
        console.error(`${message}: No response received`);
        ElMessage.error(`${message} - 没有收到响应`);
      } else {
        console.error(`${message}:`, error.message);
        ElMessage.error(`${message} - 错误信息: ${error.message}`);
      }
    },
    toggleLike(post) {
      post.isLiked = !post.isLiked;
      post.likes_number = post.isLiked ? post.likes_number + 1 : post.likes_number - 1;
      axios.post('/api/LikePosts/postlike', {
        post_id: post.post_id,
        user_id: globalState.userId
      })
      .then(response => {
        response.data.isLiked=post.isLiked;
        response.data.likesCount=post.likes_number;
      })
      .catch(error => {
        console.error('Error toggling like:', error);
        this.handleError(error, '点赞操作失败');
      });
    },
    toggleStar(post) {
      post.isStarred = !post.isStarred;
      axios.post('/api/StarPosts/starpost', {
        post_id: post.post_id,
        tips:"收藏测试",
        user_id: globalState.userId
      })
      .then(response => {
        response.data.isStarred = post.isStarred;
        if (post.isStarred === true) {
          response.data.stars_number+=1;
        }
        else if (post.isStarred === false) {
          response.data.stars_number-=1;
        }
      })
      .catch(error => {
        console.error('Error toggling star:', error);
        this.handleError(error, '收藏操作失败');
      });
    },
    goBackToForumView() {
      this.$router.push({ path: `/home/forum` });
    },
    openDeleteDialog() {
      this.deleteDialogVisible = true;
    },
    confirmDelete() {
      this.deleteDialogVisible = false;
      axios.delete(`api/Posts/${this.ldleitemsPostID}`)
        .then(response => {
          if (response.data !=null) {
            this.goBackToForumView();          
          }
      })
      .catch(error => {
        this.handleError(error, '删除帖子失败');
        console.error(error)
      }) 
    },
    cancelDelete() {
      this.deleteDialogVisible = false;
    },
    Rent_Success(){
      this.$refs.recipientForm.validate((valid) => {
    if (valid) {
      this.RentdialogVisible = true;
    } else {
      console.log('表单验证失败');
      return false;
    }
  });
    },
    async BanRent()
    {
      try {  
    const response = await axios.get(`/api/Purchases`);  
    if (!Array.isArray(response.data)) {  
      throw new Error('Expected an array from the server, but got something else.');  
    }  
    this.rent = response.data.filter(order => order.post_id === Number(this.ldleitemsPostID));  
    this.isButtonDisabled = this.rent.length === 0;  
  } catch (error) {  
    console.error('Failed to fetch rental data:', error);  
    // 可以在这里添加额外的错误处理逻辑，比如设置 isButtonDisabled 为 true  
    this.isButtonDisabled = true;  
  } 
    },
    goToReportPostWindow() {
      this.isReportPostWindowVisible = true;
      console.log('Dialog Visible:', this.isReportSharePostWindowVisible);
    },
    goToUserSpace(author_id) {
      if (author_id == globalState.userId) {
        this.$router.push({
          path: `/home/userspace`
        })
      }
      else {
        this.$router.push({
          path: `/home/userspace/${author_id}`
        })
      }
    },
    handleChange(value) {  
      // 这里是用户更改选择时执行的代码 
      if(value==0)
          this.ldleitemsPost.exhibit_status = 0;
      else
          this.ldleitemsPost.exhibit_status = 1;

      const LdlePost={
        author_id: this.ldleitemsPost.author_id,
        censor_status:this.ldleitemsPost.censor_status,
        content:this.ldleitemsPost.content,
        exhibit_status:this.ldleitemsPost.exhibit_status,
        likes_number:this.ldleitemsPost.likes_number,
        stars_number:this.ldleitemsPost.stars_number,
        post_id:this.ldleitemsPost.post_id,
        post_kind:this.ldleitemsPost.post_kind,
        post_position:this.ldleitemsPost.post_position,
        post_time:this.ldleitemsPost.post_time,
        title:this.ldleitemsPost.title,
        total_floor:this.ldleitemsPost.total_floor,

      }
      axios.put(`/api/Posts/${this.ldleitemsPost.post_id}`,LdlePost).then(response => {  
        // 更新成功后的处理，比如清空表单或显示成功消息  
        console.log('Product updated successfully', response);  
        console.log(LdlePost);
      })  
      .catch(error => {  
        // 处理错误，比如显示错误消息  
        console.error('Error updating product:', error);  
      });
      console.log('选中的值为:', value);  
      // 例如，你可能想根据这个值更新数据库中的帖子状态  
      // 你可以调用一个API或者更新你的应用状态  api/Posts/GetPostDetail/{post_id}/{user_id}
    },
    GoToOrder(ldleitemsPost)
    {
      this.$router.push({ path: `/home/userspace/leaseorder/${ldleitemsPost.orderId}`,
          query: {  
            ldleitemsPostId: ldleitemsPost.orderId
        }})
    }
  }
};
</script>

<style scoped>
.watermark {
  position: fixed; /* 固定位置 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* 确保水印不会阻挡页面上的其他交互 */
  z-index: 1000; /* 确保水印在所有内容之上 */
  display: flex;
  align-items: center;
  justify-content: center;
}

.watermark::before {
  content: '已卖出'; /* 水印的文字内容 */
  font-size: 4rem; /* 根据需要调整文字大小 */
  color: rgba(4, 109, 56, 0.231); /* 文字颜色和透明度 */
  white-space: nowrap; /* 确保文字不换行 */
  text-align: center; /* 文本居中对齐 */
  transform: rotate(-30deg); /* 斜着显示水印 */
  position: absolute; /* 绝对定位 */
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-30deg); /* 定位中心，并旋转 */
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; /* 确保水印不会阻挡页面上的其他交互 */
  overflow: hidden;
}

.post-container {
  width: 65%;
  margin-top: 3vh;
  margin-left: 17vw;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border: 3px solid #1D5B5E;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
}

.post-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.delete-button {
  color: red;
  cursor: pointer;
  margin-left: 15px; /* 调整位置 */
}

.delete-button:hover {
  text-decoration: underline;
}

.avatar {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.post-header-info {
  display: flex;
  align-items: center;
  flex: 1;
}

.username {
  font-weight: bold;
  margin-right: 20px;
}

.close-button {
  width: 20px;
  margin-right:-30px;
  margin-top:-60px;
}

.post-details {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position:relative;
}

.details-text {
  display: flex;
  flex-direction: column;
  padding-right: 20px; 
  flex:1;
  font-weight:bold;
  font-size:larger;
}

.item-image {
  width: 250px;
  height: auto;
  border-radius: 8px;
  object-fit: cover;
  position:absolute;
  right:30px;
  top:-35px;
}

.time {
  color: darkgrey;
}

.item-name {
  margin: 10px 0;
  font-size: 24px;
  font-weight: bold;
}

.item-summary,
.item-condition {
  font-size: 14px;
  margin-top: 5px;
}

.item-price{
  color:red;
  font-weight:bold;
  font-size:larger;
}

.post-visible-states {
  display: flex;
  justify-content: flex-end;
  margin-top: -45px;
  margin-right:30px;
}

.visibility-select {
  width: 320px;
}

.visibility-select-2 {
  width: 320px;
  color:#fff;
}

.post-stats {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%; /* 调整宽度以适应新的间隔 */
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  cursor: pointer;
  background-color: #fff !important;
  color: #1D5B5E !important;
  border-color: #1D5B5E !important;
}

.image-gallery {
  margin-top:20px;
  border: 1px solid #1D5B5E;
  width:100%;
  height:240px;
  
  align-items: center;
  align-content: center;
  overflow: hidden;
}

.carousel-image {
  max-width: 100%; /* 调整宽度适应容器 */
  max-height: 100%; /* 调整高度适应容器 */
  object-fit: contain;
  display: block;
  margin: auto; /* 居中对齐图片 */
}

.dashed-line {
  border-top: 2px dashed #1D5B5E;
  margin: 30px 0; /* 上下增加一些间距 */
}

/* 新增的表单区域样式 */
.recipient-form {
  margin-top: 20px;
}

.action-buttons {
  display: flex;
  margin-top: 20px; /* 增加与上面按钮的间距 */
  justify-content: flex-start;
  justify-content: center;
}

.pay {
  font-size: 28px;
  cursor: pointer;
  background-color: #1D5B5E !important;
  color: #fff !important;
  border-color: #fff !important;
}

.el-button:active {
  background-color: #1e4040 !important;
  color: #fff !important;
  border-color: #1e4040 !important;
}

.comments-section {
  margin-top: 20px;
}


</style>
