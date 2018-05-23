<template>
  <div class="HomePage">
    <!-- LOGO 登录 搜索 -->
    <div class="HP_top">
      <span class="HP_top_logo">Q<span>I</span>X</span>
      <div class="HP_top_content">
         <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
      </div>
      <div class="HP_top_right">
        <span>头像</span>
        <span>登录</span>
        <span>注销</span>
      </div>
    </div>
    <!-- 导航 -->
    <el-menu style="margin:0 10px;"  :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item v-for="item in navList" :key="item.id" :index="item.id"><i :class="item.icon"></i>{{item.name}}</el-menu-item>
    </el-menu>
    
    <!-- 在整个内容区域 -->
    <div class="HP_content">
      <!-- 内容左侧(推荐区域) -->
      <div class="HP_content_left" v-loading="loading">
        <div class="HP_Headlines">本周强推荐:</div>
        <el-collapse v-model="activeNames" accordion @change="handleChange">
          <el-collapse-item v-for="item in recommendedList" :key="item.id" :name="item.id">
              <template slot="title">
                {{item.name}}<i :class="item.icon" style="margin-left:10px;"></i>
              </template>
              <div>{{item.text}}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
      
      <!-- 轮播图 -->
      <div class="HP_content_middle">
        <el-carousel :interval="4000" type="card" height="222px" v-loading="loading">
          <el-carousel-item v-for="item in dataImg" :key="item.id">
            <img class="dataImgs" :src="item.img" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- 内容右侧(活动区域) -->
      <div class="HP_content_right">
        <div class="HP_Headlines">征文活动:</div>
        <el-card class="box-card">
          <div v-for="item in activityList" :key="item.id" class="text item">
            {{item.name}}
          </div>
        </el-card>
      </div>
    </div>

    <!-- 图文推荐 ImageText -->
    <div class="HP_ImageText" v-loading="loading">
        <span class="HP_Headlines_top">新书推荐</span>
        <el-row style="margin-top:12px;"  >
          <el-col :span="3" v-for="(a, index) in imageTextList" :key="index" style="margin-left:3.4%;">
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
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      >
      <div v-loading="loading">

      
      <img style="width:100%; height:240px;" :src="dialogList.img"  alt="" >
      <div>{{dialogList.tittle}}</div>
      <span>{{dialogList.name}}</span>
      <!-- <img :src="" alt=""> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
      </div>
    </el-dialog>

    <div class="">

    </div>
    <router-view/>
     <!-- <el-button type="primary"  @click="Jump()">主要按钮</el-button> -->
  </div>
</template>

<script>
import {mapState} from 'vuex';
import axios from 'axios'
export default {
  name: 'HomePage',
  data () {
    return {
      msg: '小说达人',
      activeIndex: '1',
      activeNames: [1],
      input:'',
      dataImg:[],
      navList:[],
      recommendedList:[],
      activityList:[],
      imageTextList:[],
      dialogList:{},//拼接的信息
      loading:true,
      dialogVisible: false,
      currentDate: new Date()
    }
  },
  computed:{
    ...mapState({
      show:state => state.dialog.show
    })
  },
  mounted(){//在钩子函数中执行会报错layui找不到
    this.ObtainImgs();
    this.navGation();
    this.recommended();
    this.activity();
    this.imageText();
  },
  methods: {
    Jump() {
      this.$router.push({path:'index'})
      this.$store.dispatch('switch_dialog')
      console.log(this.show)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleChange(val) {
      console.log(val);
    },
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
    navGation(){//导航接口
      var _this = this
      axios.post('https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/navGation',{
      })
      .then(data => {
        _this.navList = data.data.data.nav
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    recommended(){//左侧推荐区域
      var _this = this
      axios.post('https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/recommended',{
      })
      .then(data => {
        _this.recommendedList = data.data.data.recommended
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    activity(){//活动接口
      var _this = this
      axios.post('https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/activity',{
      })
      .then(data => {
        _this.activityList = data.data.data.activity
      })
      .catch((error)=>{
        console.log(error)
      })
    },
    imageText(){//新书推荐接口
      var _this = this
      axios.post('https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/imageText',{
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
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  },
}
</script>

<style scoped lang="scss">
  .HomePage_tittle{
    line-height: 60px;
    margin-left:24px;
    color:#f10;
    font-weight: 700;
    font-size: 30px;
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
  .dataImgs{
    width: 100%;
    height: 100%;
  }
  .HP_content{
    display: flex;
    margin-top: 10px;
    .HP_content_left{
      float: left;
      width: 300px;
      // border:1px solid #f10
      padding:0 18px;
    }
    .HP_content_middle{
      flex: 1;
      min-width: 200px;
      margin: 20px 10px;
    }
    .HP_content_right{
      float: right;
      width: 300px;
      height: 200px;
      margin: 0 18px;
    }
  }

  .HP_top{
    display: flex;
    padding: 10px;
    .HP_top_logo{
      font-size: 30px;
      font-weight: 800;
      color: #89f48a;
      display: inline-block;
      line-height: 40px;
      padding-left: 20px;
      span{
        color: #f10;
      }
    }
    .HP_top_content{
      width: 300px;
      margin: 0 auto;
    }
    .HP_top_right{
      padding-right: 20px;
      span{
        line-height: 40px; 
        font-size: 14px;
        margin: 0 4px;
        color: #b7b2b2;
      }
      span:nth-child(1){
        border:1px dashed #49d0de;
        display: inline-block;
        border-radius: 50%;
        width: 40px;
        text-align: center;
      }
    }
  }
  .HP_Headlines{
    color: #18d360;
    font-size: 16px;
    font-weight: 800;
    line-height: 40px;
  }
  
  .text {
    font-size: 14px;
  }
  .item {
    padding: 10px 0;
  }
  .box-card {
    width: 300px;
  }
  .HP_ImageText{
    border-top: 1px solid #ddd;
    background:#e6cf3e85;
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

  
</style>
