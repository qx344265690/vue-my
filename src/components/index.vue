<template>
    <div>
        <div v-text="name"></div>
         <el-button type="primary" @click="Jumps">主要按钮</el-button>
    </div>
</template>

<script>
    export default {
        name:'Index',
        data() {
            return {
                name: '第一个页面'
            }
        },
        methods: {
            Jumps() {
                this.$router.push({path:'/'})
            }
        },
    }
</script>

<style scoped>

</style>