<template>
    <div class="container">
      <div class="left-panel">
        <div class="flash-item">
            <div class="flash-like" @click="toggleStar(flashId)">  
              <strong>收藏</strong>  
              <el-icon v-if="!flash.isSolid"><Star /></el-icon>
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
                <div>  
                  <el-timeline-item  
                    v-for="(comment, index) in flash.comments"  
                    :key="`${flash.flash_id}-${index}`"  
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
                            :key="`${flash.flash_id}-${index}-${replyIndex}`"  
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
                </div>  
              </el-timeline>  
            </div>  
        </div>
      </div>
      <div class="right-panel">  
        <h2>点赞</h2>  
        <div>  
          <h3> {{ flash.like }}</h3> <!-- 可选，用于显示Flash ID -->  
          <div class="like-item" v-for="(user, userIndex) in flash.like_users" :key="`${flash.flash_id}-${userIndex}`">  
            <el-avatar :src="user.avatar" alt="用户头像" class="avatar" />  
            <span class="name">{{ user.name }}</span>  
          </div>  
        </div>  
        <h2>浏览量</h2>  
        <div>  
          <span class="flash-view"> {{ flash.view || '未知' }}</span>  
        </div>  
      </div>  
    </div>
</template>

<script>

export default {
name: 'R_Flash',
props: ['flashID'],
computed: {
flash() {
  const flashId = this.flashID;
  return this.$store.state.flash.flashes.find(flash => flash.flash_id === parseInt(flashId));
}
},
methods: {  
  toggleStar(flashId) {  
    const flash1 = this.$store.state.flash.flashes.find(f => f.id === flashId);  
    flash1.isSolid = !flash1.isSolid;  
    this.$store.commit('flash/toggleFlashSolid', flashId); 
  }  
  },  
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
