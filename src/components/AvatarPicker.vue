<template>
  <div class="avatar-picker">
    <el-popover
      :width="300"
      :height="1000"
      placement="top"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
      <el-avatar :src="selectedAvatar" class="avatar-img">请选择头像</el-avatar>
      </template>
      <template #default>
      <div class="avatars">
      <img 
        v-for="(avatar,index) in avatars" 
        :key="index" 
        :src="avatar"
        @click="selectAvatar(avatar)" 
        :class="{ selected: avatar === selectedAvatar }" 
        class="avatar-img"
      />
    </div>        
      </template>
    </el-popover>
  </div>
</template>

<script>
export default {
  data() {
    return {
        avatars: [
            require('../assets/avatar-male.jpg'),
            require('../assets/avatar-female.jpg')
        ],
      selectedAvatar: "请选择头像"
    };
  },
  methods: {
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
      }  
  }
};
</script>

<style scoped>
.avatar-picker{
    margin-left:40%;
    margin-bottom:5%;
}

.avatars {
  margin-left:3%;
  display: flex;
  gap: 10%;
}
.avatar-img {
  width: 100px;
  height: 100px;
  cursor: pointer;
  border: 5px solid transparent;
  border-radius: 50%;
}
.avatar-img.selected {
  border-color:#1D5B5E;
}
.selected-avatar {
  margin-top: 20px;
}
</style>