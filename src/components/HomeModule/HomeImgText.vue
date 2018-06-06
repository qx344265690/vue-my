<template>
    <div class="ImgText">
         <!-- 图文推荐 ImageText -->
        <div class="HP_ImageText" v-loading="loading">
            <span class="HP_Headlines_top">新书推荐</span>
            <el-row style="margin-top:12px;"  >
            <el-col :span="3"  v-for="(a, index) in imageTextList" :key="index" style="margin-left:3.4%;min-width:180px;">
                <el-card>
                <img :src="a.img" class="image">
                <div style="padding: 14px;">
                    <span class="HP_ImageText_tittle">{{a.tittle}}</span>
                    <div class="bottom clearfix">
                    <time class="time">作者:{{ a.name }}</time>
                    </div>
                    <el-button type="text" class="button" @click="luckList(index)">查看</el-button>
                </div>
                </el-card>
            </el-col>
            </el-row>
        </div>

        <el-dialog
        :title="dialogList.tittle"
        :visible.sync="dialogVisible"
        width="30%"
        >
        <div v-loading="loading">
            <img style="width:100%; height:240px;" :src="dialogList.img"  alt="" >
            <div>作者：{{dialogList.name}}</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name:'ImgText',
        data() {
            return {
                imageTextList:[],
                loading:false,
                dialogList:{},
                dialogVisible: false,
            }
        },
        mounted(){
            this.imageText();
        },
        methods: {
            imageText(){//新书推荐接口
                var _this = this
                this.$ajax.post('https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/imageText',{
                })
                .then(data => {
                    _this.imageTextList = data.data.data.imageText
                })
                .catch((error)=>{
                    console.log(error)
                })
            },
            luckList(a){
                this.dialogList = this.imageTextList[a];
                this.dialogVisible = true;
            },
        },
    }
</script>

<style scoped lang="scss">
 .HP_ImageText{
    border-top: 1px solid #ddd;
    background:#9195f005;
    margin-top: 13px;
    padding-bottom: 18px;
    position: relative;
  }
  .HP_Headlines_top{
    position: absolute;
    left:20px;
    top: 20px;
    width: 16px;
    font-size: 16px;
    color: #fff;
    font-weight: 800;
  }
  .time {
    font-size: 13px;
    color: #999;
    line-height: 20px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: right;
  }
  .image {
    width: 100%;
    height: 150px;
    display: block;
  }
  .HP_ImageText_tittle{
    font-size: 14px;
    color: #5b9ade;
  }
  .el-dialog__body{
  }
</style>