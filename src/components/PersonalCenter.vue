<template>
    <div>{{ user.user_id }}</div>
</template>

<script>
export default {
    computed: {
        user() {
            return this.$store.state.user;
        }
    }
}
</script>

<style>

</style>