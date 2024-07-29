<template>
    <div class="container">
        我是好人
        <div v-if="LocalcurrentMenu==='rent'">
          <LdlePostWindow/>
        </div>
    </div>
</template>

<script>

import LdlePostWindow from '@/components/LdlePostWindow.vue'

export default {
    name: 'PublishMain',
    props: {
        currentMenu:String,
    },
    compomnents: {
        LdlePostWindow
    },
    data() {
        return {
            LocalcurrentMenu:this.currentMenu
        }
    }

}
</script>

<style>

</style>