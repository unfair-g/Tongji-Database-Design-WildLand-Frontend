<template>
 <el-card style="width: 85vw;margin-left:6vw;margin-bottom: 6vh;">
        <template #header>
        <div class="card-header">
        <span class="title">达人热帖</span>
        </div>
        </template>
        <div class="hot-post">
        <el-carousel style="width:100%" height="75vh">
            <div style="width:90%;display: block;margin:0 auto;">
                <el-card v-if="user" style="min-height: fit-content;" @click="toPostDetail">
                <template #header>
                    <h2>{{ post[0].title }}</h2>
                </template>
                <div style="display: flex;">
                    <div style="width:50%">
                    <el-carousel height="55vh" autoplay>
                        <el-carousel-item v-for="img in post[0].post_images" :key="img" 
                        style="height:fit-content;display: flex;justify-content: center;">
                            <img :src="img" style="height:55vh;width:auto"/>
                        </el-carousel-item>
                    </el-carousel>
                    </div>
                    <div style="width:50%">
                    <p v-for="line in post[0].content" :key="line" style="margin-top:3%">{{ line }}</p>
                    </div>
                 </div>
                 <template #footer>
                    <div style="display: flex; align-items:center;">
                    <el-avatar :src="user.avatar"></el-avatar>
                    <p style="height:100%;margin-left: 1%;">{{ user.name }}</p>
                    <p style="margin-left: 25px;">{{ post[0].time }}</p>
                    </div>
                </template>
                </el-card>
            </div>
        </el-carousel>
        </div>
</el-card>
</template>

<script>
export default{
    data() {
        return {
            users: [
                { id: 1, name: 'Alice', avatar: require('../assets/avatar.jpg'), profile: 'Alice的个人简介' },
                { id: 2, name: 'Bob', avatar: require('../assets/avatar.jpg'), profile: 'Bob的个人简介' },
                { id: 3, name: 'Charlie', avatar: require('../assets/avatar.jpg'), profile: 'Charlie的个人简介' }
            ],
            user: { id: 1, name: 'Alice', avatar: require('../assets/avatar.jpg'), profile: 'Alice的个人简介' }
        }
    },
    computed: {
        post() {
             return this.$store.state.post.shareposts
        }
    },
    methods: {
        handleSelect(index){
            this.user = this.users[index-1];
        },
        toPostDetail() {
            this.$router.push({ path: `/home/forum/post/share/${this.post[0].post_id}` });
        }
    }
}
</script>

<style scoped>
.hot-post{
    display:flex;
}

.title {
    color: #1D5B5E;
    font-size: 60px;
    font-family: 'FZYaoti';
    font-style: italic;
    font-weight: bold;
}

.userlist{
    --el-menu-hover-bg-color: rgb(48,133,136,40%);
    --el-menu-active-color: #C65E2D;
    font-weight: bold;
}

.userlist .el-menu-item{
    height:8vh;
}

</style>