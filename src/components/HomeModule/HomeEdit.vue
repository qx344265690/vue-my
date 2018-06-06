<template>
    <div class="HomeEdit">
        <div><h5 style="color:#bf2c24">编辑推荐:</h5></div>
        <div>
            <template>
                <el-carousel :interval="4000" type="card" height="150px" :initial-index = "1" @change="haha">
                    <el-carousel-item v-for="item in editList" :key="item.id">
                        <img :src="item.img" alt="">
                    </el-carousel-item>
                </el-carousel>
            </template>
        </div>
        <div class="HomeEdit_tittle">
            <p>{{synchronization.tittle}}</p>
            <p>作者：{{synchronization.name}}</p>
            <p>内容：{{synchronization.content}}</p>
            <!-- <a href="#" class="eidt_button">书籍详情</a> -->
            <el-button type="danger" round>书籍详情</el-button>
        </div>
        <div class="HomeEdit_content">
           <ul>
               <li v-for="a in editContent" :key="a.id">
                   <p v-text="a.tittle"></p>
                   <p><span v-text="a.num"></span>人在追</p>
                   <p v-text="a.content">异界回归的李大魔头，反封建迷信协会成员，兼职斩妖除魔，专治各种不服。</p>
                   <el-button type="primary">主要按钮</el-button>
               </li>
           </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:'HomeEdit',
        data() {
            return {
                editList: [{tittle:'',name:'',content:''},{tittle:'',name:'',content:''},{tittle:'',name:'',content:''},{tittle:'',name:'',content:''},{tittle:'',name:'',content:''},{tittle:'',name:'',content:''},],
                numsaa:1,
                editContent:[
                    {'id':1,'tittle':'李大魔头从异界回来了','num':'32,049','content':'异界回归的李大魔头，反封建迷信协会成员，兼职斩妖除魔，专治各种不服。'},
                    {'id':2,'tittle':'猎杀马蜂王，取得基于碎片','num':'34,851','content':'未来星际时代，地球生物基因变异，漫山遍野的巨型变异生物开始围攻人类'},
                    {'id':3,'tittle':'为了活命奋战游戏','num':'209,077','content':'一款不受任何保护的地下游戏，一群追逐权利、财富、生命的玩家！'},
                    {'id':4,'tittle':'第九道则，鸿蒙至尊','num':'72,223','content':'得宇宙第九道则，破开鸿蒙，成就无上强者！'},
                    {'id':5,'tittle':'开局一个宾馆3个员工','num':'46,821','content':'苏阳无意之间得到超级城市制造商APP，然后发现自己的人生变的跟游戏一样。'},
                    {'id':6,'tittle':'君子风范，肝胆相照','num':'40,004','content':'身在其中，扶风而起，诗与刀，朝堂与江湖。'},
                ]
            }
        },
        components:{
        },
        computed:{
            synchronization:function(){
                return this.editList[this.numsaa]
            }
        },
        mounted(){
            this.editImgs();
        },
        methods: {
            editImgs() {
                this.$ajax.post('https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/edit',function(){
                })
                .then(data => {
                    let a = data.data.data.imgs
                    this.editList = a
                })
                .catch(error => {
                    cosnole.log(error)
                })
            },
            haha(index){
                this.numsaa = index
            }
        },
    }
</script>

<style scoped lang="scss">
    .HomeEdit{
        width: 755px;
        height: 207px;
        div:nth-child(1){
            color: #18d360;
            font-size: 16px;
            font-weight: 800;
            line-height: 28px;
            margin-left: 20px;
        }
        div:nth-child(2){
            width: 350px;
            height: 200px;
            float: left;
            margin-left: 20px;
            border-bottom: 1px solid #e4dbda;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .HomeEdit_tittle{
            width: 356px;
            height: 200px;
            float: left;
            padding-left: 28px;
            border-bottom: 1px solid #e4dbda;
            p:nth-child(1){
                line-height: 30px;
                font-size: 16px;
                padding-left: 10px;
                padding-top: 10px;
            }
            p:nth-child(2){
                font-size: 14px;
                padding: 4px 0;
                padding-left: 10px;
            }
            p:nth-child(3){
                font-size: 14px;
                padding: 10px;
                line-height: 20px;
                height: 40px;
                color: #666363
            }
            .eidt_button{
                font-size: 12px;
                color: #fff;
                background: #bf2c24;
                border: 1px solid #bf2c24;
                border-radius: 5px;
                display: block;
                width: 98px;
                text-align: center;
                line-height: 36px;
                margin-left: 10px;
            }
        }
    }
    .HomeEdit_content{
        width: 100%;
        height: 100%;
    }
    .HomeEdit_content ul{
        width: 98%;
        height: 100%;
        margin-left: 2%;
        li{
            width: 215px;
            float: left;
            height: 160px;
            border-bottom: 1px solid #e4dbda;
            margin-top: 16px;
            padding-left: 30px;
            .el-button{
                margin-top: 2px;
                line-height: 6px;
            }
            p:nth-child(1){
                font-size: 16px;
            }
            p:nth-child(2){
                span{
                    font-size: 16px;
                    font-weight: 700;
                }
                font-size: 12px;
                color: #bf2c24;
                padding: 12px 0;
            }
            p:nth-child(3){
                font-family: Yuanti SC;
                font-size: 14px;
                line-height: 20px;
                color: #818181;
                text-align: justify;
                height: 60px;
            }
        }
    }
    
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
    }
    
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>