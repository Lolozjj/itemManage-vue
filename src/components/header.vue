<template>
  <div class="box">
    <el-row>
      <el-col :span="14">
        <div >
          <span class="logo">题库管理系统</span>
        </div>
      </el-col>
      <el-col :span="1">
        <span class="search">全站搜</span>
      </el-col>
      <el-col :span="4">
        <el-input class="search-input" size="">你好</el-input>
      </el-col>
      <el-col :span="1">
        <span>&nbsp;</span>
      </el-col>
      <el-col :span="1">
        <i class="el-icon-message-solid icon-size"></i>
      </el-col>
      <el-col :span="2">
        <el-avatar
          class="search-input"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <span>{{userInfo.name}}</span>
        <el-dropdown>
          <i class="el-icon-caret-bottom choose"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="1">
        <i class="el-icon-switch-button logout" @click="Logout"></i>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { logout } from "../utils/server.js";
export default {
  name: "header",
  data() {
    return {
      userInfo: ""
    };
  },
  methods: {
    Logout() {
      var that = this;
      logout(function(msg) {
        if (msg.succeed) {
          localStorage.removeItem("userInfo");
          that.$router.push({ path: "Login" });
        } else {
          that.$message({
            type: "error",
            message: msg.error
          });
        }
      });
    }
  },
  created() {
    var that = this;
    that.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (that.userInfo == null) {
      const loading = that.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      setTimeout(() => {
        loading.close();
        that.$router.push({ path: "Login" });
      }, 20);
    }
  }
};
</script>
<style scoped>
.box {
  height: 60px;
  background: #666666;
}
.logo {
  font-size: 28px;
  line-height: 60px;
  color: rgb(124, 160, 161);
  margin-left: 40px;
  text-align: center;
}
.search {
  line-height: 60px;
  color: #999999;
}
.search-input {
  margin: 10px 0 0 0;
}
.icon-size {
  font-size: 25px;
  margin: 20px 0 0 0;
  color: #7c7878;
  cursor: pointer;
}
.icon-size:hover{
  color: #ffc53d;
}
.choose {
  color: #313030;
}
.choose:hover {
  color: #000;
}
.logout {
  font-size: 40px;
  color: rgb(240, 121, 121);
  margin: 10px 0 0 5px;
  cursor: pointer;
}
.logout:hover {
  color: rgb(214, 73, 73);
}
</style>