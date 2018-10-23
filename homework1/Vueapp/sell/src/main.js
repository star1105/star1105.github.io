// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入依赖文件
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router'; // VueRouter的引用，通过接口操作dom来进行交互。
import VueResource from 'vue-resource';
import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';
// 引入自定义的css样式
import './common/stylus/index.styl';
/* eslint-disable no-new */
// 注册插件
Vue.use(VueRouter); // 通过Vue.use来安装VueRouter，使用独立编译的文件不需要安装
Vue.use(VueResource); // 通过Vue.use来安装VueResource 用来发送AJAX请求
// 定义路由
var routes = [
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
];
var router = new VueRouter({
  linkActiveClass: 'active', /* 将linkActiveClass的默认值v-link-active指定为active */
  routes // 参考vue router
});
// =>是ES6的箭头写法
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
// vue1.0使用router.go('/goods')，在2.0中用router.push(‘/goods’)
// 页面加载自动导航到goods页面
// router.push('/goods');
// 下面一行作用是:去除eslint警告
Vue.config.productionTip = false;
