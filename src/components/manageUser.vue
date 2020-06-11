<template>
  <div class="table">
    <div>
      <div class="serach-inputs">
        <el-row  :gutter="20">
          <el-col :span="3">
            <el-input size="mini" clearable placeholder="输入编号，添加无效" v-model="searchData.id"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input size="mini" clearable placeholder="输入姓名" v-model="searchData.name"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input size="mini" clearable placeholder="输入年龄" v-model="searchData.age"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input size="mini" clearable placeholder="输入身份" v-model="searchData.title"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input size="mini" clearable placeholder="输入手机" v-model="searchData.phone"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input size="mini" clearable placeholder="输入密码" v-model="searchData.password"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input
              size="mini"
              clearable
              placeholder="输入时间，添加无效"
              v-model="searchData.create_time"
            ></el-input>
          </el-col>
          <el-col :span="3" style="margin:20px 0 0 0px">
            <el-button size="mini" @click="Search">搜索</el-button>
            <el-button size="mini" @click="Add">添加</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table
        :data="showData"
        class="tb-edit"
        style="width: 100%"
        height="570px"
        highlight-current-row
        @row-click="handleCurrentChange"
      >
        <el-table-column label="编号" sortable prop="id">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="姓名" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" sortable>
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="scope.row.age"
              placeholder="请输入内容"
              @change="handleEdit(scope.$index, scope.row)"
            ></el-input>
            <span>{{scope.row.age}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="身份" label="身份" sortable>
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="scope.row.title"
              placeholder="请输入内容"
              @change="handleEdit(scope.$index, scope.row)"
            ></el-input>
            <span>{{scope.row.title}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="手机" label="手机" sortable>
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="scope.row.phone"
              placeholder="请输入内容"
              @change="handleEdit(scope.$index, scope.row)"
            ></el-input>
            <span>{{scope.row.phone}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="密码" label="密码" sortable>
          <template slot-scope="scope">
            <el-input
              size="small"
              v-model="scope.row.password"
              placeholder="请输入内容"
              @change="handleEdit(scope.$index, scope.row)"
            ></el-input>
            <span>{{scope.row.password}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="创建时间" label="创建时间" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.create_time}}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="small" type="success" @click="handleLook(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {
  getUsers,
  getUsersByExample,
  register,
  deleteUser,
  modifUser
} from "../utils/server.js";
import { shiroCheck } from "../utils/shiro.js";
export default {
  name: "manageUser",
  data() {
    return {
      userData: [],
      showData: [],
      searchData: []
    };
  },
  methods: {
    handleDelete(index, row) {
      var that = this;
      that
        .$confirm("点击确认后该用户信息将被永久删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          deleteUser(row.id, function(msg) {
            if (msg.succeed) {
              that.$message({
                type: "success",
                message: "删除成功"
              });
            } else {
              shiroCheck(msg, that);
            }
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(index, row) {
      var that = this;
      console.log(row);
      modifUser(
        row.id,
        row.name,
        row.age,
        row.title,
        row.phone,
        row.password,
        function(msg) {
          if (msg.succeed) {
            that.$message({
              type: "success",
              message: "修改成功!"
            });
          } else {
            shiroCheck(msg, that);
          }
        }
      );
    },
    handleLook(index, row) {
      this.$router.push({
        path: "/AdminChoose",
        query: { userId: row.id, name: row.name }
      });
    },
    Search() {
      var that = this;
      getUsersByExample(
        that.searchData.id,
        that.searchData.name,
        that.searchData.age,
        that.searchData.title,
        that.searchData.phone,
        that.searchData.password,
        that.searchData.create_time,
        function(msg) {
          if (msg.succeed) {
            that.showData = msg.data;
          } else {
            shiroCheck(msg, that);
          }
        }
      );
    },
    Add() {
      var that = this;
      register(
        that.searchData.name,
        that.searchData.age,
        that.searchData.title,
        that.searchData.phone,
        that.searchData.password,
        function(msg) {
          if (msg.succeed) {
            that.$message({
              type: "success",
              message: "添加成功!"
            });
          } else {
            shiroCheck(msg, that);
          }
        }
      );
    }
  },
  created() {
    var that = this;
    getUsers(function(msg) {
      if (msg.succeed) {
        that.userData = msg.data;
        that.showData = msg.data;
      } else {
        shiroCheck(msg, that);
      }
    });
  }
};
</script>
<style scoped>
.table {
  margin: 20px 20px 20px 20px;
  /* width: 500px; */
}
.tableStyle {
  background-color: #1989fa !important;
  color: #fff;
  font-weight: 400;
}
.tb-edit .el-input {
  display: none;
}
.tb-edit .current-row .el-input {
  display: block;
}
.tb-edit .current-row .el-input + span {
  display: none;
}
.serach-inputs .el-input {
  margin: 20px 0 0 0 ;
  width: 150px;
}
</style>