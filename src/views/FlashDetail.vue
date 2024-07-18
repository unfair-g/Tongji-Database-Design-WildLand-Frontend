<template>
    <div class="container">
      <div class="left-panel">
        <div class="flash-item" v-for="(flash) in flash" :key="flash.title">
            <div class="flash-like" @click="toggleStar">  
              <strong>收藏</strong>  
              <el-icon v-if="!isSolid"><Star /></el-icon>
              <el-icon v-else><StarFilled /></el-icon>
            </div>  
            <div class="flash-like">
              <span>{{ flash.favorite }}</span>
            </div>
            <span class="flash-title">{{ flash.title }}</span>
            <div>
              <el-avatar  
                src="flash.avatar" alt="用户头像" class="avatar" 
                    />   
              <span class="flash-meta">{{ flash.meta }}</span>
            </div>
            <span class="flash-content">{{ flash.content }}</span>
            <div>
              <el-avatar  
                src="flash.avatar" alt="用户头像" class="avatar" 
                    />   
              <el-input
                v-model="textarea"
                style="width: 90%"
                :rows="3"
                type="textarea"
                placeholder="Please input"
              />
            </div>
            <el-button 
              color="#1D5B5E" :dark="isDark"
              style="padding: 10px; margin: 10px;">发表评论</el-button>
            <div class="flash-info">
            </div>
            <div>  
              <span class='flash-comment'>{{ flash.comment }}</span>
              <el-timeline>  
                <el-timeline-item  
                  v-for="(comment, index) in comments"  
                  :key="index"  
                  :timestamp="comment.timestamp || index"  
                  placement="top"  
                >  
                  <div class="comment">  
                    <el-avatar  
                      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"  
                      size="40"  
                    />  
                    <span>{{ comment.auther }}</span> 
                    <div class="comment-content">   
                      <p>{{ comment.text }}</p>  
                    </div>  
                    <div v-if="comment.replies && comment.replies.length > 0" class="replies">  
                      <h3>回复：</h3>  
                      <el-timeline :reverse="true" class="inner-timeline">  
                        <el-timeline-item  
                          v-for="(reply, replyIndex) in comment.replies"  
                          :key="replyIndex"  
                          :timestamp="reply.timestamp || replyIndex"  
                          placement="bottom"  
                          size="small"  
                        >  
                          <p>{{ reply.text }}</p>  
                        </el-timeline-item>  
                      </el-timeline>  
                    </div>  
                  </div>  
                </el-timeline-item>  
              </el-timeline>  
            </div>  
        </div>
      </div>
      <div class="right-panel">
        <h2>点赞</h2>
        <div class="like-list">  
          <div class="like-item" v-for="(user, index) in users" :key="index">  
            <el-avatar  
            src="user.avatar" alt="用户头像" class="avatar" 
                    />   
            <span class="name">{{ user.name }}</span>  
          </div>  
        </div>
        <h2>浏览量</h2>
        <div class="flash-item" v-for="(flash) in flash" :key="flash.title">
          <span class="flash-view">{{ flash.view }}</span>
        </div>
      </div>
    </div>
</template>

<script>

export default {
name: 'R_Flash',
  
data() {
    return {
      isSolid: false, // 控制星星是否实心  
      flash: [
        { id:1,title: '野游营地 | 逃离燥热城市', meta: ' wsy',like:'52900 喜爱',view:'370000浏览',comment:'260评论',favorite:'3424收藏',
          content: '在八月高温的起起落落下，江浙沪又有几家新营地开业啦，有位于水边的玩水露营地也有位于山林间的避暑露营地，还有位于荒野之上的BC露营地，不得不说，现在的露营地越来越“卷”了呀！',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
        },
       ],
       comments :[  
        {  
          auther:'wsy',
          text: '这是一条评论', 
          timestamp: '2023-04-01', 
          replies: [  
          { text: '这是第一条回复',
          timestamp: '2023-04-01' }, // 回复也需要时间戳（如果可用）  
          { text: '这是第二条回复', 
          timestamp: '2023-04-01' }  
          ]  
        },  
        {  
          auther:'wsy',
          text: '这是另一条评论',  
          timestamp: '2023-04-01', 
          replies: []  
        }  
        // 可以继续添加更多评论和回复  
      ],
      users: [  
        { name: '张三', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },  
        { name: '李四', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },  
        { name: '王五', avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' },  
        // 可以继续添加更多用户  
      ],  
    };
  },
  methods: {  
    toggleStar() {  
      this.isSolid = !this.isSolid; // 切换实心状态  
    }  
  }  
}
</script>

<style scoped>
.container {
display: flex;
height: 100%;
}
.flash-info {
  margin: 3%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.flash-title {
  color:#333;
      font-size: 37px;
      overflow:hidden;
}
.flash-meta {
  color: #999;
  font-size: 0.9em;
}
.flash-view {
  padding: 3%;
  margin:3%;
  color: #636363;
  font-size: 20px;
}
.flash-like {
  padding: 1%;
  margin-top: 16px;
      height:24px;
      overflow:hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #636363;
      float:right;
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
  
.avatar {  
  width: 50px;  
  height: 50px;  
  border-radius: 50%;  
  margin-right: 10px;  
}  
  
.name {  
  font-size: 16px;  
}  
</style>
