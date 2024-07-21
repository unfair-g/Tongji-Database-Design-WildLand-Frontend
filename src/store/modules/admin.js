// store/modules/admin.js
const state = {
    nickname: 'Admin123',
    userId: 'A001',
    phone: '123-456-7890',
    email: 'admin@example.com',
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
        reportContent: "帖子内容1",
        reporter: "举报人1",
        reportedUser: "被举报人1",
        reason: "原因1",
        reportTime: "时间1"
      }
      // 更多帖子数据
    ],
    commentsTableData: [
      {
        reportContent: "评论内容1",
        reporter: "举报人1",
        reportedUser: "被举报人1",
        reason: "原因1",
        reportTime: "时间1"
      }
      // 更多评论数据
    ]
  }
  
  const getters = {
    nickname: state => state.nickname,
    userId: state => state.userId,
    phone: state => state.phone,
    email: state => state.email,
    postAuditTableData: state => state.postAuditTableData,
    postsTableData: state => state.postsTableData,
    commentsTableData: state => state.commentsTableData
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
    setPostAuditTableData(state, postAuditTableData) {
      state.postAuditTableData = postAuditTableData
    },
    setPostsTableData(state, postsTableData) {
      state.postsTableData = postsTableData
    },
    setCommentsTableData(state, commentsTableData) {
      state.commentsTableData = commentsTableData
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
          reportContent: "帖子内容1",
          reporter: "举报人1",
          reportedUser: "被举报人1",
          reason: "原因1",
          reportTime: "时间1"
        }
        // 更多帖子数据
      ]
      commit('setPostsTableData', postsTableData)
    },
    fetchCommentsTableData({ commit }) {
      const commentsTableData = [
        {
          reportContent: "评论内容1",
          reporter: "举报人1",
          reportedUser: "被举报人1",
          reason: "原因1",
          reportTime: "时间1"
        }
        // 更多评论数据
      ]
      commit('setCommentsTableData', commentsTableData)
    }
  }
  
  export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
  }
  