<template>
  <div>
    <div class="signup-item">
      <img :src="signup.avatar" alt="avatar" class="avatar">
      <div class="signup-details">
        <div class="one-signup">
          <div class="signup-info">
            <div class="signup-header">
              <span class="signup-username">{{ signup.username }}</span>
            </div>
            <div class="signup-content">{{ signup.content }}</div>
            <div class="signup-footer">
              <span class="timestamp">{{ signup.timestamp }}</span>
              <span class="location">IP: {{ signup.location }}</span>
              <span type="text" class="delete-signup-button" @click="emitDeleteSignup(signup)">删除</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'SignUpItem',

  props: {
    signup: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitDeleteSignup(signup) {
      this.$emit('delete-signup', signup);
    },
  }
};
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
}
.signup-item {
  display: flex;
  margin-bottom: 10px;
}
.signup-details {
  flex: 1;
  margin-left: 10px;
}
.one-signup {
  display: flex;
  justify-content: space-between;
}
.signup-info {
  display: flex;
  flex-direction: column;
}
.signup-header {
  display: flex;
  flex-direction: column;
}
.location,
.timestamp {
  margin-right: 20px;
  color: grey;
  font-size: 14px;
}
.signup-content {
  margin-top: 5px;
}
.signup-footer {
  margin-top: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: flex-start;
  gap: 30px;
  color: grey;
  font-size: 14px;
}
.delete-signup-button {
  color: red;
}


</style>
