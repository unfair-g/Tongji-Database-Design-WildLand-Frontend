<template>
<div class="otherspersonalcenter">
        <el-row>
            <el-col :span="2"><h2>个人信息</h2></el-col>
             <el-col :span="2">
                <el-tag v-if="followed" color="#1D5B5E" size="large" effect="dark" style="width:80%;font-size:18px" @click="unFollow">已关注</el-tag>
                <el-tag v-else color="#1D5B5E" size="large" effect="dark" style="width:80%;font-size:18px" @click="Follow">+ 关注</el-tag>
            </el-col>
        </el-row>
        <el-row style="margin-top:1%">
        <el-col :span="2">
            <el-avatar :src="userInfo.portrait" style="width:100px;height:100px"/>
        </el-col>
        <el-col :span="10">
            <el-row style="font-weight: bold;font-size:25px;margin-top: 1%">
                <el-col :span="5">
                    <span>{{ userInfo.user_name }}</span>
                    <span v-if="userInfo.gender==='f'" style="margin-left: 10%;color:#FF82BF"><el-icon><Female /></el-icon></span>
                    <span v-if="userInfo.gender==='m'" style="margin-left: 10%;color:#3F48CC"><el-icon><Male /></el-icon></span>
                </el-col>
                <el-col :span="5">
                    <el-tag v-if="userInfo.outdoor_master_title==='1'" color="#1D5B5E" size="large" effect="dark" round>户外达人</el-tag>
                    <el-tag v-else type="info" size="large" effect="dark" round>户外达人</el-tag>
                </el-col> 
            </el-row>
            <el-row style="min-width:100%;margin-top: 2%">
            <el-col :span="7">ID:{{ userInfo.user_id }}</el-col>
            <el-col :span="3">{{ userInfo.fans }} 粉丝</el-col>
            <el-col :span="3">{{ userInfo.follows }} 关注</el-col>
            </el-row>
        </el-col>
        <el-col :span="7">
            <el-row style="margin-top: 1%">
            <div style="font-weight:bold;margin-top:1%">个性签名</div>
            </el-row>
            <el-row>
            <div style="margin-top:2%">{{ userInfo.personal_signature }}</div>
            </el-row>
        </el-col>
        <el-col :span="5">
        <el-row style="margin-top: 1%">
            <div style="margin-top:1%;display: flex;"><div style="font-weight:bold;">生日：</div><span>{{ userInfo.birthday }}</span></div>
            </el-row>
            <el-row style="margin-top: 2%">
            <div style="margin-top:2%;display: flex;"><div style="font-weight:bold;">IP：</div><span>{{userInfo.location}}</span></div>
            </el-row>
        </el-col>
        </el-row>
        <el-divider />
        <Post :user_id="route.params.userId"/>
    </div>
</template>

<script setup>
import axios from '@/axios'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { ElMessage } from 'element-plus'
import Post from '../components/MyPost.vue'
import global from '@/store/global'

const userInfo = ref({})
const route = useRoute();
const followed=ref()

const Follow = async () => {
    try {
        await axios.post(`/api/Follows/${global.userId}/follow/${route.params.userId}`)
        ElMessage.success('关注成功！')
        followed.value = true
        userInfo.value.fans += 1;
    } catch (error) {
        ElMessage.error(error.message)
        console.error(error)        
    }
}

const unFollow = async () => {
    try {
        await axios.delete(`/api/Follows/unfollow/${global.userId}/${route.params.userId}`)
        followed.value = false
        userInfo.value.fans -= 1;
        ElMessage.success('取关成功！')
    } catch (error) {
        ElMessage.error(error.message)
        console.log(error)
    }
}

const fetchUser=async (id) =>{
    try{
        const response = await axios.get(`/api/Users/getUserInfo/${id}`);
        userInfo.value = response.data.data.userInfo
        if (userInfo.value.birthday != null)
            userInfo.value.birthday = userInfo.value.birthday.substring(0, 10);
        userInfo.value.follows = response.data.data.followingCount;
        userInfo.value.fans = response.data.data.followerCount;
    } catch (error) {
        ElMessage.error(error.message);
    }
}

const ifFollowed = async () => {
    try {
        const response = await axios.get(`/api/Follows/getFollowedUsers/${global.userId}`);
        const follows = response.data.data
        followed.value = follows.some(item => item.followed_id == route.params.userId)
        console.log('followed',followed.value)
    }
    catch (error) {
        console.error(error)
    }
}

onMounted(() => {
    const userId = route.params.userId
    fetchUser(userId)
    ifFollowed()
})
</script>

<style scoped>
 .otherspersonalcenter{
    height:fit-content;
    width:80%;
    margin-left: auto;
    margin-right: auto;
    margin-top:1%;
    background-color: rgb(255,255,255,80%);
    box-shadow: 0 0 5px 1px #888888;
    padding:1%;
    margin-bottom:1%;
   }

   .item-label{
    font-weight:bold;
   }

</style>