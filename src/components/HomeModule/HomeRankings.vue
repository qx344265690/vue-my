<template>
    <div class="homeRankings">
        <span class="HR_tittle">排行榜</span>
        <div id="HR_nav_box">
            <ul id="HR_nav">
                <li class="HR_nav_isactive">热销榜</li>
                <li>风云榜</li>
                <li>签约榜</li>
                <li>推荐榜</li>
            </ul>
            <div>
                <ul class="HR_ul">
                    <li v-for="a in rankings" :key="a.id">
                        <img :src="a.img" alt="">
                        <span>{{a.tittle}}</span>
                    </li>
                </ul>
            </div>
            <div style="display:none">
                <ul class="HR_ul">
                    <li v-for="a in rankingsTwo" :key="a.id">
                        <img :src="a.img" alt="">
                        <span>{{a.tittle}}</span>
                    </li>
                </ul>
            </div>
            <div style="display:none">
                <ul class="HR_ul">
                    <li v-for="a in rankings" :key="a.id">
                        <img :src="a.img" alt="">
                        <span>{{a.tittle}}</span>
                    </li>
                </ul>
            </div>
            <div style="display:none">
                <ul class="HR_ul">
                    <li v-for="a in rankingsTwo" :key="a.id">
                        <img :src="a.img" alt="">
                        <span>{{a.tittle}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name:'homeRankings',
        data() {
            return {
                key: 12,
                activeName2: 'first',
                rankings:[],
                rankingsTwo:[],
            }
        },
        mounted(){
            this.renkingsList()
            this.box()
        },
        methods: {
             handleClick(tab, event) {
                console.log(tab, event);
            },
            box(){
                var Box = document.getElementById('HR_nav_box')
                var aBox = document.getElementById('HR_nav')
                var aBtn = aBox.getElementsByTagName('li')
                var aDiv = Box.getElementsByTagName('div')
                for(var i = 0; i < aBtn.length ;i++){
                    aBtn[i].index = i;
                    aBtn[i].onclick = function(){
                        for(var k=0;k<aBtn.length;k++){//先清空所有的样式
                            aBtn[k].className ='';
                            aDiv[k].style.display ='none';
                        }
                        this.className ='HR_nav_isactive';
                        // console.log(this.index)
                        aDiv[this.index].style.display ='block';
                    }
                }
            },
            renkingsList(){
                var _this = this
                this.$ajax.post('https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/rankings',function(){

                })
                .then(res => {
                    var a = res.data.data.imageText
                    var b = res.data.data.twoImg
                    _this.rankings = a
                    _this.rankingsTwo = b
                })
                .catch(error => {
                    console.log(res)
                })
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
        margin-left: 20px;
        border-left: 3px solid #f10;
        line-height: 24px;
    }
    .homeRankings{
        border-top: 10px solid #eee5e569;
        padding-top: 10px;
    }
    #HR_nav{
        width: 60%;
        height: 42px;
        line-height: 40px;
        margin: auto;
        li{
            float: left;
            width: 24%;
            text-align: center;
            border: 1px solid #e8e8e8;
        }
        li:nth-child(1){
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        li:nth-child(2){
            border-left: none;
            border-right: none;
        }
        li:nth-child(3){
            border-right: none;
        }
        li:nth-child(4){
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
    .HR_nav_isactive{
        background: #b53930;
        color: #fff;
    }
    #HR_nav_box{
        width: 100%;
        div{
            height: 212px;
            border-bottom: 10px solid #eee5e569;
        }
    }
    .HR_ul{
        li{
            float: left;
            margin: 20px 0 0 36px;
            width: 120px;
            text-align: center;
            img{
                width: 120px;
                height: 146px;
            }
            span{
                display: block;
                margin-top: 10px;
            }
        }
    }
</style>