<template>
  <div>
    <v-header v-bind:seller="seller"></v-header><!--对应的是header组件，需要下面引入和注册，才可以使用-->
    <div class="tab">
      <div class="tab-item">
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!--路由外链接-->
   <router-view :seller="seller" keep-alive></router-view>
    <!--keep-alive是Vue的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM。-->
  </div>
</template>
<script type="text/ecmascript-6">
  import {urlParse} from 'common/js/util.js';
  import header from './components/header/header.vue';/* 引入header组件 */
  const ERR_OK = 0;
  export default {
    data () {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            // console.log(queryParam);
            return queryParam.id;
          })()
        }
      };
    },
    created () {
      // 在url里加入参数id可以区分不同商家的数据，返回不同的seller数据
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body; // 拿到response返回的json、object对象
        if (response.errno === ERR_OK) {
          /* this.seller = response.data; */
          // 给this.seller扩展属性，保留id属性
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    },
    components: {
      'v-header': header // 注册v-header，把header.vue组件注册到这里，上面就可以使用<v-header>
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
   @import './common/stylus/mixin.styl'; // stylus引入stylus文件的语法
  .tab
    display : flex
    width :100%
    height :40px
    line-height : 40px
    border-bottom : 1px solid rgba(7,17,27,0.1)
    // border-1px(rgba(7,17,27,0.5))
    .tab-item
      flex : 1
      text-align : center
      & > a
        display : block
        font-size :14px
        color : rgb(77,85,93)
        &.active
          color crimson
</style>
