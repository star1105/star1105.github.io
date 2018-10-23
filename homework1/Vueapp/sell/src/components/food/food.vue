<template>
  <transition name="move">
    <div v-show="showFlag" class="food" ref="food"> <!--ref="food"，把better-scroll绑定到最外层，内层超出部分则会产生滚动-->
      <div class="food-content">
        <div class="image-header">
          <img v-bind:src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">现价￥{{food.price}}</span><span class="old" v-show="food.oldPrice">
            原价￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol> <!-- 使用cartcontrol -->
          </div>
          <transition name="fade">
            <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count
            ||food.count===0">加入购物车
            </div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <ratingselect :select-type="selectType" :only-content="onlyContent"
                        :desc="desc" :ratings="food.ratings"
          @selecttype="setType" @content="setOnlycontent"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)"
                  v-for="rating in food.ratings" class="rating-item border-1px">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <!-- filters过滤器{{ 要处理的值 | 方法 }} -->
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <span :class="{'icon-thumb_up':rating.rateType===0,
                  'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'; /* 引入better-scroll */
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue'; /* 引入cartcontrol */
  import Vue from 'vue';
  import ratingselect from '../../components/ratingselect/ratingselect.vue';
  import split from '../../components/split/split.vue';
  import {formatDate} from '../../common/js/date.js';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;

  export default {
    props: {
      /* 接收参数 food里面的selectedFood对象 */
      food: {
        type: Object
      }
    },
    data() {
      return {
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      };
    },
    methods: {
      setType(type) {
        this.selectType = type;
        // 手动刷新better-scroll重新计算页面高度
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      // 手动刷新better-scroll重新计算页面高度
      setOnlycontent() {
        this.onlyContent = !this.onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      show() {
        this.showFlag = true;
        this.selectType = ALL;
        this.onlyContent = false;
         /* 把better-scroll加进来 */
        this.$nextTick(() => { // 保证DOM是已经被渲染的
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        });
      },
      hide() {
        this.showFlag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return;
        }
        Vue.set(this.food, 'count', 1);
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: { /* 过滤器 */
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      cartcontrol, /* cartcontrol */
      split,
      ratingselect
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "food.styl"
</style>
