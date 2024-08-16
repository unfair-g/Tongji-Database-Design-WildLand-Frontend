<template>
<el-dialog
    v-model="isVisible"
    title="关注列表"
    width="300"
    center
  >
    <span>{{ tips }}</span>
    <div class="follows" v-for="follow in follows" :key="follow.followed_id">
        <div style="display: flex;">
        <el-avatar :src="follow.followed_user_portrait" :size="70" @click="goToUserSpace(follow.followed_id)"></el-avatar>
        <span class="follows-text">{{ follow.followed_user_name }}</span>
        </div>
        <el-divider />
    </div>
  </el-dialog>

</template>

<script>
import axios from '@/axios'
import global from '@/store/global'
import { onMounted,ref } from 'vue';

export default {
    props: {
        isListVisible: {
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            isVisible: this.isListVisible,
        }
    },
    methods: {
        goToUserSpace(user_id) {
            this.$router.push({
                path: `/home/userspace/${user_id}`
            })
        }
    },
    setup() {
        const follows = ref()
        const tips=ref('')

        const fetchFollows = async () => {
            try {
                const response = await axios.get(`/api/Follows/getFollowedUsers/${global.userId}`);
                follows.value = response.data.data
            }
            catch (error) {
                if (error.response.code == '404')
                    tips.value='无关注用户'
                console.error(error)
            }
        }

        onMounted(() => {
            fetchFollows();
        })

        return{
            follows,
            tips
        }
    }
}   

</script>

<style>
.follows-text{
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 8%;
    font-size:20px;
    color:black;
}

.follows .el-divider--horizontal{
     margin: 15px 0;
     background: 0 0;
 }
</style>