import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = []
export default new VueRouter({
  routes
})
