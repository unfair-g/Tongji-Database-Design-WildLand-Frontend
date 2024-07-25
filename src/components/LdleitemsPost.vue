<template>
    <div class="product-detail" v-if="ldleitemspost">
      <!-- User Info and Post Stats -->
      <div>
        <img :src="ldleitemspost.avatar" class="avatar" alt="ldleitemspost image">
        <div class="post-details">
          <div class="post-info">
            <span class="username">{{ ldleitemspost.username }}</span>
            <span class="time">{{ ldleitemspost.time }}</span>
          </div>
          <div class="post-stats">
            <span class="stat-item"><el-icon><View /></el-icon>{{ ldleitemspost.views }}</span>
            <span class="stat-item" @click="toggleLike">
              <i :class="{'iconfont': true, 'like-icon': true, 'icon-dianzan': !isLiked, 'icon-dianzanxuanzhong': isLiked}"></i>
              {{ ldleitemspost.likes }}
            </span>
            <span class="stat-item"><el-icon><ChatLineSquare /></el-icon> {{ ldleitemspost.comments }}</span>
            <span class="stat-item" @click="toggleStar">
              <el-icon v-if="!isStarred"><Star /></el-icon>
              <el-icon v-else><StarFilled /></el-icon>
            </span>
          </div>
        </div>
      </div>
  
      <!-- Product Info -->
      <div class="product-info">
        <div class="product-mess">
          <h2>{{ ldleitemspost.item_name }}</h2>
          <div><span>商品简介: {{ ldleitemspost.item_summary}}</span></div>
          <div><span>商品新旧程度：{{ ldleitemspost.condition}}</span></div>
          <div class="bottom clearfix">
            <span class="price">¥{{ ldleitemspost.price }}</span>
          </div>
        </div>
        <div style="position:absolute;right:10px;top:120px;">
        <el-button><el-icon><BellFilled/></el-icon>举报</el-button>
        <!--@click="openDialog"<PayWindow v-model:dialogVisible="dialogVisible" :recruitmentpost="recruitmentpost" />-->
      </div>
      </div>
  
      <div style="display:flex;min-height:200px;">
        <div style="flex:1;padding-top:20px;"><el-icon><Location/></el-icon>上海市/嘉定区/同济大学</div>
        <div style="flex:2;"><img :src="ldleitemspost.item_image" class="image" alt="ldleitemspost image"></div>
      </div>

      <!-- Rent Button -->
       <div style="display:flex;margin-top:-30px;">
        <div style="flex:1;">
        <el-button class="pay">我想要</el-button>
        <!--@click="openDialog"<PayWindow v-model:dialogVisible="dialogVisible" :recruitmentpost="recruitmentpost" />-->
      </div>
      <div class="rent-button">
        <el-button class="pay">立即租赁</el-button>
        <!--@click="openDialog"<PayWindow v-model:dialogVisible="dialogVisible" :recruitmentpost="recruitmentpost" />-->
      </div>
       </div>

       <div style="position:relative;width:100%;">
        <span><img :src="ldleitemspost.avatar" style="border-radius: 50%;height: 60px;width: 60px;position:absolute;left:10px;top:10px;" alt="recruitmentpost image"></span>
        <div style="width:700px;height:200px;margin-top:10px;position:absolute;left:100px;"><el-input 
          class="custom-input" 
          v-model="defaultComment"  
        ></el-input></div>
        <div style="position:absolute;right:10px;top:30px;">
        <el-button class="pay">点击提交</el-button>
        <!--@click="openDialog"<PayWindow v-model:dialogVisible="dialogVisible" :recruitmentpost="recruitmentpost" />-->
      </div>
      <div style="margin-top:100px;position:absolute;left:10px;">
        <span class="flash-comment">260评论</span>
        <ul class="el-timeline">
            <div>
                <li class="el-timeline-item">
                    <div class="el-timeline-item__tail"></div>
                    <div class="el-timeline-item__node el-timeline-item__node--normal"><!--v-if--></div>
                    <!--v-if--><div class="el-timeline-item__wrapper">
                        <div class="el-timeline-item__timestamp is-top">2023-04-01</div>
                        <div class="el-timeline-item__content">
                            <div class="comment">
                                <span class="el-avatar el-avatar--40 el-avatar--circle">
                                    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="object-fit: cover;">
                                </span>
                                <span>zyj</span>
                                <div class="comment-content">
                                    <p>这是一条评论</p>
                                </div>
                                <div class="replies">
                                    <h3>回复：</h3>
                                    <ul class="el-timeline inner-timeline" reverse="true">
                                        <li class="el-timeline-item">
                                            <div class="el-timeline-item__tail"></div>
                                            <div class="el-timeline-item__node el-timeline-item__node--small"><!--v-if--></div>
                                            <!--v-if--><div class="el-timeline-item__wrapper"><!--v-if-->
                                                <div class="el-timeline-item__content">
                                                    <p>这是第一条回复</p>
                                                </div>
                                                <div class="el-timeline-item__timestamp is-bottom">2023-04-01</div>
                                            </div>
                                        </li>
                                        <li class="el-timeline-item">
                                            <div class="el-timeline-item__tail"></div>
                                            <div class="el-timeline-item__node el-timeline-item__node--small"><!--v-if--></div>
                                            <!--v-if--><div class="el-timeline-item__wrapper"><!--v-if-->
                                                <div class="el-timeline-item__content">
                                                    <p>这是第二条回复</p>
                                                </div>
                                                <div class="el-timeline-item__timestamp is-bottom">2023-04-01</div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div><!--v-if-->
                    </div>
                </li>
                <li class="el-timeline-item">
                    <div class="el-timeline-item__tail"></div>
                    <div class="el-timeline-item__node el-timeline-item__node--normal"><!--v-if-->
                    </div><!--v-if-->
                    <div class="el-timeline-item__wrapper">
                        <div class="el-timeline-item__timestamp is-top">2023-04-01</div>
                        <div class="el-timeline-item__content">
                            <div  class="comment">
                                <span  class="el-avatar el-avatar--40 el-avatar--circle">
                                    <img src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="object-fit: cover;">
                                </span>
                                <span>zyj</span>
                                <div class="comment-content">
                                    <p >这是另一条评论</p>
                                </div><!--v-if-->
                            </div>
                        </div><!--v-if-->
                    </div>
                </li>
            </div>
        </ul>
    </div>
    </div>



    </div>
    <div v-else>加载中......</div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'LdleitemsPost',
    props: ['ldleitemspostID'],
    data() {
      return {
        dialogVisible: false,
        isStarSolid: ref(true),
        defaultComment: '请输入您的评论'
      };
    },
    computed: {
      ldleitemspost() {
        const ldleitemspostId = this.ldleitemspostID;
        return this.$store.state.post.ldleitemsposts.find(ldleitemspost => ldleitemspost.post_id === parseInt(ldleitemspostId));
      }
    },
    methods: {
      toggleStarColor() {
        this.isStarSolid = !this.isStarSolid;
      },
      openDialog() {
        console.log('Opening dialog');
        this.dialogVisible = true;
        console.log('Dialog Visible:', this.dialogVisible);
      }
    },
    setup() {
      const isLiked = ref(false);
      const isStarred = ref(false);
  
      const toggleLike = () => {
        isLiked.value = !isLiked.value;
        this.ldleitemspost.likes.value = isLiked.value ? this.ldleitemspost.likes.value + 1 : this.ldleitemspost.likes.value - 1;
      };
  
      const toggleStar = () => {
        isStarred.value = !isStarred.value;
      };
  
      return {
        isLiked,
        toggleLike,
        isStarred,
        toggleStar
      };
    }
  };
  </script>
  
  <style scoped>
  .product-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    width: 80%;
    max-width: 1000px;
    margin:  auto;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    position: relative;
  }
  
  .avatar {
    border-radius: 50%;
    height: 100px;
    width: 100px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  
  .post-details {
    display: flex;
    flex: 1;
  }
  
  .post-info {
    position: absolute;
    left: 40px;
    top: 110px;
    display: flex;
    flex-direction: column;
  }
  
  .post-stats {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  
  .product-info {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 0px;
    padding: 10px;
    margin-left:400px;
  }
  
  .product-mess {
    flex: 1;
  }
  
  .price {
    color: #ff4949;
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .rent-button {
    padding-left:300px;
    display: flex;
    width: 100%;
    flex:2;
  }
  
  .pay {
    background-color: #3085887d;
    font-size: x-large;
    color: #0c0c0c;
  }

  .image {
    width:60%;
    height:100%;
    margin-left:10px;
  }

  .custom-input {
  position: relative; /* Ensure positioning context for absolute child */
  width: 100%;
  max-width: 600px; /* Adjust this as needed */
  margin: 20px 0; /* Adjust margin as needed */
}

.custom-input .el-input__inner {
  width: 100%; /* Full width of the container */
  height: 100px; /* Adjust the height */
  font-size: 16px; /* Adjust the font size */
}

.custom-input .el-input {
  position: relative;
}

.flash-comment {
  padding: 2%;
  margin: 1%;
  font-size: 26px;
    height:24px;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #636363;
}
.comment-container {  
  margin-bottom: 20px;  
  border-bottom: 1px solid #ccc;  
  padding-bottom: 10px;  
}  
  
.comment p {  
  font-weight: bold;  
}  
  
.replies p {  
  margin-left: 20px;  
  font-size: 0.9em;  
} 
.comment-content {  
  display: flex;  
  flex-direction: column;  
  margin: 10px; /* 与头像保持一些间距 */  
}  
.flash-content {  
  display: flex;  
  flex-direction: column;  
  margin: 2%; /* 与头像保持一些间距 */  
}  
  
.replies {  
  margin-top: 10px;  
}  
  
.inner-timeline {  
  /* 可能需要一些额外的样式来确保内部时间线看起来更紧凑或与其他部分协调 */  
  margin: 0;  
  padding: 0;  
}  
.left-panel, .right-panel {
  display: flex;  
overflow-y: auto;
padding: 20px;
flex-direction:row;
}
.left-panel {
  background-color: rgb(255,255,255,80%);
  margin-top: 1%;
  margin-left: 6%;
  margin-bottom: 1%;
  flex: 70%;
}
.right-panel {
flex: 30%;
display: flex;
flex-direction: column;
}
.like-list {
  display: flex;  
  flex-direction: column;  
  align-items: flex-start;  
  padding: 10px;  
}  
  
.like-item {  
  display: flex;  
  align-items: center;  
  margin-bottom: 10px;  
}

  </style>
  