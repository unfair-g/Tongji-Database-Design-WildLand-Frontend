<template>
 <el-card style="width: 85vw;margin-left:6vw;">
        <template #header>
        <div class="card-header">
        <span class="title">达人热帖</span>
        </div>
        </template>
        <div class="container">
            <div style="width:15%">
                 <el-menu default-active="1">
                    <el-menu-item
                    v-for="user in users"
                    :key="user.id"
                    >
                <el-avatar :src="user.avatar" />
                <span>{{ user.name }}</span>
                </el-menu-item>
                </el-menu>
            </div>
            <div style="width:85%">
                <el-card v-if="user" style="min-height:100%">
                <template #header>
                    <el-avatar :src="user.avatar"></el-avatar>
                    <p>{{ user.name }}</p>
                </template>
                <p>{{ user.profile }}</p>
                </el-card>
            </div>
        </div>
</el-card>
</template>

<script>
export default{
    data() {
        return {
            users: [
                { id: 1, name: 'Alice', avatar: '../assets/avatar.jpg', profile: 'Alice的个人简介' },
                { id: 2, name: 'Bob', avatar: '../assets/avatar.jpg', profile: 'Bob的个人简介' },
                { id: 3, name: 'Charlie', avatar: '../assets/avatar.jpg', profile: 'Charlie的个人简介' }
            ],
            user: { id: 1, name: 'Alice', avatar: '../assets/avatar.jpg', profile: 'Alice的个人简介' }
        }
    }
}
</script>

<style scoped>
.container{
    display:flex;
}

</style>