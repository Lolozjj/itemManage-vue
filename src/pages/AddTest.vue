<template>
  <div class="box" style="height:100%">
    <item-header></item-header>
    <el-row style="height:90%">
      <el-col :span="4" style="height:100%">
        
        <div v-if="userInfo.title=='管理员'" style="height:100%">
          <item-left></item-left>
        </div>
        <div v-else style="height:100%">
          <item-teacher></item-teacher>
        </div>
      </el-col>
      <el-col :span="20" style="height:100%;background: gainsboro;">
        <div class="page">
          <div class="header">
            <span>选择课程:&nbsp;&nbsp;&nbsp;</span>
            <el-select v-model="value" placeholder="请选择" @change="selectCourse">
              <el-option v-for="item in courses" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </div>
          <el-divider></el-divider>

          <div style="margin: 0 0 0 50px">
            <span>选择章节范围：</span>
            <el-checkbox
              v-for="(item,index) in chapter"
              :key="item.id"
              v-model="checked[index]"
              @change="selectChapters(item.id,checked[index])"
            >{{item.name}}</el-checkbox>
          </div>
          <el-divider></el-divider>
          <div style="margin:20px 0 0 60px">
            <el-row>
              <el-col
                :span="5"
                v-for="(item,index) in itemTypes"
                :key="index"
                style="margin-top:30px"
              >
                <el-row>
                  <el-col :span="6">
                    <span style="font-size:14px">{{item.name}}:</span>
                  </el-col>
                  <el-col :span="11">
                    <el-input-number
                      v-model="itemSum[index]"
                      size="mini"
                      :min="0"
                      :max="item.sum"
                      label="描述文字"
                      style="width:100px"
                    ></el-input-number>
                  </el-col>
                  <el-col :span="6">
                    <span style="font-size:12px;color:gray">&nbsp;(共{{item.sum}}题)</span>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
          <div>
            <el-row>
              <el-col :span="18">&nbsp;</el-col>
              <el-col :span="6">
                <el-button @click="sure" class="btn-sure" size>确认</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  getCourseByUser,
  getCourse,
  getChapters,
  getTypeSum,
  getTest,
  download
} from "../utils/server.js";
import header from "../components/header.vue";
import leftMenu from "../components/leftMenu.vue";
import teacherMenu from "../components/teacherMenu.vue";
import { shiroCheck } from "../utils/shiro.js";
export default {
  name: "AddTest",
  data() {
    return {
      courses: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      curCourse: "",
      chapter: [],
      value: "",
      checked: [],
      curChapter: [],
      itemTypes: [],
      itemSum: [],
      userInfo:"",
    };
  },
  methods: {
    selectCourse(value) {
      var that = this;
      this.curCourse = value;
      getChapters(that.curCourse, function(msg) {
        if (msg.succeed) {
          that.chapter = msg.data;
        } else {
          shiroCheck(msg, that);
        }
      });
    },
    selectChapters(index, checked) {
      var that = this;
      that.itemSum = [];
      if (checked) {
        that.curChapter.push(index);
      } else {
        that.curChapter.splice(that.curChapter.indexOf(index), 1);
      }
      //   console.log(that.curChapter);
      getTypeSum(that.curChapter, function(msg) {
        if (msg.succeed) {
          that.itemTypes = msg.data;
          // console.log(that.itemTypes);
        } else {
          shiroCheck(msg, that);
        }
      });
    },
    sure() {
      var that = this;
      getTest(this.curChapter, this.itemTypes, this.itemSum, function(msg) {
        if (msg.succeed) {
          that.$message({
            type: "success",
            message: "开始下载"
          });
          window.location.href =
            "http://localhost:8080/downloadTest?fileName=" + msg.data;
        } else {
          shiroCheck(msg, that);
        }
      });
    }
  },
  components: {
    "item-header": header,
    "item-left": leftMenu,
    "item-teacher": teacherMenu
  },
  created() {
    var that = this;
    this.userInfo=JSON.parse(localStorage.getItem("userInfo"));
    if (JSON.parse(localStorage.getItem("userInfo")).title == "管理员") {
      getCourse(null, null, null, function(msg) {
        if (msg.succeed) {
          that.courses = msg.data;
        } else {
          shiroCheck(msg, that);
        }
      });
    } else {
      getCourseByUser(JSON.parse(localStorage.getItem("userInfo")).id, function(
        msg
      ) {
        if (msg.succeed) {
          that.courses = msg.data;
        } else {
          shiroCheck(msg, that);
        }
      });
    }
  }
};
</script>
<style scoped>
.page {
  background: rgb(255, 255, 255);
  margin: 10px 20px 10px 20px;
  border-radius: 4px;
  height: 580px;
  padding: 20px 20px 20px 20px;
}
.header {
  margin: 20px 0 0 30px;
  font-size: 22px;
}
.btn-sure {
  position: absolute;
  margin-top: 200px;
}
</style>