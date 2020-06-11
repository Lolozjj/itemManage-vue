<template>
  <div>
    <!-- {{this.$route.query.chapterId}} -->
    <el-row>
      <el-col :span="5">
        <div>
          <el-input
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            class="filter-input"
            style="margin:10px 0 0 10px"
            size="small"
          ></el-input>

          <el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterNode"
            highlight-current
            @node-click="nodeClick"
            ref="tree"
            style="margin:10px 55px 0 10px"
          >
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <div v-if="$route.query.name!=node.label">
                <i @click="deleteChapter(data.id)" class="el-icon-remove-outline icon-chapter"></i>
              </div>
            </span>
          </el-tree>
          <div class="add-box">
            <el-row v-if="!addDisplay">
              <el-col :span="18">
                <el-input
                  size="mini"
                  v-model="addChapterName"
                  style="width:120px;margin:0 0 0 30px"
                ></el-input>
              </el-col>
              <el-col :span="6">
                <el-button size="mini" @click="addChapter2">确认</el-button>
              </el-col>
            </el-row>
            <i
              v-if="addDisplay"
              @click="addChapter"
              class="el-icon-circle-plus-outline icon-chapter add-icon"
            ></i>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="header">
          <el-row>
            <el-col :span="2">
              <el-input size="mini" clearable placeholder="编号" v-model="searchData.id"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input size="mini" clearable placeholder="内容，模糊查找" v-model="searchData.content"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input size="mini" clearable placeholder="答案，模糊查找" v-model="searchData.answer"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input size="mini" clearable placeholder="题型" v-model="searchData.type"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input size="mini" clearable placeholder="分值" v-model="searchData.score"></el-input>
            </el-col>
            <el-col :span="3">
              <el-input size="mini" clearable placeholder="备选次数" v-model="searchData.selectNum"></el-input>
            </el-col>
            <el-col :span="5">
              <el-button size="mini" @click="Search">搜索</el-button>
              <el-button size="mini" @click="Add">添加</el-button>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-table
            :data="showData"
            class="tb-edit"
            style="width: 100%"
            height="500px"
            highlight-current-row
          >
            <el-table-column label="编号" sortable prop="id" width="80px">
              <template slot-scope="scope">
                <span>{{scope.row.id}}</span>
              </template>
            </el-table-column>
            <el-table-column label="内容" sortable :show-overflow-tooltip="true" width="120px">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.content"
                  placeholder="请输入内容"
                  @change="handleEdit(scope.$index, scope.row)"
                ></el-input>
                <span>{{scope.row.content}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="answer"
              label="答案"
              sortable
              :show-overflow-tooltip="true"
              width="120px"
            >
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.answer"
                  placeholder="请输入内容"
                  @change="handleEdit(scope.$index, scope.row)"
                ></el-input>
                <span>{{scope.row.answer}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="题型" sortable width="120px">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.type"
                  placeholder="请输入内容"
                  @change="handleEdit(scope.$index, scope.row)"
                ></el-input>
                <span>{{scope.row.type}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="score" label="分值" sortable width="120px">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.score"
                  placeholder="请输入内容"
                  @change="handleEdit(scope.$index, scope.row)"
                ></el-input>
                <span>{{scope.row.score}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="selectSum" label="被选次数" sortable width="120px">
              <template slot-scope="scope">
                <span>{{scope.row.selectSum}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <!--<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
                <el-button
                  size="small"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {
  addChapters,
  getChapters,
  deleteChapters,
  getItems,
  getItemsByExample,
  addItem,
  deleteItem,
  modifItem
} from "../utils/server.js";
export default {
  name: "manageChapter",
  data() {
    return {
      filterText: "",
      data: [
        {
          id: 1,
          name: "JAVA",
          children: [
            {
              id: 1,
              name: "基础语法"
            },
            {
              id: 3,
              name: "面向对象"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "name"
      },
      checkChapter: "",
      showData: "",
      searchData: [],
      chapterId: "",
      addDisplay: true,
      addChapterName: ""
    };
  },
  methods: {
    handleDelete(index, row) {
      var that = this;
      that
        .$confirm("点击确认后该题目信息将被永久删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          deleteItem(that.showData[index].id, function(msg) {
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
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleEdit(index, row) {
      var that = this;
      modifItem(
        this.showData[index].id,
        this.showData[index].content,
        this.showData[index].answer,
        this.showData[index].type,
        this.showData[index].score,
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
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    nodeClick(chapter, node, nodes) {
      var that = this;
      that.chapterId = chapter.id;
      getItems(chapter.id, function(msg) {
        if (msg.succeed) {
          that.showData = msg.data;
          
        }else{
          shiroCheck(msg, that);
        }
      });
    },
    Search() {
      var that = this;
      getItemsByExample(
        that.searchData.id,
        that.searchData.content,
        that.searchData.answer,
        that.searchData.type,
        that.searchData.selectNum,
        that.searchData.score,
        that.chapterId,
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
      addItem(
        that.searchData.content,
        that.searchData.answer,
        that.searchData.type,
        that.searchData.score,
        that.chapterId,
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
    },
    deleteChapter(chapterId) {
      var that = this;
      that
        .$confirm("点击确认后该章节以及归属题目将被永久删除", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          deleteChapters(chapterId, function(msg) {
            if (msg.succeed) {
              that.$message({
              type: "success",
              message: "删除成功!"
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
    addChapter() {
      this.addDisplay = !this.addDisplay;
    },
    addChapter2() {
      var that =this;
      addChapters(that.addChapterName,that.$route.query.courseId,function(msg){
        if(msg.succeed){
          that.$message({
              type: "success",
              message: "添加成功!"
            });
        }else{
          shiroCheck(msg, that);
        }
      })
    }
  },
  created() {
    if(this.$route.query.courseId==null){
      this.$router.push({ path: "Login" });
    }
    var that = this;
    that.data[0].name = this.$route.query.name;
    getChapters(this.$route.query.courseId, function(msg) {
      if (msg.succeed) {
        that.data[0].children = msg.data;
      } else {
        shiroCheck(msg, that);
      }
    });
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>
<style scoped>
.filter-input {
  width: 200px;
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
}
.header {
  margin: 20px 0 0 0px;
}
.icon-chapter {
  color: rgb(187, 221, 221);
  font-size: 20px;
}
.icon-chapter:hover {
  color: rgb(101, 145, 145);
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.add-box {
  background: rgb(255, 255, 255);
  width: 80%;
  height: 30px;
  margin: 30px 0px 0 0px;
  border-radius: 5px;
  /* border:1.7px solid rgb(187, 221, 221); */
}
.add-icon {
  line-height: 30px;
  text-align: center;
  font-size: 30px;
  margin: 0px 0 0 15px;
  width: 80%;
  cursor: pointer;
}
</style>