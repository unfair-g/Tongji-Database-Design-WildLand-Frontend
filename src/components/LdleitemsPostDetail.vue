<template>
  <el-card class="post-container" v-if="ldleitemsPost">
    <div v-if="ldleitemsPost">
      <div class="post-header">
        <img :src="ldleitemsPost[0].portrait" alt="avatar" class="avatar" @click="goToUserSpace(ldleitemsPost[0].author_id)">
        <div class="post-header-info">
          <span class="username">{{ ldleitemsPost[0].author_name }}</span>
        </div>
        <el-button @click="goBackToForumView" class="close-button">
          <el-icon><Close /></el-icon>
        </el-button>
      </div>

      <div style="display:flex;">
        <div style="flex:1;">
          <div class="post-details" style="display:flex;">
            <div class="details-text" style="flex:1;">
            <span class="time">发布时间：{{ ldleitemsPost[0].post_time }}</span>
            <h1 class="item-name">{{ ldleitemsPost.title }}</h1>
            <span class="item-summary">商品简介: {{ ldleitemsPost.item_summary }}</span>
            <span class="item-condition">商品新旧程度：{{ ldleitemsPost.condition }}</span>
            <span class="item-price">￥{{ ldleitemsPost.price }}</span>
          </div>
      </div>

      <div style="padding-top:20px;margin-bottom:20px;"><el-icon><Location/></el-icon>{{ldleitemsPost[0]. post_position }}</div>
        <div class="post-content">
          <el-dialog
          v-model="dialogVisible"
          width="80%"
          :show-close="true"
          >
          </el-dialog>
          <el-dialog
          v-model="deleteDialogVisible"
          title="确认删除"
          width="30%"
        >
          <span>{{ deleteMessage }}</span>
          <template v-slot:footer>
            <el-button @click="cancelDelete">否</el-button>
            <el-button type="primary" @click="confirmDelete">是</el-button>
          </template>
        </el-dialog>
      </div>
    </div>
    
      <div>
        <div class="post-visible-states"  v-if="this.userid===ldleitemsPost[0].author_id">
          <el-select
            v-model="value"
            placeholder="修改帖子可见状态"
            size="small"
            class="visibility-select"
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
          <el-carousel-item v-for="(image, index) in ldleitemsPost[0].post_pics" :key="index">
            <img :src="image" class="carousel-image">
          </el-carousel-item>
        </el-carousel>
        </div>
      </div>
      </div>

 

      <div class="post-stats">
        <el-button class="stat-item" @click="toggleLike(ldleitemsPost)">
          <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !ldleitemsPost[0].isLiked, 'icon-dianzanxuanzhong': ldleitemsPost[0].isLiked}"></i>
          <span>点赞</span>
          <span>{{ ldleitemsPost[0].likes_number }}</span>
        </el-button>
        <el-button class="stat-item" @click="toggleStar(ldleitemsPost)">
          <el-icon v-if="!ldleitemsPost[0].isStarred"><Star /></el-icon>
          <el-icon v-else><StarFilled /></el-icon>
          收藏
        </el-button>
        <el-button class="stat-item" @click="goToReportPostWindow">
          <el-icon><Bell/></el-icon>举报
        </el-button>
      </div>


      <div class="dashed-line"></div>

      <!-- 新增的表单区域 -->
      <div class="recipient-form" v-if="isButtonDisabled">
        <el-form :model="recipientInfo">
          <el-form-item label="收件人姓名">
            <el-input v-model="recipientInfo.name" placeholder="请输入收件人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收件人地址">
            <el-input v-model="recipientInfo.address" placeholder="请输入收件地址"></el-input>
          </el-form-item>
          <el-form-item label="收件人电话">
            <el-input v-model="recipientInfo.phone" placeholder="请输入收件人电话"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- 新增的表单区域 -->
      <div class="recipient-form" v-else>
        <el-form >
          <el-form-item label="收件人姓名">
            <el-input :value="this.rent[0].recipient_name" readonly></el-input>
          </el-form-item>
          <el-form-item label="收件人地址">
            <el-input :value="this.rent[0].recipient_address" readonly></el-input>
          </el-form-item>
          <el-form-item label="收件人电话">
            <el-input :value="this.rent[0].recipient_phone" readonly></el-input>
          </el-form-item>
        </el-form>
      </div>
      
      <div class="action-buttons">
        <el-button class="pay" id="rentButton" :disabled="!isButtonDisabled" @click="Rent_Success()" v-if="isButtonDisabled">立即租赁</el-button>
        <PostPayWindow v-model:RentdialogVisible="RentdialogVisible" :ldleitemsPost="ldleitemsPost" :recipientInfo="recipientInfo" />
      </div>

    </div>
    <div v-else>加载中......</div>
  </el-card>

  <ReportPost
          v-model:isReportDialogVisible="isReportPostWindowVisible"
          :isDetailShow="false"
          :thisPostId="this.postID"
          :post="post"
          @closeDialog="isReportPostWindowVisible=false"
        />  
        <!-- 用于举报帖子 -->

</template>

<script>
import axios from 'axios';
import PostPayWindow from '@/components/PostPayWindow.vue'
import ReportPost from '@/components/ReportPostWindow.vue'
import  globalState  from '../store/global'; // 引入 global.js 中的状态

export default {
  name: 'ldleitemsPost', 
  props: ['ldleitemsPostID'],
  components: {
    PostPayWindow,
    ReportPost
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
        { label: '仅自己可见', value: '仅自己可见' },
        { label: '所有人可见', value: '所有人可见' }
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
      isButtonDisabled: true, // 控制按钮的禁用状态  
      userid:globalState.userId,
      isReportPostWindowVisible:false,//举报弹窗显示
    };
  },
  created() {
    this.fetchLdleitemsPosts();
    this.BanRent();
  },
  methods: {
      async fetchLdleitemsPosts() {
      //const userId = state.userId; // 确保 state.userId 是可访问的  
  try {  
    const overviewResponse = await axios.get(`https://localhost:7218/api/Posts/${this.ldleitemsPostID}`); 
    console.log(overviewResponse)
      // 你可以在这里对filteredPosts进行进一步处理  
     const post=overviewResponse.data;
     console.log(post)
      // 第一步：获取 author_id  
      const authorResponse = await axios.get(`https://localhost:7218/api/Posts/${post.post_id}`);  
      const authorId = authorResponse.data.author_id; // 假设这是从响应中获取的 author_id  
  
      const LdleResponse = await axios.get(`https://localhost:7218/api/LdleitemsPosts/${post.post_id}`);  
      const item_summary = LdleResponse.data.item_summary; 
      const condition = LdleResponse.data.condition; 
      const price = LdleResponse.data.price; 

      const post_2=await axios.get(`https://localhost:7218/api/LdleitemsPosts/GetPostsByUserAndKind?user_id=${authorId}`);
      const post_mess=post_2.data.filter(post_2 => post_2.post_id ===post.post_id);
  
      // 返回一个新的对象，包含原始数据和额外数据  
      this.ldleitemsPost= {  
        ...post, // 展开原始帖子对象  
        ... post_mess,
        author_id: authorId, // 添加 author_id  

        item_summary:item_summary,
        condition:condition,
        price:price,

      };  
    // 由于 map 返回的是 Promise 数组，我们需要等待所有 Promise 解决  
    console.log(this.ldleitemsPost); // 输出筛选后的数据  
  
  } catch (error) {  
    console.error('Error fetching overview posts:', error);  
    // 在这里，你可能想设置 this.ldleitemsposts 为空数组或错误消息数组  
    this.ldleitemsPost = []; // 或 [{ error: 'Failed to fetch posts' }]  
  }
    },
    toggleLike(ldleitemsPost) {
      ldleitemsPost.isLiked = !ldleitemsPost.isLiked;
      ldleitemsPost.likes = ldleitemsPost.isLiked ? ldleitemsPost.likes + 1 : ldleitemsPost.likes - 1;
      const likePost = {
        post_id: this.ldleitemsPost.post_id,
        user_id: globalState.userId // 确保在 Vuex store 中有 user.id
      };
      console.log('点赞上传:', likePost.post_id);
      console.log('点赞上传:', likePost.user_id);
      axios.post('https://localhost:7218/api/LikePosts', likePost,{headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
      }
    })
        .then(response => {
          console.log('点赞成功:', response.data);
        })
        .catch(error => {
          console.error('点赞出错:', error);
        });
    },
    toggleStar(ldleitemsPost) {
      ldleitemsPost.isStarred = !ldleitemsPost.isStarred;
      const starPost = {
        post_id: this.ldleitemsPost.post_id,
        time:new Date().toISOString(), // 生成订单日期
        tips:"闲置折叠椅",
        user_id: globalState.userId // 确保在 Vuex store 中有 user.id
      };
      console.log('点赞上传:', starPost.post_id);
      console.log('点赞上传:', starPost.user_id);
      axios.post('https://localhost:7218/api/StarPosts', starPost,{headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/plain'
      }
    })
        .then(response => {
          console.log('点赞成功:', response.data);
        })
        .catch(error => {
          console.error('点赞出错:', error);
        });
    },
    goBackToForumView() {
      this.$router.push({ path: `/home/forum` });
    },
    openDeleteDialog(type, item = null, parentComment = null) {
      this.deleteType = type;
      if (type === 'reply') {
        this.deleteReply = item;
        this.parentComment = parentComment;
      } else {
        this.deleteComment = item;
      }
      this.deleteMessage = type === 'post' ? '您是否确认删除这条帖子？' : (type === 'comment' ? '您是否确认删除这条评论？' : '您是否确认删除这条回复？');
      this.deleteDialogVisible = true;
    },
    confirmDelete() {
      if (this.deleteType === 'post') {
        // 这里处理帖子删除操作
      } else if (this.deleteType === 'comment' && this.deleteComment) {
        const index = this.ldleitemsPost.comments_details.indexOf(this.deleteComment);
        if (index !== -1) {
          this.ldleitemsPost.comments_details.splice(index, 1);
        }
      } else if (this.deleteType === 'reply' && this.deleteReply && this.parentComment) {
        const index = this.parentComment.replies.indexOf(this.deleteReply);
        if (index !== -1) {
          this.parentComment.replies.splice(index, 1);
        }
      }
      this.deleteDialogVisible = false;
    },
    cancelDelete() {
      this.deleteDialogVisible = false;
    },
    Rent_Success(){
      this.RentdialogVisible= true;
    },
    async BanRent()
    {
      try {  
    const response = await axios.get(`https://localhost:7218/api/Purchases`);  
    if (!Array.isArray(response.data)) {  
      throw new Error('Expected an array from the server, but got something else.');  
    }  
    console.log(response.data)
    console.log(this.ldleitemsPostID)
    //console.log(response.data.filter(order => order.post_id === this.ldleitemsPostID))
    this.rent = response.data.filter(order => order.post_id === Number(this.ldleitemsPostID));  
    this.isButtonDisabled = this.rent.length === 0;  
  
    console.log('oooooo', this.rent);  
    console.log('kkkkkk', this.isButtonDisabled);  
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
      if(value=='仅自己可见')
          this.ldleitemsPost[0].exhibit_status = 0;
      else
          this.ldleitemsPost[0].exhibit_status = 1;

      const LdlePost={
        author_id: this.ldleitemsPost[0].author_id,
        censor_status:this.ldleitemsPost[0].censor_status,
        content:this.ldleitemsPost[0].content,
        exhibit_status:this.ldleitemsPost[0].exhibit_status,
        likes_number:this.ldleitemsPost[0].likes_number,
        stars_number:this.ldleitemsPost[0].stars_number,
        post_id:this.ldleitemsPost[0].post_id,
        post_kind:this.ldleitemsPost[0].post_kind,
        post_position:this.ldleitemsPost[0].post_position,
        post_time:this.ldleitemsPost[0].post_time,
        title:this.ldleitemsPost[0].title,
        total_floor:this.ldleitemsPost[0].total_floor,

      }
      axios.put(`https://localhost:7218/api/Posts/${this.ldleitemsPost[0].post_id}`,LdlePost).then(response => {  
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
  }
};
</script>

<style scoped>
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
