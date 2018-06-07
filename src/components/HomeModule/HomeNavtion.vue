<template>
    <!-- 首页 导航 -->
    <div class="HomeNavtion">
        <el-menu @select="handleSelect" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
            <el-menu-item v-for="item in navList" :key="item.id" :index="item.id"><i :class="item.icon"></i>{{item.name}}</el-menu-item>
        </el-menu>
    
    </div>
</template>

<script>
    export default {
        name:'HomeNavtion',
        data() {
            return {
                key: '123123213',
                loading:true,
                navList:[],
                activeIndex: '1',
            }
        },
        mounted(){
            this.navGation();
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            navGation(){//导航接口
                var _this = this
                this.$ajax.post('https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/navGation',{
                })
                .then(data => {
                    if(data.data.success === '200'){
                        _this.loading = true
                    }else{
                        _this.loading = false
                        _this.navList = data.data.data.nav
                    }
                })
                .catch((error)=>{
                    console.log(error)
                })
            },
        },
        
    }
</script>

<style scoped>
    .el-menu-demo{
        margin:0 10px;
        border-radius: 5px;
        background: #ffffffe0;
    }
</style>