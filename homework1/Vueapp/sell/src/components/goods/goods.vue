<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item,index) in goods" class="menu-item"
              :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
            <span class="text border-1px">
              <span class="icon" v-show="item.type>0" :class="classMap[item.type]">
              </span>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li v-for="item in goods" class="food-list food-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <!--<cartcontrol @event="getEvent" :food="food"></cartcontrol>-->
                    <cartcontrol :food="food" v-on:cart-add="cartAdd"></cartcontrol>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--// 购物车 shopcart里传递参数...  配送费和起送费.....-->
      <shopcart ref="shopcart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice"
                :min-price="seller.minPrice">
      </shopcart>
    </div>
    <food :food="selectedFood" ref="food" @add="cartAdd"></food> <!--// 通过food把selectedFood传过去-->
    <!--// 调用子组件food的show方法，ref="food"建立与子组件的通讯-->
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import shopcart from '../../components/shopcart/shopcart.vue';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';
  import food from '../../components/food/food.vue';
  const ERR_OK = 0;
  export default {
    props: {// 接收传进来的seller
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      };
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      },
      selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.goods = response.data;
         // console.log(this.goods);
          // this.$nextTick() => 在下次 DOM 更新循环结束之后执行延迟回调。
          // 在修改数据之后立即使用这个方法，获取更新后的 DOM。
          // 数据发生变化后，不能直接更新在dom上，需要在回调函数中刷新DOM,即异步加载DOM
          this.$nextTick(() => {
            this._initScroll();
            this._calculateHeight();
          });
        }
      });
    },
    methods: {
      selectFood(food, event) {
        // 自己开发的event._constructed是为true,pc浏览器没有此事件
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        this.$refs.food.show(); // 调用子组件的show方法
      },
      /* getFood(el) {
        this.$nextTick(() => {
          this.$refs.shopcart.drop(el);
        });
      }, */
      // 监听右侧添加食品的动作事件,把cartControl.vue中点击的对象通过target
      // 传到父组件goods.vue文件里面
      cartAdd(target) {
        // dom元素更新后执行， 因此此处能正确打印出更改之后的值；
        this.$nextTick(() => { // 体验优化,异步执行下落动画
          // 调用 shopcart,给这个组件定义一个小球下落的函数
          // 然后在shopCart.vue文件里面定义drop()函数，描写一个小球下落的动作
          // 通过this.$refs.shopcart拿到子组件，然后就可以调用子组件里面定义的方法
          this.$refs.shopcart.drop(target);// 调用子组件shopCart.vue中定义的drop()方法
        });
      },
      // 左右连动映射
      selectMenu(index, event) {
        // 自己开发的event._constructed是为true,pc浏览器没有此事件
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
        /* console.log(index); */
      },
      _initScroll() {
        //   this.$refs：取得DOM对象
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true // 取消默认阻止事件
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          click: true, // 取消默认阻止事件
          probeType: 3 // 监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          // 获取每个li的高度，放入一个数组中
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      getEvent(el) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(el);
        });
      }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "goods.styl"
</style>
