<template>
  <div class="table">
    
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
      <el-table-column label="课程名" sortable>
        <template slot-scope="scope">
          <el-input
            size="small"
            v-model="scope.row.name"
            placeholder="请输入内容"
            @change="handleEdit(scope.$index, scope.row)"
          ></el-input>
          <span>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hour" label="课时" sortable>
        <template slot-scope="scope">
          <el-input
            size="small"
            v-model="scope.row.hour"
            placeholder="请输入内容"
            @change="handleEdit(scope.$index, scope.row)"
          ></el-input>
          <span>{{scope.row.hour}}</span>
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
</template>
<script>
import {
  getCourseByUser,
  deleteCourse,
  addCourse,
  modifCourse
} from "../utils/server.js";
import { shiroCheck } from "../utils/shiro.js";
export default {
  name: "teacherCourse",
  data() {
    return {
      courseData: [
        {
          id: 1,
          name: "Java",
          hour: 40
        },
        {
          id: 2,
          name: "C++",
          hour: 70
        },
        {
          id: 3,
          name: "Python",
          hour: 55
        }
      ],
      showData: [],
      searchData: []
    };
  },
  methods: {
    handleDelete(index, row) {
      var that = this;
      that
        .$confirm("点击确认后该课程信息将被永久删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          deleteCourse(that.showData[index].id, function(msg) {
            if (msg.succeed) {
              this.$message({
                type: "success",
                message: "删除成功"
              });
            } else {
              shiroCheck(msg, that);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleLook(index, row) {
      this.$router.push({
        path: "/AdminChapter",
        query: { courseId: row.id, name: row.name }
      });
    },
    handleEdit(index, row) {
      var that = this;
      modifCourse(
        this.showData[index].id,
        this.showData[index].name,
        this.showData[index].hour,
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
    Search() {
      var that = this;
      getCourse(
        that.searchData.id,
        that.searchData.name,
        that.searchData.hour,
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
      addCourse(that.searchData.name, that.searchData.hour, function(msg) {
        if (msg.succeed) {
          that.$message({
            type: "success",
            message: "添加成功!"
          });
        } else {
          shiroCheck(msg, that);
        }
      });
    }
  },
  created() {
    var that = this;
    getCourseByUser(JSON.parse(localStorage.getItem("userInfo")).id, function(msg) {
      if (msg.succeed) {
        that.getCourse = msg.data;
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
  width: 150px;
   margin: 20px 0 0 0 ;
}
</style>