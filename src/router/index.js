import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

export const routes = [{
  path: '/home',
  code: 'Home',
  component: ()=>import('@/views/Home.vue'),
  meta: { title: '一级菜单', icon: 'el-icon-setting' },
},{
  path: '/home1',
  code: 'Home',
  component: ()=>import('@/views/Home.vue'),
  meta: { title: '首页', icon: 'el-icon-setting' },
  
},{
  path: '/home2',
  code: 'Home',
  component: ()=>import('@/views/Home.vue'),
  meta: { title: '首页', icon: 'el-icon-setting' },
  
}]
