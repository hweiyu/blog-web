
let routes = [

  {path: '/404', component: resolve => {require(['../views/404.vue'], resolve)} },
  //主页
  {path: '/', component: resolve => {require(['../views/home/home.vue'], resolve)}},
  //博客内容
  {path: '/article', component: resolve => {require(['../views/article/article.vue'], resolve)}},
  //关于
  {path: '/about', component: resolve => {require(['../views/about/about.vue'], resolve)}},

  {
    path: '/index',
    component: resolve => {require(['../views/admin/index.vue'], resolve)},
    redirect: { path: '/blog'},
    children: [
      { path: '/blog', component: resolve => {require(['../views/admin/blog.vue'], resolve)}},
      { path: '/tag', component: resolve => {require(['../views/admin/tags.vue'], resolve)}},
    ]
  },
  {path: '/login',component: resolve => {require(['../views/admin/login.vue'], resolve)}},


  {path: '*', redirect: { path: '/404'}}
];

export default routes;
