<template>
    <div class="HomeEditVip">
        <header>
            <div class="HR_tittle">VIP推荐</div>
        </header>
        <article>
            <ul>
                <li v-for="a in editContent" :key="a.id">
                    <img :src="a.img" alt="">
                    <div class="vip-left">
                        <h4>{{a.tittle}}</h4>
                        <p class="vip-num">{{a.num}}<span>人在追</span></p>
                        <p>{{a.content}}</p>
                    </div>
                    <div>
                        <el-button type="primary">查看详情</el-button>
                    </div>
                </li>
            </ul>
        </article>
        <footer></footer>
    </div>
</template>

<script>
    export default {
        name:'HomeEditVip',
        data() {
            return {
                editContent:[
                    {'id':1,'tittle':'李大魔头从异界回来了','num':'32,049','content':'异界回归的李大魔头，反封建迷信协会成员，兼职斩妖除魔，专治各种不服。','img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528972869196&di=291596083f82624403494f8ce6ed9275&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01c2e4596f6714a8012193a309c64c.jpg%401280w_1l_2o_100sh.png'},
                    {'id':2,'tittle':'猎杀马蜂王，取得基于碎片','num':'34,851','content':'未来星际时代，地球生物基因变异，漫山遍野的巨型变异生物开始围攻人类','img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528974121697&di=45a4c3bdd3d9e7fab45663e56c5d1d1c&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F17%2F43%2F89%2F54j58PICD7a_1024.jpg'},
                    {'id':3,'tittle':'为了活命奋战游戏','num':'209,077','content':'一款不受任何保护的地下游戏，一群追逐权利、财富、生命的玩家！','img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528974208936&di=80df6f48194d2b2eb78c656aeaff74a6&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fwh%253D450%252C600%2Fsign%3D8b10e8c6087b02080c9c37e557e9dee5%2F80cb39dbb6fd52663500fc77a918972bd40736ae.jpg'},
                    {'id':4,'tittle':'第九道则，鸿蒙至尊','num':'72,223','content':'得宇宙第九道则，破开鸿蒙，成就无上强者！','img':'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1528974121695&di=d823f11aebe38033c0871042112bfadd&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201605%2F14%2F20160514115117_NVnye.thumb.700_0.jpeg'},
                    {'id':5,'tittle':'开局一个宾馆3个员工','num':'46,821','content':'苏阳无意之间得到超级城市制造商APP，然后发现自己的人生变的跟游戏一样。','img':'https://timgsa.baidu.com/timg?image&quality=80&size=b10000_10000&sec=1528964074&di=79eb5317c17a420f86502c2ad9d72567&src=http://img05.tooopen.com/images/20140709/sy_65458643222.jpg'},
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
    .HR_tittle{
        font-size: 16px;
        color: #170002;
        font-weight: 600;
        padding-left: 12px;
        border-left: 3px solid #f10;
        line-height: 24px;
    }
    .HomeEditVip{
        padding-left: 10px;
        margin-left: 30px;
        border-left: 1px solid #ddd;
        width: 755px;
       ul{
           width: 100%;
           height: 570px;
        li{
            display: flex;
            padding-top: 14px;
            align-items:center;
            -webkit-justify-content:center;
            justify-content:center;
            img{
                width: 100px;
                height: 100px;
                border-radius: 6px;
            }
            .vip-left{
                width:100%;
                align-items:center;
                flex: 2;
                padding-left:20px;
                h4{
                    color: #c93227;
                }
                .vip-num{
                    font-size: 16px;
                    font-weight: 700;
                    color: #bf2c24;
                    line-height: 40px;
                    span{
                        font-size: 12px;
                        color: #bf2c24
                    }
                }
                p{
                    font-family: Yuanti SC;
                    font-size: 14px;
                    line-height: 20px;
                    color: #818181;
                    text-align: justify;
                }
            }
        }
       }
    }
</style>