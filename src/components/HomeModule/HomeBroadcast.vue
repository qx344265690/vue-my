<template>
    <!-- 首页 轮播图 -->
    <div class="homeBroadcast">
        <el-carousel :interval="4000" type="card" height="222px" v-loading="loading">
            <el-carousel-item v-for="item in dataImg" :key="item.id">
                <img class="dataImgs" :src="item.img" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name:'homeBroadcast',
        data() {
            return {
                dataImg: [],
                loading:false,
            }
        },
        mounted(){
            this.ObtainImgs();
        },
        methods: {
            ObtainImgs(){//图片接口
                var _this = this
                axios.post('https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/imgs', {
                    })
                .then(function (data) {
                    if(data.data.success === '200'){
                        _this.loading = true
                    }else{
                        _this.loading = false
                        _this.dataImg = data.data.data.imgs
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
        },
    }
</script>

<style scoped lang="scss">
 .dataImgs{
    width: 100%;
    height: 100%;
  }
</style>