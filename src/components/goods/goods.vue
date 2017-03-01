<template>
  <div>
      <div class="goods">
        <!--左侧菜单-->
        <div class="menu-wrapper" ref="menuWrapper">
          <ul>
            <li v-for="(item, index) in goods"
            class="menu-item"
            :class="{'current': currentIndex === index}"
            @click="selectMenu(index, $event)">

              <span class="text border-1px">
                <span v-show="item.type> 0"
                      class="theIcon"
                      :class="classMap[item.type]"
                ></span>{{item.name}}

              </span>
            </li>
          </ul>
        </div>
        <!--右侧列表-->
        <div class="foods-wrapper" ref="foodsWrapper">
          <ul>
            <li v-for="(item, index) in goods"
            class="food-list" ref="foodList">
              <h2 class="title">{{ item.name }}</h2>
              <ul>
                <li v-for="(food, index) in item.foods"
                  class="food-item border-1px">
                  <div class="theIcon">
                    <img width="57" height="57" :src="food.icon">
                  </div>
                  <div class="content">
                    <h2 class="name">{{food.name}}</h2>
                    <p class="desc" v-if="food.description">{{food.description}}</p>
                    <div class="extra">
                      <span class="count">月售{{food.sellCount}}份</span>
                      <span>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                      <span class="now">￥{{food.price}}</span>
                      <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <!--右侧加减号-->
                    <div class="cartcontrol-wrapper">
                      <cartcontrol @add="addFood"
                                   :food="food">
                      </cartcontrol>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <!--底部购物车  需要所选的商品（是一个数组）-->
        <shopcart
          :minPrice="seller.minPrice"
          :deliveryPrice="seller.deliveryPrice"
          :selectFoods="selectFoods"
          ref="shopcart"
        ></shopcart>

      </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 48px
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        padding:  0 12px
        width: 56px
        height: 54px
        line-height: 14px
        &.current
          background-color: #ffffff
        .text
          display: table-cell
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7,17,27,0.1))
          .theIcon
            display: inline-block
            vertical-align top
            width: 12px
            height: 12px
            background-size: 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image(decrease_3)
            &.special
              bg-image(special_3)
            &.discount
              bg-image(discount_3)
            &.guarantee
              bg-image(guarantee_3)
            &.invoice
              bg-image(invoice_3)
    .foods-wrapper
      flex: 1
      .food-list
        .title
          margin: 0
          padding: 0 0 0 12px
          height: 26px
          line-height: 26px
          font-size: 12px
          background-color: #f3f5f7
          border-left: 2px solid #d9dde1
        .food-item
          display: flex
          margin: 0 18px
          padding: 18px 0
          border-1px(rgba(7,17,27,0.1))
          &:last-child
            border-none()
          .theIcon
            flex: 0 0 57
            vertical-align top
            margin-right: 10px
          .content
            flex: 1
            vertical-align top
            .name
              margin: 0 0 8px
              font-size: 14px
              color: rgb(7,17,27)
              line-height 14px
            .desc
              margin: 0 0 8px
              font-size: 10px
              color: rgb(147,153,159)
              line-height: 10px
            .extra
              font-size: 10px
              color: rgb(147,153,159)
              line-height: 10px
              .count
                margin-right: 6px
            .price
              .now
                margin-right: 8px
                font-size: 14px
                color: #f01414
              .old
                font-size: 10px
                color: #93999f
                text-decoration line-through
            .cartcontrol-wrapper
              position: absolute
              right: 0
              bottom: 8px

</style>
<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import shopcart from "components/shopcart/shopcart.vue"
import cartcontrol from "components/cartcontrol/cartcontrol.vue"

const ERR_OK = 0
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        goods: [], //请求过来的商品
        scrollY: 0,
        listHeight: [],  //存储左侧li所对应右侧的高度

      }
    },
    computed: {
      //当前右侧应该对应的是哪个li
      currentIndex() {
        //计算this.scrollY在this.listHeight中的位置
        //这样就知道index了
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (Math.abs(this.scrollY) >= height1 && Math.abs(this.scrollY) < height2)) {
            return i
          }
        }
        return 0
      },
      //已经选择的商品（就是food.count > 0的商品）
      selectFoods() {
        let foods = []
        this.goods.forEach((good)=> {
          good.foods.forEach((food)=> {
            if(food.count > 0) {
              foods.push(food)
            }
          })
        })
        return foods
      }

    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      //请求数据
      this.$http.get("/api/goods").then(function (res) {
        res = res.body
        if (res.errno === ERR_OK) {
          this.goods = res.data
          //获取到数据之后  调用this.$nextTick(cb),在回掉函数中初始化滚动
          //并且缓存高度
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }

      })
    },
    methods: {
      //初始化滚动
      _initScroll() {
        //左侧滑动
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        })
        //右侧滑动
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3,
          click: true
        })
        //获取到右侧滑动位置
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = pos.y
        })
      },
      //初始化的时候就缓存高度
      _calculateHeight() {
        let foodList = this.$refs.foodList
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodList.length; i++) {
          let itemHeight = foodList[i].clientHeight
          height += itemHeight
          this.listHeight.push(height)
        }
      },
      //点击左侧列表  显示右侧对应列表
      selectMenu(index, event) {
        if(!event._constructed) {  //表明是better-scroll的事件
          return;
        }
        console.log(event);
        //派发右侧列表进行滚动
        let foodList = this.$refs.foodList
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      //点击加减号  让父组件产生变化
      addFood(target) {
        this._drop(target)

      },
      _drop(target) {
        // 体验优化,异步执行下落动画
        this.$nextTick(() => {
          this.$refs.shopcart.drop(target);
        });
      },
    },
    components: {
      shopcart,
      cartcontrol
    }
  }
</script>
