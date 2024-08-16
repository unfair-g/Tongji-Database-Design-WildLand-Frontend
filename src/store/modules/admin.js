import axios from '@/axios';

const state = {
  nickname: null,
  admin_id: sessionStorage.getItem('admin_id') || null,
  phone: null,
  email: null,
  avatarSrc: null,
  postDetail: null,
  commentDetail: null,
  postReportDetail: null,
  commentReportDetail: null,
  postAuditTableData: [],
  postsTableData: [],
  commentsTableData: [],
  geekAuditTableData: []
};

const getters = {
  nickname: state => state.nickname,
  admin_id: state => state.admin_id,
  phone: state => state.phone,
  email: state => state.email,
  avatarSrc: state => state.avatarSrc,
  postDetail: state => state.postDetail,
  commentDetail: state => state.commentDetail,
  postReportDetail: state => state.postReportDetail,
  commentReportDetail: state => state.commentReportDetail,
  postAuditTableData: state => state.postAuditTableData,
  postsTableData: state => state.postsTableData,
  commentsTableData: state => state.commentsTableData,
  geekAuditTableData: state => state.geekAuditTableData
};

const mutations = {
  setNickname(state, nickname) {
    state.nickname = nickname;
  },
  setAdminId(state, admin_id) {
    state.admin_id = admin_id;
  },
  setPhone(state, phone) {
    state.phone = phone;
  },
  setEmail(state, email) {
    state.email = email;
  },
  setavatarSrc(state, avatarSrc) {
    state.avatarSrc = avatarSrc;
  },
  setPostDetail(state, postDetail) {
    state.postDetail = postDetail;
  },
  setCommentDetail(state, commentDetail) {
    state.commentDetail = commentDetail;
  },
  setPostReportDetail(state, postReportDetail) {
    state.postReportDetail = postReportDetail;
  },
  setCommentReportDetail(state, commentReportDetail) {
    state.commentReportDetail = commentReportDetail;
  },
  setPostAuditTableData(state, postAuditTableData) {
    state.postAuditTableData = postAuditTableData;
  },
  setPostsTableData(state, postsTableData) {
    state.postsTableData = postsTableData;
  },
  setCommentsTableData(state, commentsTableData) {
    state.commentsTableData = commentsTableData;
  },
  setGeekAuditTableData(state, geekAuditTableData) {
    state.geekAuditTableData = geekAuditTableData;
  },
  updatePostAuditStatus(state, { id, status }) {
    const post = state.postAuditTableData.find(post => post.id === id);
    if (post) {
      post.isReviewed = status;
    }
  },
  updatePostTableDataStatus(state, { id, status }) {
    const post = state.postsTableData.find(post => post.id === id);
    if (post) {
      post.isReviewed = status;
    }
  },
  updateCommentTableDataStatus(state, { id, status }) {
    const comment = state.commentsTableData.find(comment => comment.id === id);
    if (comment) {
      comment.isReviewed = status;
    }
  },
  updateGeekAuditStatus(state, { id, status }) {
    const applicant = state.geekAuditTableData.find(item => item.id === id);
    if (applicant) {
      applicant.isReviewed = true;
      applicant.reviewStatus = status;
    }
  }
};

const actions = {
  fetchAdminDetails({ commit }) {
    const data = {
      nickname: 'Admin123',
      admin_id: 'A001',
      phone: '123-456-7890',
      email: 'admin@example.com',
      avatarSrc: null
    };

    commit('setNickname', data.nickname);
    commit('setAdminId', data.admin_id);
    commit('setPhone', data.phone);
    commit('setEmail', data.email);
    commit('setavatarSrc', data.avatarSrc);
  },
  fetchPostDetail({ commit }, id) {
    axios.get(`/api/Posts/getAdminView/${id}`)
      .then(response => {
        const postDetail = response.data.data;
        commit('setPostDetail', postDetail);
      })
      .catch(error => {
        console.error(error);
      });
  },
  fetchCommentDetail({ commit }, id) {
    const commentDetail = {
      id: id,
      commentContent: "示例评论内容",
      commenterName: "评论者名称",
      commentTime: "评论时间"
    };
    commit('setCommentDetail', commentDetail);
  },
  async fetchPostReportDetail({ commit }, id) {
    try {
      const response = await axios.get(`/api/PostReports/${id}`);
      console.log(response.data.data); // 打印响应以检查其结构
      
      const postReportDetail = response.data.data;
      
      if (!postReportDetail) {
        console.error('API 响应中没有找到数据');
        return;
      }
  
      const postTypeMap = {
        0: '分享贴',
        1: '闲置贴',
        2: '招募贴'
      };
  
      const formattedPostReportDetail = {
        id: postReportDetail.report_id,
        postTitle: postReportDetail.post_title,
        postType: postTypeMap[postReportDetail.post_kind], 
        postContent: postReportDetail.post_content || '内容未提供',
        publisherName: postReportDetail.post_author_name,
        reportReason: postReportDetail.report_reason,
        audits: 'pending',
        post_portrait:postReportDetail.post_portrait || null
      };
      

      commit('setPostReportDetail', formattedPostReportDetail);
    } catch (error) {
      console.error('获取帖子举报详情失败:', error);
    }
  },
  async fetchCommentReportDetail({ commit }, id) {
    try {
      const response = await axios.get(`/api/CommentReports/${id}`);
      console.log(response.data); // 检查 API 返回的内容
  
      const commentReport = response.data.data;
      
      if (!commentReport) {
        console.error('API 响应中没有找到数据');
        return;
      }
  
      const formattedCommentReportDetail = {
        id: commentReport.report_id,
        commentContent: commentReport.comment_content || '内容未提供',
        commenterName: commentReport.author_name,
        ReportReason: commentReport.report_reason
      };
  
      commit('setCommentReportDetail', formattedCommentReportDetail);
    } catch (error) {
      console.error('获取评论举报详情失败:', error);
    }
  },
  async fetchPostAuditTableData({ commit }) {
    try {
      const response = await axios.get('/api/PostReviews/unreviewedList');
      const postAuditTableData = response.data.data.map(post => ({
        id: post.post_id,
        title: post.title,
        author: post.author_id,
        post_kind: post.post_kind,
        post_time: post.post_time,
        isReviewed: false
      }));
      commit('setPostAuditTableData', postAuditTableData);
    } catch (error) {
      console.error('Failed to fetch post audit table data:', error);
    }
  },
  async fetchPostsTableData({ commit }) {
    try {
      const response = await axios.get('/api/PostReports/unreviewedList');
      const postsTableData = response.data.data.map(post => ({
        id: post.report_id,
        reportContent: post.post_title,
        reporter: post.user_name,
        reportedUser: post.post_author_name,
        reason: post.report_reason,
        reportTime: post.report_time,
        isReviewed: false
      }));
      commit('setPostsTableData', postsTableData);
    } catch (error) {
      console.error('Failed to fetch post report table data:', error);
    }
  },
  async fetchCommentsTableData({ commit }) {
    try {
      const response = await axios.get('/api/CommentReports/unreviewedList');
      const commentsTableData = response.data.data.map(comment => ({
        id: comment.report_id,
        reportContent: comment.comment_content,
        reporter: comment.user_name,
        reportedUser: comment.comment_author_name,
        reason: comment.report_reason,
        reportTime: comment.report_time,
        isReviewed: false
      }));
      commit('setCommentsTableData', commentsTableData);
    } catch (error) {
      console.error('Failed to fetch comment report table data:', error);
    }
  },
  async fetchGeekAuditTableData({ commit }) {
    try {
      const response = await axios.get('/api/CertificationReviews/unreviewedList');
      const geekAuditTableData = response.data.data.map(item => ({
        applicant_id: item.applicant_id,
        applicant: item.applicant_name,  
        expertise: item.ept_field,
        qualification: item.proof,
        outdoorExperience: item.experience,
        applicationTime: item.summit_date,
        isReviewed: false,
        reviewStatus: null
      }));
      commit('setGeekAuditTableData', geekAuditTableData);
    } catch (error) {
      console.error('Failed to fetch geek audit table data:', error);
    }
  },
  updatePostAuditStatus({ commit }, { id, status }) {
    commit('updatePostAuditStatus', { id, status });
  },
  updatePostTableDataStatus({ commit }, { id, status }) {
    commit('updatePostTableDataStatus', { id, status });
  },
  updateCommentTableDataStatus({ commit }, { id, status }) {
    commit('updateCommentTableDataStatus', { id, status });
  },
  updateGeekAuditStatus({ commit }, { id, status }) {
    commit('updateGeekAuditStatus', { id, status });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
