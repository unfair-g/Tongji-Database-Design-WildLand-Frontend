const state = {
  nickname: 'Admin123',
  userId: 'A001',
  phone: '123-456-7890',
  email: 'admin@example.com',
  postDetail: null,
  commentDetail: null,
  postReportDetail: null,
  commentReportDetail: null,
  postAuditTableData: [
    {
      title: "123",
      author: "1",
      post_kind: "2",
      post_time: "222"
    }
  ],
  postsTableData: [
    {
      id: 1,
      reportContent: "帖子内容1",
      reporter: "举报人1",
      reportedUser: "被举报人1",
      reason: "原因1",
      reportTime: "时间1"
    }
  ],
  commentsTableData: [
    {
      id: 1,
      reportContent: "评论内容1",
      reporter: "举报人1",
      reportedUser: "被举报人1",
      reason: "原因1",
      reportTime: "时间1"
    }
  ],
  geekAuditTableData: [] // 添加达人审核表格数据
}

const getters = {
  nickname: state => state.nickname,
  userId: state => state.userId,
  phone: state => state.phone,
  email: state => state.email,
  postDetail: state => state.postDetail,
  commentDetail: state => state.commentDetail,
  postReportDetail: state => state.postReportDetail,
  commentReportDetail: state => state.commentReportDetail, // 修正拼写
  postAuditTableData: state => state.postAuditTableData,
  postsTableData: state => state.postsTableData,
  commentsTableData: state => state.commentsTableData,
  geekAuditTableData: state => state.geekAuditTableData // 添加getter
}

const mutations = {
  setNickname(state, nickname) {
    state.nickname = nickname
  },
  setUserId(state, userId) {
    state.userId = userId
  },
  setPhone(state, phone) {
    state.phone = phone
  },
  setEmail(state, email) {
    state.email = email
  },
  setPostDetail(state, postDetail) {
    state.postDetail = postDetail
  },
  setCommentDetail(state, commentDetail) {
    state.commentDetail = commentDetail
  },
  setPostReportDetail(state, postReportDetail) {
    state.postReportDetail = postReportDetail
  },
  setCommentReportDetail(state, commentReportDetail) {
    state.commentReportDetail = commentReportDetail
  },
  setPostAuditTableData(state, postAuditTableData) {
    state.postAuditTableData = postAuditTableData
  },
  setPostsTableData(state, postsTableData) {
    state.postsTableData = postsTableData
  },
  setCommentsTableData(state, commentsTableData) {
    state.commentsTableData = commentsTableData
  },
  setGeekAuditTableData(state, geekAuditTableData) { // 添加mutation
    state.geekAuditTableData = geekAuditTableData
  }
}

const actions = {
  fetchAdminDetails({ commit }) {
    const data = {
      nickname: 'Admin123',
      userId: 'A001',
      phone: '123-456-7890',
      email: 'admin@example.com'
    }
    
    commit('setNickname', data.nickname)
    commit('setUserId', data.userId)
    commit('setPhone', data.phone)
    commit('setEmail', data.email)
  },
  fetchPostDetail({ commit }, id) {
    const postDetail = {
      id: id,
      postTitle: "示例帖子标题",
      postType: "分享贴",
      postContent: "这是帖子内容。",
      publisherName: "发布者名称",
      rejectReason: ""
    }
    commit('setPostDetail', postDetail)
  },
  fetchCommentDetail({ commit }, id) {
    const commentDetail = {
      id: id,
      commentContent: "示例评论内容",
      commenterName: "评论者名称",
      commentTime: "评论时间",
      rejectReason: ""
    }
    commit('setCommentDetail', commentDetail)
  },
  fetchPostReportDetail({ commit }, id) {
    const postReportDetail = {
      id: id,
      postTitle: "示例帖子标题",
      postType: "分享贴",
      postContent: "这是帖子内容。",
      publisherName: "发布者名称",
      ReportReason:"这里是举报原因",
      rejectReason: ""
    }
    commit('setPostReportDetail', postReportDetail)
  },
  fetchCommentReportDetail({ commit }, id) {
    const commentReportDetail = {
      id: id,
      commentContent: "示例评论内容",
      commenterName: "评论者名称",
      ReportReason: "这里是举报原因",
      rejectReason: ""
    }
    commit('setCommentReportDetail', commentReportDetail)
  },
  fetchPostAuditTableData({ commit }) {
    const postAuditTableData = [
      {
        title: "123",
        author: "1",
        post_kind: "2",
        post_time: "222"
      }
    ]
    commit('setPostAuditTableData', postAuditTableData)
  },
  fetchPostsTableData({ commit }) {
    const postsTableData = [
      {
        id: 1,
        reportContent: "帖子内容1",
        reporter: "举报人1",
        reportedUser: "被举报人1",
        reason: "原因1",
        reportTime: "时间1"
      }
    ]
    commit('setPostsTableData', postsTableData)
  },
  fetchCommentsTableData({ commit }) {
    const commentsTableData = [
      {
        id: 1,
        reportContent: "评论内容1",
        reporter: "举报人1",
        reportedUser: "被举报人1",
        reason: "原因1",
        reportTime: "时间1"
      }
    ]
    commit('setCommentsTableData', commentsTableData)
  },
  fetchGeekAuditTableData({ commit }) { // 添加action
    const geekAuditTableData = [
      {
        applicant: "申请人1",
        expertise: "擅长领域1",
        qualification: "资质证明1",
        outdoorExperience: "户外经历1",
        applicationTime: "申请时间1"
      }
      // Add more data as needed
    ]
    commit('setGeekAuditTableData', geekAuditTableData)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
