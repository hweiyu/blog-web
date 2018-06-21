import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

let routerApi = ['/blog','/index','/tag'];

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path !== '/login') {
    if(routerApi.indexOf(to.path) > -1) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
      if (to.path) {
        next();
      } else {
        next({ path: '/404' });
      }
  }
});

export default router
