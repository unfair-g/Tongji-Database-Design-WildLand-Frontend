<template>
  <div v-if="replies.length > 0">
    <div v-for="reply in replies" :key="reply.comment_id" class="reply">
      <CommentItem
        :postID="Number(postID)"
        :comment="reply"
        :isReply="true"
      />
    </div>
  </div>
</template>

<script>
import axios from '@/axios';
import CommentItem from '@/components/CommentItem.vue';
import state from '@/store/global.js'; // 引入映射表
import { ElMessage } from "element-plus";
export default {
  name: 'NestedReplies',
  components: {
    CommentItem,
  },
  props: {
    rootCommentId: {
      type: Number,
      required: true,
    },
    postID: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      replies: [],
    };
  },
  mounted() {
    this.fetchReplies();
  },
  methods: {
    async fetchReplies() {
      try {
        const user_id = state.userId; // 获取当前用户ID
        const response = await axios.get(`/api/Comments/GetReplies/${this.rootCommentId}/${user_id}`);
        this.replies = response.data || [];
        console.log('Replies fetched successfully:', this.replies);
      } catch (error) {
        console.error('Error fetching replies:', error);
        ElMessage.error('获取回复失败');
      }
    },
  },
};
</script>

<style scoped>
.reply {
  margin-left: 20px; /* 缩进显示回复 */
  margin-top: 10px;
  border-left: 2px solid #ddd;
  padding-left: 10px;
}
</style>
