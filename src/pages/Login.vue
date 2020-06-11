<template>
  <div class="box">
    <div class="container">
      <div class="head-img">题库管理系统</div>
      <div class="main">
        <el-row :gutter="6" class="line">
          <el-col :span="6" class="des">用户名：</el-col>
          <el-col :span="12" class="input">
            <el-input size="small" v-model="name" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="6" class="line">
          <el-col :span="6" class="des">密码：</el-col>
          <el-col :span="12" class="input">
            <el-input size="small" v-model="pw" show-password placeholder="请输入密码"></el-input>
          </el-col>
        </el-row>
      </div>
      <div class="bt-login">
        <el-button size="medium" @click="Login">登陆</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { login } from "../utils/server.js";
export default {
  name: "Login",
  data() {
    return {
      name: "",
      pw: "",
      radio: "teacher"
    };
  },
  methods: {
    Login: function() {
      var that = this;
      login(this.name, this.pw, function(msg) {
        if (msg.succeed) {
          localStorage.setItem("userInfo", JSON.stringify(msg.data));
          var title = msg.data.title;
          console.log(title);
          if (title == "管理员") {
            that.$router.push({ path: "AdminUser" });
          }
          if (title == "教师") {
            that.$router.push({ path: "TeacherCourse" });
          }
          if (title == "学生") {
            that.$router.push({ path: "Student" });
          }
        } else {
          alert(msg.error);
        }
      });
    }
  }
};
</script>
<style scoped>
.box {
  width: 100%;
  height: 100%;
  background-size: cover;
  /* background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591768578153&di=4a5585aff21b8d694dc66f5b6c815639&imgtype=0&src=http%3A%2F%2F00.minipic.eastday.com%2F20160417%2F20160417090935_cc9ce2f9530fe649f4d420c017a7bf1f_2.jpeg") no-repeat 4px 5px; */
  /* background: #CCCCCC(185, 181, 181); */
  background-repeat: no-repeat;
  position: absolute; /*设置个absolute就可以全屏了*/
}
.container {
  margin: 100px auto;
  width: 400px;
  height: 300px;
  background: white;
  border-radius: 10px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.head-img {
  margin: 10px auto;
  width: 100%;
  height: 50px;
  text-align: center;
  font-size: 30px;
  color: rgb(137, 137, 212);
  vertical-align: middle;
  line-height: 50px;
  /* background: red; */
}
.main {
  margin: 20px 0 0 60px;
}
.line {
  margin: 20px 0 0 60px;
}
.des {
  line-height: 30px;
}
.radio {
  margin: 30px 0 0 80px;
}
.bt-login {
  margin: 20px 0 0 260px;
}
</style>