<template>
  <div class="HomePage">
    <el-dialog
      title="登录"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="40px" class="demo-ruleForm">
          <el-form-item label="账号" prop="pass">
            <el-input type="text" v-model="ruleForm2.pass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>
    <!-- LOGO 登录 搜索 -->
    <div class="sky">
      <div class="clouds_one"></div>
      <div class="clouds_two"></div>
      <div class="clouds_three"></div>
    
    <div class="HP_top">
      <span class="HP_top_logo"><i class="iconfont  icon-xiaoshuo" style="font-size:12px"></i>Q<span>I</span>X</span>
      <div class="HP_top_content">
         <el-input v-model="input" placeholder="请输入搜索内容"></el-input>
      </div>
      <div class="HP_top_right">
        <span class="HP_top_right_span">
          <el-upload
            class="avatar-uploader"
            action="https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/logoImg"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </span>

        <span v-if="showName" class="showRigth">
          <span><a href="#"><el-button type="text" @click="dialogVisible = true">登录</el-button></a></span>
          <span><a href="#">注销</a></span>
        </span>
        
        <span v-else class="showRigth">
            <span>名字</span>
        </span>
      </div>
    </div>
    
    <!-- 导航 -->
      <Navigation/>
    
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
        <Broadcast/>
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
    </div>
    <!-- 图文推荐 ImageText -->
    <ImgText/>
    <!-- 编辑推荐 -->
    <Edit/>
    <router-view/>
     <!-- <el-button type="primary"  @click="Jump()">主要按钮</el-button> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import Broadcast from "./HomeModule/HomeBroadcast"; //轮播图
import Navigation from "./HomeModule/HomeNavtion"; //导航
import ImgText from "./HomeModule/HomeImgText"; //图文推荐
import Edit from "./HomeModule/HomeEdit"; //编辑推荐
export default {
  name: "HomePage",
  data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
    return {
      msg: "小说达人",
      activeNames: [1],
      input: "",
      dataImg: [],
      navList: [],
      recommendedList: [],
      activityList: [],
      dialogList: {}, //拼接的信息
      loading: false,
      dialogVisible: false,
      imageUrl: "../../static/imgs/logo.png", //头像
      showName: true,
      currentDate: new Date(),
      ruleForm2: {
          pass: '',
          checkPass: '',
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
    };
  },
  components: {
    Broadcast,
    Navigation,
    ImgText,
    Edit
  },
  computed: {
    ...mapState({
      show: state => state.dialog.show
    })
  },
  mounted() {
    //在钩子函数中执行会报错layui找不到
    this.recommended();
    this.activity();
  },
  methods: {
    submitForm(formName) {//登录提交
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false



        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    Jump() {
      this.$router.push({ path: "index" });
      this.$store.dispatch("switch_dialog");
    },
    handleChange(val) {},
    recommended() {
      //左侧推荐区域
      var _this = this;
      this.$ajax
        .post(
          "https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/recommended",
          {}
        )
        .then(data => {
          _this.recommendedList = data.data.data.recommended;
        })
        .catch(error => {
          console.log(error);
        });
    },
    activity() {
      //活动接口
      var _this = this;
      this.$ajax
        .post(
          "https://www.easy-mock.com/mock/5b04d18cbb01b16a357c3a2d/qixin/activity",
          {}
        )
        .then(data => {
          _this.activityList = data.data.data.activity;
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style scoped lang="scss">
.HomePage_tittle {
  line-height: 60px;
  margin-left: 24px;
  color: #f10;
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
.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.HP_content {
  display: flex;
  margin-top: 10px;
  .HP_content_left {
    float: left;
    width: 300px;
    padding: 0 18px;
    z-index: 666;
    margin-bottom: 25px;
  }
  .HP_content_middle {
    flex: 1;
    min-width: 200px;
    margin: 20px 10px;
  }
  .HP_content_right {
    float: right;
    width: 300px;
    height: 200px;
    margin: 0 18px;
    z-index: 666;
    .el-card__body{
      background: #f10;
    }
  }
}
.HP_top {
  display: flex;
  padding: 10px;
  .HP_top_logo {
    font-size: 30px;
    font-weight: 800;
    color: #89f48a;
    display: inline-block;
    line-height: 40px;
    padding-left: 20px;
    width: 240px;
    span {
      color: #f10;
    }
  }
  .HP_top_content {
    width: 300px;
    flex:1;
    padding-left: 17%;
    .el-input{
      width: 450px
    }
  }
  .HP_top_right {
    padding-right: 20px;
    span {
      display: inline-block;
      font-size: 14px;
      color: #b7b2b2;
      margin-right: 10px;
      i {
        width: 30px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
      }
    }
    .HP_top_right_span {
      border: 1px dashed #49d0de;
      display: inline-block;
      border-radius: 50%;
      text-align: center;
      width: 40px;
      height: 40px;
      img {
        border: none;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
}
.HP_Headlines {
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

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
  border: 1px solid #f10;
}
.showRigth {
  float: right;
}
</style>
