<template lang="html">
<div class="article-list">
  <article class="block post wysiwyg" v-for="item in articleList">
    <h2>{{item.title}}</h2>
    <p class="article-meta">发布于 {{formatTime(item.createDate)}}</p>
    <div class="ui ribbon label red">
      <a href="">{{item.tagName}}</a>
    </div>
    <div class="abstract" v-html="item.content">
    </div>
    <p class="more"><router-link :to="{ path:'/article', query:{id: item.id}}">阅读全文</router-link></p>
  </article>
  <div class="pages">
    <!--工具条-->
    <el-col :span="24" style="margin-top: 10px">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total" style="float: right">
      </el-pagination>
    </el-col>
  </div>
</div>
</template>

<script>

import {getBlogList} from '../api/api';
import util from '../assets/js/util';
export default {
  props:['tagId'],
  data () {
    return {
      articleList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  watch: {
    tagId () {
      this.getTagList()
    }
  },
  mounted () {
    this.getBlogList()
  },
  methods: {
    formatTime(date) {
      return util.dateFormat('yyyy-MM-dd hh:mm:ss', new Date(date));
    },
    //切换页数
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getBlogList();
    },
    //处理分页条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getBlogList();
    },

    getBlogList () {
      let param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      };
      getBlogList(param).then((res) => {
        if (res.code === 1) {
          this.total = res.data.pageInfo.total;
          this.articleList = res.data.data;
        }
      }, () => {}).catch(() => {});
    },
    getTagList () {
      this.pageNum = 0;
      this.pageSize = 10;
      let param = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        tagId: this.tagId
      };
      getBlogList(param).then((res) => {
        if (res.code === 1) {
          this.total = res.data.pageInfo.total;
          this.articleList = res.data.data;
        }
      }, () => {}).catch(() => {});

    },

  }
}
</script>

<style media="screen">
.article-list {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  /*box-shadow: 1px 1px 2px rgba(0,0,0,0.08)*/
  box-shadow: 0 16px 24px 1px rgba(0, 0, 0, 0.14),
              0 6px 50px 1px rgba(0, 0, 0, 0.12),
              0 6px 10px -5px rgba(0, 0, 0, 0.2);
}
</style>
