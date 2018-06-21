<template lang="html">
  <section>
    <el-row>
      <el-menu theme="dark" :default-active="$router.path" class="el-menu" mode="horizontal" :router="false">
        <el-menu-item index="1" @click="collapse">管理系统</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
        </el-submenu>
      </el-menu>
      <el-breadcrumb separator="/" style="padding: 20px 20px 20px 20px;">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/blog' }">文章列表</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/tag' }">tag列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-row>
    <el-row  type="flex">
        <el-menu :default-active="$router.index" :router="true" mode="vertical" :collapse="isCollapse">
          <el-menu-item index="/blog">
            <i class="el-icon-menu"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>
          <el-menu-item index="/tag">
            <i class="el-icon-menu"></i>
            <span slot="title">tag列表</span>
          </el-menu-item>
        </el-menu>
        <el-col :span="20">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
        </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
    }
  },
  created () {

  },
  methods: {
    collapse () {
      this.isCollapse = !this.isCollapse
    },

  }
}
</script>

<style lang="css">
a {
  text-decoration: none;
}
.row-bg {
    /*background-color: #f9fafc;*/
    background-color: #99a9bf;
    width: 100%;
    height: 837px;
    border-radius: 2px;
}
</style>
