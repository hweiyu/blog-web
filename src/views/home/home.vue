<template lang="html">
  <div class="blog">
    <nav-header @getTagList='getTagList' @getTagId='getTagId'></nav-header>
    <div class="headpic">
      <div class="container headtitle">
        <div class="title">
          <h1 href="/">hweiyu</h1>
        </div>
      </div>
    </div>
    <div class="container content">
      <div class="list">
        <div class="main">
          <article-list :tagId="tagId"></article-list>
        </div>
        <div class="side">
          <side-section>
            <div slot="sidecontent">
              <h3>
                <a href="">hweiyu</a>
                <span class="cat-desc">Just A Coding Peasant</span>
              </h3>
              <div class="pres">
                <a href="" class="pic">
                  <img src="/static/card.jpg" alt="我的头像">
                </a>
                <a href="" class="detail">
                <span class="item-info">
                  <span class="item-title">hweiyu</span>
                  <span class="item-desc">2018</span>
                </span>
                </a>
              </div>
              <div class="social">
                <a data-balloon="微博" href="http://weibo.com/" rel="nofollow" class="icon"><i class="fa fa-weibo" style="background-color: #dd4b39"></i></a>
                <a data-balloon="github" href="https://github.com/JhonXY" rel="nofollow" class="icon"><i class="fa fa-github" style="background-color: #55acee;"></i></a>
                <el-popover
                  placement="bottom"
                  title="我的邮箱"
                  width="50"
                  trigger="hover"
                  content="1076849402@qq.com">
                </el-popover>
                <a data-balloon="邮箱" href="javascript:" rel="nofollow" class="icon" ><i class="fa fa-envelope" style="background-color: #3b5998"></i></a>
                <el-popover
                  placement="bottom"
                  title="我的简历"
                  width="50"
                  trigger="hover"
                  content="暂无内容">
                </el-popover>
                <a data-balloon="微博" href="javascript:" rel="nofollow" class="icon" ><i class="fa fa-address-card-o" style="background-color: #80b953"></i></a>
              </div>
            </div>
          </side-section>
          <side-section>
            <div slot="sidecontent">
              <ul>
                <li class="message-title">标签</li>
              </ul>
              <div class="tagList">
                <span class="tagList-item" v-for="item in tagList"><a href="#" @click="getTagId(item.id)">{{item.tagName}}</a></span>
              </div>
            </div>
          </side-section>
          <side-section>
            <div slot="sidecontent">
              <ul>
              <li class="message-title">留言</li>
              <li class="message-item" v-for="item in messagesList">
                <router-link to="/messages" class="message-from">
                  <div class="message-content">
                    <span class="l_title">
                      {{item.name}}
                      <span>
                        <br>
                        <small class="l_message">
                          {{item.content}}
                        </small>
                      </span>
                    </span>
                  </div>
                  <div class="message-avatar">
                    <img :src="'https://cdn.v2ex.com/gravatar/' + item.email + '?s=120&d=mm&r=g'" alt="">
                  </div>
                </router-link>
              </li>
             </ul>
            </div>
          </side-section>

        </div>
      </div>
    </div>
    <scroll-top></scroll-top>
    <nav-footer></nav-footer>
  </div>
</template>

<script>

import NavHeader from '../../components/Header.vue'
import NavFooter from '../../components/Footer.vue'
import articleList from '../../components/articleList.vue'
import sideSection from '../../components/sideSection.vue'
import scrollTop from '../../components/scrollTop.vue'


export default {
  name: 'home',
  components: {
    NavHeader,
    NavFooter,
    articleList,
    sideSection,
    scrollTop
  },
  data() {
    return {
      tagList: [],
      messagesList: [],
      tagId: '',
      limit: 10 // 用于限制首页显示留言量
    }
  },
  mounted() {
    //this.getMessages()
  },
  methods: {
    // 利用监听获取子组件数据，并传给另外的子组件
    getTagList(tagList) {
      this.tagList = tagList
    },
    getTagId(id) {
      this.tagId = id
    },
    getMessages() {
      axios.get("/api/messageList", {
        params: {
          limit: this.limit
        }
      }).then((result) => {
        let res = result.data;
        this.messagesList = res.result
      })
    }
  }
}
</script>

<style>
  body {
    background-color: #f4f4f4;
    font-family: 'Open Sans', 'Helvetica Neue',"Microsoft YaHei",'Hiragino Sans GB', 'LiHei Pro', Arial, sans-serif;
  }
  .blog{
    height: 1000px;
    position: relative;
  }
  .foot {
   position: absolute;
    bottom: 0;
  }
  .secondary h3 {
    margin: 0 0 15px 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 1;
  }

  .secondary h3 .cat-desc {
    display: block;
    margin: 5px 0 0 0;
    font-size: 14px;
    font-weight: normal;
    color: #999;
  }

  .pres {
    position: relative;
    line-height: 1.5;
    font-size: 14px;
    line-height: 1.5;
    /*background-color: #24292e;*/
    border-radius: 3px;
    margin-bottom: 15px;
  }

  a.pic {
    top: 3px;
    margin-left: 3px;
    left: 0;
    z-index: auto;
    position: absolute;
  }

  a.pic img {
    height: 100px;
    width: 100px;
    display: inline-block;
    overflow: hidden;
    line-height: 1;
    vertical-align: middle;
    border-radius: 8px;
  }

  .social {
    padding-top: 10px;
    padding-left: 110px;
  }

  .detail {
    margin: 0 0 0 5px;
    padding: 0 0 0 110px;
    display: block;
    margin: 0 0 0 5px;
    font-weight: 500;
    text-decoration: none;
  }

  .item-info {
    width: calc(100% - 40%);
    line-height: 1.5;
    float: none;
  }

  .item-title {
    margin: 0;
    font-size: 14px;
    font-weight: 500;
    color: #3a8bbb;
    display: block;
  }

  .item-desc {
    font-size: 12px;
    font-weight: normal;
    color: #999;
    display: block;
  }

  .social a {
    display: inline-block;
    margin-bottom: 7px;
    text-decoration: none;
  }

  .social a i {
    font-size: 22px;
    /*width: 30px;
    height: 30px;*/
    width: 38px;
    line-height: 38px;
    border-radius: 50px;
    color: #fff;
    background-color: rgba(0, 0, 0, .1);
    text-align: center;
  }

  .fa {
    margin: 0 0.2em;
  }

  .message-title {
    border-bottom: 2px solid rgba(139, 139, 139, 0.5);
    padding: 0 10px;
    color: rgb(139, 139, 139);
    font-size: 12px;
    font-weight: 700;
    line-height: 25px;
  }

  .message-item {
    border-bottom: 1px dashed rgba(139, 139, 139, 0.4);
  }

  .message-from {
    height: 45px;
    padding: 8px 8px 0 57px;
    display: block;
    line-height: 14px;
    position: relative;
  }

  .message-avatar img {
    position: absolute;
    left: 10px;
    top: 8px;
    border-radius: 5px;
    display: block;
    height: 37px;
    width: 37px;
  }

  .l_title {
    color: #778087;
    font-weight: 700;
    padding: 1px 0 0;
    line-height: 17px;
    font-size: 14px;
  }

  .l_message {
    color: #778087;
    display: block;
    font-weight: 400;
    line-height: 17px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tagList {
    flex-flow: row wrap;
    display: flex;
    padding-top: 20px;
  }

  .tagList .tagList-item {
    margin: 0 16px 16px 0;
    padding: 0 15px;
    height: 30px;
    line-height: 30px;
    max-width: 100%;
    background: rgba(0, 0, 0, .06);
    color: #666768;
    border-radius: 15px;
    text-align: center;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
</style>
