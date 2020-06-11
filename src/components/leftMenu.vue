<template>
  <div style="height:100%">
    <el-menu
      default-openeds="1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      style="height:100%"
      router
    >
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>用户管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">表管理</template>
          <el-menu-item index="AdminUser">
            <i class="el-icon-user"></i>用户表
          </el-menu-item>
          <el-menu-item index="AdminCourse">
            <i class="el-icon-notebook-1"></i>课程表
          </el-menu-item>
          <el-menu-item index="AdminChoose">
            <i class="el-icon-circle-check"></i>任课表
          </el-menu-item>
          <el-menu-item index="AddTest"><i class="el-icon-document"></i>生成试卷</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="权限管理">
          <el-menu-item index="#"><i class="el-icon-unlock"></i>更改用户权限</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "leftMenu",
  data() {
    return {};
  },
  methods: {
    AdminUser() {}
  }
};
</script>
<style>
.el-aside {
  display: block;
  position: relative;
  overflow-y: scroll;
  background-color: #999999 !important;
}
</style>