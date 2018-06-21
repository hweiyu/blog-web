// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router/route'
import ElementUI from 'element-ui'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import './element-variables.scss'
import './assets/styles/index.css'
import './assets/styles/common.css'
import './assets/styles/container.css'
import './assets/styles/header.css'
import './assets/styles/article.css'
import './assets/styles/side.css'
import './assets/styles/blog.css'

Vue.use(mavonEditor);
Vue.use(ElementUI);
Vue.use(Vuex);

/**
 * 挂载权限方法
 */
Vue.prototype.isAuth = isAuth;

/**
 * 是否有权限
 */
export function isAuth (key) {
  return JSON.parse(sessionStorage.getItem('roleList') || '[]').indexOf(key) !== -1 || false
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    eventHub: new Vue()
  },
  components: { App },
  render: h => h(App)
});
