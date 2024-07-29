<template>
    <div class="whole-container">
        <div  v-if=" localCurrentMenu==='share'" >
            <SharePublish/>
        </div>
        <div v-else-if="localCurrentMenu==='recruit'">
            <RecruitPublish/>
        </div>
        <div v-else-if="localCurrentMenu==='rent'">
            <LdlePostWindow />
        </div>
    </div>
</template>

<script>
import LdlePostWindow from "../components/LdlePostWindow.vue";
import SharePublish from "../components/SharepostPublish.vue";
import RecruitPublish from "../components/RecruitPostPublish.vue";


export default {
    name: 'PublishMain',
    props: {
        currentMenu:String
    },
    components: {
        LdlePostWindow,
        SharePublish,
        RecruitPublish
    },
    data(){
        return{
            localCurrentMenu: this.currentMenu
        }
    }

}
</script>

<style scoped>
.whole-container{
    width:100%;
    
}
</style>