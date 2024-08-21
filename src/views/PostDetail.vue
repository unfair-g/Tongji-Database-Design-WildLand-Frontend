<template>
  <div class="post-detail-wrapper">
    <div class="post-detail-box">
      <div class="post-detail-header">
        帖子审核
        <el-icon @click="closeDetail">
          <Close />
        </el-icon>
      </div>
      <hr />
      <div v-if="postDetail" class="post-detail-content">
        <div class="post-info">
          <div class="post-title">帖子标题: <span class="post-content">{{ postDetail.title }}</span></div>
          <div class="post-category">
            帖子类别:
            <span class="post-type" :class="{ active: postDetail.post_kind === 0 }">分享贴</span>
            <span class="post-type" :class="{ active: postDetail.post_kind === 1 }">闲置贴</span>
            <span class="post-type" :class="{ active: postDetail.post_kind === 2 }">招募贴</span>
          </div>
          <div class="post-body">帖子内容: <span class="post-content post-body-content">{{ postDetail.content || '无内容' }}</span></div>
          <div class="post-publisher">发布者名称: <span class="post-content">{{ postDetail.author_name }}</span></div>
        </div>

        <!-- 图片展示 -->
        <div v-if="postDetail.post_portrait && postDetail.post_portrait.length" class="post-images">
          <div v-for="(image, index) in postDetail.post_portrait" :key="index" class="post-image">
            <img :src="image" alt="Post Image" />
          </div>
        </div>

        <el-button class="confirm-button" @click="confirmAction">确认</el-button>
      </div>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex'
import { Close } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    const id = route.params.id // 提取 ID

    const closeDetail = () => {
      router.push({ name: 'PostAudit' })
    }

    return {
      closeDetail,
      id // 返回 ID
    }
  },
  computed: {
    ...mapState('admin', ['postDetail'])
  },
  created() {
    // 确保 ID 不为空后调用 fetchPostDetail
    if (this.id) {
      this.fetchPostDetail(this.id)
    } else {
      console.error('ID is missing in route params')
    }
  },
  methods: {
    ...mapActions('admin', ['fetchPostDetail']),
    confirmAction() {
      console.log('确认操作')
      // Optionally, you can add other actions here
      this.$router.push({ name: 'PostAudit' })
    }
  },
  components: {
    Close
  }
}
</script>

<style scoped>
.post-detail-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

.post-detail-box {
  width: 85%;
  height: 85%;
  background-color: white;
  padding: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 2px solid #1D5B5E;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.post-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 40px;
  margin-bottom: 10px;
}

.post-detail-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-y: auto;
  padding-bottom: 20px;
  box-sizing: border-box;
}

.post-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-sizing: border-box;
}

.post-title,
.post-category,
.post-body,
.post-publisher {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-left: 40px;
  box-sizing: border-box;
}

.post-content {
  font-size: 18px;
  font-weight: normal;
}

.post-category .post-type {
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
  background-color: #FEFFFF;
  border: 1px solid black;
  color: black;
}

.post-category .post-type.active {
  background-color: #1D5B5E; /* 选择的帖子类型底色 */
  color: white; /* 文字颜色为白色 */
  border: none;
}

.post-body-content {
  display: inline-block;
  padding: 10px;
  border: 1px solid #1D5B5E;
  border-radius: 5px;
}

.confirm-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #1D5B5E;
  color: white;
}

.post-images {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
}

.post-image {
  width: calc(33.333% - 10px);
  margin-right: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
}

.post-image img {
  width: 100%;
  height: auto;
  border-radius: 5px;
  object-fit: cover;
}
</style>
