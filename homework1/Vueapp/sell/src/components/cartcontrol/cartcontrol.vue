<template>
  <div class="cartcontrol">
    <transition name="slide-fade">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner inner1 icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
    export default {
      props: {
        food: {
          type: Object
        }
      },
      methods: {
        // 修改数据goods=>foods=>food的count，映射到原始数据中
        addCart(event) {
          if (!event._constructed) {
            return; // 如果不是自己写的click事件，就return掉
          }
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1); // 通过Vue.set方法，给this.food添加一个count属性，并默认为1
            // this.food.count = 1; // 直接这样写，Vue检测不到新的属性的变化
          } else {
            this.food.count++;
          }
          // 设置滚动对象时，点击加号，设置一个派发事件，将DOM对象传出去,将target（DOM）作为cart.add事件的对象传入
          // $emit, $on, $off 分别来分发、监听、取消监听事件：
          // 提交'cart-add'事情给父组件，第二个是要传递的参数
           this.$emit('cart-add', event.target);
          /* this.$bus.emit('add', event.target);
          this.$emit('event', event.target); */
        },
        decreaseCart(event) {
          if (!event._constructed) {
            return; // 如果不是自己写的click事件，就return掉
          }
          if (this.food.count) {
            this.food.count--;
          }
        }
      }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.cartcontrol
  font-size :0
  .cart-decrease
    display :inline-block
    padding:6px
    .inner
      display inline-block
      line-height :24px
      font-size :24px
      color :rgb(0,160,220)
      transition : all 0.4s linear
    &.slide-fade-enter-active, &.slide-fade-leave-active
      transition : all 0.4s linear
    &.slide-fade-enter, &.slide-fade-leave-active //刚进入和离开后的状态
      opacity: 0
      transform: translateX(24px)
      .inner1
        transform: rotate(180deg)
  .cart-count
    display :inline-block
    vertical-align :top
    width : 12px
    padding-top 6px
    line-height :24px
    text-align: center
    font-size :12px
    color :rgb(147,153,159)
  .cart-add
    display :inline-block
    padding:6px
    line-height :24px
    font-size :24px
    color :rgb(0,160,220)
</style>
