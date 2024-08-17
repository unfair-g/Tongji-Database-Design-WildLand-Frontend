<template>
<PersonInfo />
<MyPost :user_id="userId"/>
</template>

<script>
import PersonInfo from '../components/UserInfo.vue'
import MyPost from '../components/MyPost.vue'
import global from '@/store/global'

export default{
    components: {
        PersonInfo,
        MyPost
    },
    data() {
        return {
            userId:global.userId
        }
    }
}

</script>

<style>

</style>