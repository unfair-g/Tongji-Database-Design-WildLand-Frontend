<template>
    <el-row :gutter="25">
        <el-col :span="8" v-for="camp in starcamp" :key="camp.id">
            <el-card  style="margin-bottom:8%">
                <img :src="camp.image" style="width:100%"/>
                <template #footer>
                    <h3>{{ camp.campground_name }}</h3>
                    <div style="margin-top:3%">{{ camp.introduction }}</div>
                </template>
            </el-card>
        </el-col>
  </el-row>
</template>

<script>
export default {
    computed: {
        starcamp() {
            return this.$store.state.camp.camps;
        }
    }
}

</script>

<style>

</style>