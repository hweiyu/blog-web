<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form align="right" :inline="true"  class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="filters.title" placeholder="请输入博客标题"></el-input>
        </el-form-item>
        <el-form-item label="" prop="tagId">
          <el-select v-model="filters.tagId" placeholder="请选择博客标签">
            <el-option
              v-for="item in tagList"
              :key="item.id"
              :value ="item.id"
              :label="item.tagName">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select v-model="filters.status" placeholder="请选择博客状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :value ="item.value"
              :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" v-on:click="searchData">查询</el-button>
        </el-form-item>
        <el-form-item label="">
          <el-button  type="primary" @click="handleEditOrAdd">写博客</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table :data="list"  height="500" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" ></el-table-column>
      <el-table-column prop="title" label="博客标题"   sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="tagName" label="博客类别"   sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="createDate" label="发布日期"   sortable show-overflow-tooltip></el-table-column>
      <el-table-column prop="status" label="发布状态"  :formatter="formatStatus"  sortable></el-table-column>
      <el-table-column prop="content" label="博客内容"   sortable show-overflow-tooltip></el-table-column>
      <!--<el-table-column prop="keyWord" label="关键字"   sortable></el-table-column>-->
      <el-table-column  fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button  size="small" @click="handleEditOrAdd(scope.$index, scope.row)">编辑</el-button>
          <el-button  type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--工具条-->
    <el-col :span="24" style="margin-top: 10px">
      <el-button  type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
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

    <!--编辑界面-->
    <el-dialog :title="title" v-model="formVisible" :visible.sync="formVisible">
      <el-form :model="form" label-width="80px" :rules="formRules" ref="form">
        <el-form-item label="博客标题" prop="title">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="博客类别" prop="tagId">
          <el-select v-model="form.tagId" placeholder="请选择">
            <el-option
              v-for="item in tagList"
              :key="item.id"
              :value ="item.id"
              :label="item.tagName">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <mavon-editor class="set" v-model="value" @change="getContent" :ishljs = "true" ></mavon-editor>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="formVisible = false">取消</el-button>
        <el-button type="primary" @click.native="submit" :loading="loading">提交</el-button>
      </div>
    </el-dialog>

  </section>
</template>

<script>

import {getBlogList, removeBlog, batchRemoveBlog, editBlog, addBlog, getTagList} from '../../api/api'
export default {
  data () {
    return {
      options: [{
        value: 1,
        label: '已发布'
      }, {
        value: 0,
        label: '未发布'
      }],
      filters: {
        tagId: '',
        title: '',
        status: ''
      },
      value: '',
      content: '',
      list: [],
      tagList: [], // 标签列表
      total: 0,
      title: '新增', // 弹出框标题
      pageNum: 1, // 当前页码
      pageSize: 10, // 页数
      listLoading: false,
      sels: [], // 列表选中列
      formVisible: false, // 编辑界面是否显示
      loading: false,
      formRules: {
        title: [{required: true, message: '请输入标题', trigger: 'blur'}],
        status: [{required: true, message: '请选择状态', trigger: 'change'}]
      },
      // 编辑界面数据
      form: {
        id: '',
        title: '',
        content: '',
        tagId: ''
      }

    }
  },
  methods: {
    // 状态显示转换
    formatStatus: function (row, column) {
      return row.status === 1 ? '已发布' : '未发布'
    },
    // 切换页数
    handleCurrentChange (val) {
      this.pageNum = val
      this.getData()
    },
    // 处理分页条数
    handleSizeChange (val) {
      this.pageSize = val
      this.getData()
    },

    getContent (value, render) {
      this.content = render
    },

    // 查询
    searchData () {
      this.pageNum = 1
      this.getData()
    },

    getData () {
      let para = {
        tagId: this.filters.tagId,
        title: this.filters.title,
        pageInfo: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }
      this.listLoading = true
      getBlogList(para).then((res) => {
        this.listLoading = false
        if (res.code === 1) {
          this.total = res.data.pageInfo.total
          this.list = res.data.data
        }
      }, (res) => { this.listLoading = false })
    },

    getTagList () {
      this.listLoading = true
      getTagList().then((res) => {
        this.listLoading = false
        if (res.code === 1) {
          this.tagList = res.data
        }
      }, () => { this.listLoading = false })
    },

    // 删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = {id: row.id}
        removeBlog(para).then((res) => {
          this.listLoading = false
          if (res.code === 1) {
            this.success()
            this.getData()
          }
        })
      }).catch(() => {})
    },

    // 显示编辑/新增界面
    handleEditOrAdd: function (index, row) {
      if (row) {
        this.title = '编辑'
        this.form = Object.assign({}, row)
        this.value = this.form.content
        console.log(this.form)
      } else {
        this.title = '新增'
        this.form = {}
      }
      this.formVisible = true
    },

    // 编辑
    submit: function () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.form.content = this.content
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.loading = true
            let para = this.form
            if (para.id) {
              editBlog(para).then((res) => {
                this.loading = false
                if (res.code === 1) {
                  this.success('编辑成功')
                  this.$refs['form'].resetFields()
                  this.formVisible = false
                  this.getData()
                }
              })
            } else {
              addBlog(para).then((res) => {
                this.loading = false
                if (res.code === 1) {
                  this.success('新增成功')
                  this.$refs['form'].resetFields()
                  this.formVisible = false
                  this.getData()
                }
              })
            }
          })
        }
      })
    },

    selsChange: function (sels) {
      this.sels = sels
    },
    // 批量删除
    batchRemove: function () {
      let ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        let para = {ids: ids}
        batchRemoveBlog(para).then((res) => {
          this.listLoading = false
          if (res.code === 1) {
            this.success('删除成功')
            this.getData()
          }
        })
      })
    },

    success: function (msg) {
      this.$message({
        message: msg,
        type: 'success'
      })
    }
  },
  mounted () {
    this.getData()
    this.getTagList()
  }
}

</script>

<style scoped>

</style>
