<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList"><!--  详情界面-->
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight':totalPrice>0}">{{totalPrice}}元</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">
            {{payDesc}}
          </div>
        </div>
      </div>
      <!--定义小球-->
      <div class="ball-container">
        <transition-group name="drop"
                          v-on:before-enter="beforeEnter"
                          v-on:enter="enter"
                          v-on:after-enter="afterEnter"
        >
          <div v-for="(ball, index) in balls" v-bind:key="index" v-show="ball.show" class="ball">
            <!--inner是一个小球-->
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <!--<transition name="fold">-->
      <transition name="fade">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods" v-bind:key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!-- 记得将cartcontrol组件import到shopcart中，并注册components-->
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade"><!--背景遮罩层-->
      <!-- listShow表示当list详情列表显示的时候mask才显示 -->
      <div class="list-mask" @click="hideList()"  v-show="listShow"></div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
    import cartcontrol from '../../components/cartcontrol/cartcontrol';
    import BScroll from 'better-scroll';
    export default {
      props: { // 接收参数  配送费和起送费,选择商品。。。
        deliveryPrice: { // 配送费
          type: Number,
          default: 0
        },
        minPrice: { // 起送费
          type: Number,
          default: 0
        },
        selectFoods: { // 选择商品
          type: Array,
          default() {
            return [
              {
                price: 10,
                count: 1
              }
            ];
          }
        }
      },
      data() {
        return {
          balls: [
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            }
          ],
          // 添加一个变量，用来存贮已经下落的小球
          dropBalls: [],
          fold: true // 购物车详情页折叠状态,true表示折叠
        };
      },
      methods: {
        pay() {
          if (this.totalParice < this.minPrice) {
            return;
          }
          window.alert(`支付${this.totalParice}元`);
        },
        drop(el) { // 这里面的el就是ball所在的div
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (!ball.show) {
              ball.show = true;
              ball.el = el;
              this.dropBalls.push(ball); // 将下落的小球放进来
              return;
            }
          }
        },
        toggleList() {
          if (!this.totalCount) { // 购物车没有商品的时候不可点击
            return;
          }
          this.fold = !this.fold; // 当前是收起状态就展开，展开状态就收起
        },
        beforeEnter(el) { // 这里面的el就是ball所在的div
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect(); // 获取某个元素相对于视窗的位置集合。
              // 集合中有top, right, bottom, left等属性。rect.left:元素左边到视窗左边的距离;
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22); // window.innerHeight返回窗口的文档显示区的高度
              el.style.display = ''; // 让小球所在的div显示出来
              // 外层做一个纵向的变化
              el.style.webkitTransform = `translate3d(0,${y}px,0)`;
              el.style.transform = `translate3d(0,${y}px,0)`;
              // 内层做一个横向的变化
              let inner = el.getElementsByClassName('inner-hook')[0];
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            }
          }
        },
        enter(el, done) { // 这里面的el就是ball所在的div
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight; // 主动触发浏览器重绘,由于 rf 变量用不到，所以前面加上eslint注释防止报错。
          this.$nextTick(() => { // 下一帧，重置样式，异步执行
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
            el.addEventListener('transitionend', done);
          });
        }, // 动画做完的时候
        afterEnter(el) { // 这里面的el就是ball所在的div // 取到做完动画的球，再置为false，即重置，它还可以接着被利用
          let ball = this.dropBalls.shift();// shift()它能够移除数组中的第一个项并返回该项，同时将数组长度减1。
          if (ball) {
            ball.show = false; // 重置ball.show的状态
            el.style.display = 'none';
          }
        },
        empty() {
          this.selectFoods.forEach((food) => { // 遍历food，将food的count都置零
            food.count = 0;
          });
        },
        hideList () {
          this.fold = true; // 点击mark层，购物车详情列表被收回
        }
      },
      computed: {
        totalPrice () {
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.price * food.count;
          });
          return total;
        },
        totalCount() {
          let count = 0;
          this.selectFoods.forEach((food) => {
            count += food.count;
          });
          return count;
        },
        payDesc() {
          if (this.totalParice === 0) {
            return `￥${this.minPrice}元起送`; // es6的反引号，使用`${}`可以省略字符串和变量的拼接
          } else if (this.totalParice < this.minPrice) {
            let diff = this.minPrice - this.totalParice;
            return `还差￥${diff}元起送`;
          } else {
            return '去结算';
          }
        },
        payClass() {
          if (this.totalParice < this.minPrice) {
            return 'not-enough';
          } else {
            return 'enough';
          }
        },
        listShow() {
          // 没有商品时为折叠状态
          if (!this.totalCount) {
            this.fold = true; // true时为折叠状态
            return false;// 不做切换
          }
          // 有商品的时候以变量show做状态切换
          // fold为true(折叠)则show为false(折叠)，fold为false(展开)，则show为true(展开);
          // 这样，show就跟v-show的true和false状态同步了，变为true时展开，false时折叠
          let show = !this.fold;
          if (show) { // true为展示状态
            this.$nextTick(() => {
              if (!this.scroll) { // 如果没有scroll则实例化scroll，否则刷新
                this.scroll = new BScroll(this.$refs.listContent, { // scroll初始化
                  click: true
                });
              } else {
                this.scroll.refresh();
              }
            });
          }
          return show;
        }
      },
      components: {
        cartcontrol
      }
      /* beforeDestroy: function () {
        this.$bus.$off('add');
      } */
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "shopcart.styl"
</style>
