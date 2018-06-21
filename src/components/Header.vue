<template lang="html">
<div class="header navbar animated">
  <div class="container">
    <nav id="primary-navigation" class="site-navigation primary-navigation">
      <div class="menum">
        <ul class="nav-menu">
          <li class="menu-item"><router-link href="#" to="/"><i class="fa fa-home"></i>首页</router-link></li>
          <li id="collapse" class="menu-item">
            <a target="_blank"><i class="fa fa-cog"></i>分类</a>
            <ul class="collapse-menum">
              <li class="menu-item" v-for="item in tagList">
                <a href="javascript:" @click="getTagId(item.id)">{{item.tagName}}</a>
              </li>
            </ul>
          </li>
          <li class="menu-item"><router-link to="/messages"><i class="fa fa-comment"></i>留言</router-link></li>
          <li class="menu-item"><router-link to="/about"><i class="fa fa-user"></i>关于</router-link></li>
        </ul>
      </div>
    </nav>
  </div>
</div>
</template>

<script>
// 实现导航条的自动显示
import Headroom from 'headroom.js'
import {getTagList} from '../api/api';
export default {
  data () {
    return {
      tagList: []
    }
  },
  methods: {
    getTagList() {
      getTagList({}).then((res) => {
        if (res.code === 1) {
          this.tagList = res.data;
          this.$emit('getTagList', this.tagList)
        }
      }, () => {}).catch(() => {});
    },

    getTagId (tagId) {
      this.$emit('getTagId', tagId);
      this.$router.push({path:'/'})
    }
  },
  mounted () {
    let myElement = document.querySelector(".header");
    // construct an instance of Headroom, passing the element
    let headroom  = new Headroom(myElement, {
      "tolerance": 1,
      "offset": 10,
      "classes": {
        "initial": "animated",
        "pinned": "slideDown",
        "unpinned": "slideUp"
      }
    });
    headroom.init();
    this.getTagList();
  }
}
</script>
