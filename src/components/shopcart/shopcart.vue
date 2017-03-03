<template>
  <div>
    <div class="shopcart">
      <!--购物车底部内容-->
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shopping_cart"></use>
              </svg>
            </div>
            <div class="num" >{{totalCount}}</div>
          </div>
          <div class="price">
            ￥{{totalPrice}}
          </div>
          <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{ payDesc }}
          </div>
        </div>
      </div>
      <!--购物车折叠内容-->
      <transition name="fold">
        <div class="shopcart-list"
             v-show="listShow"
        >
          <div class="list-header">
            <h2 class="title">购物车</h2>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content"
               ref="listContent">
            <ul>
              <li class="food"
                  v-for="(food, index) in selectFoods">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"
                               @add="addFood">
                  </cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <!--小球容器-->
      <div class="ball-container">
        <div v-for="(ball, index) in balls" >
          <transition name="drop"
                      @before-enter="beforeDrop"
                      @enter="dropping"
                      @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!--当显示折叠列表时候，背景-->
    <transition name="fade">
      <div class="list-mask"
           @click="listHide"
           v-show="listShow">
      </div>
    </transition>

  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shopcart
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    height: 48px
    z-index: 50
    .content
      display: flex
      background-color: #141d27
      font-size: 0
      color: rgba(255,255,255,0.4)
      .content-left
        flex: 1
        .logo-wrapper
          box-sizing: border-box
          display: inline-block
          vertical-align top
          margin: 0 12px
          padding: 6px
          position: relative
          top: -10px
          width: 56px
          height: 56px
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            line-height 56px
            &.highlight
              background-color: rgb(0, 160, 220)
            .icon
              font-size: 24px

              color: #80858a
              &.highlight
                color: #fff
          .num
            padding: 0 6px
            border-radius: 6px
            height: 16px
            line-height 16px
            position: absolute
            right: 5px
            top: 0
            background-color: red

            font-size: 9px
            font-weight: 700
            text-align center
        .price
          display: inline-block
          vertical-align top
          margin-top: 12px
          padding-right: 12px
          font-size: 16px
          font-weight: 700
          line-height: 24px
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align top
          margin-left: 8px
          font-size: 12px
          color: rgba(255,255,255,0.4)
          line-height 48px
      .content-right
        flex: 0 0 85px
        width: 85px
        .pay
          height: 48px
          line-height 48px
          font-size: 12px
          font-weight: 700
          text-align: center
          &.not-enough
            background-color: #2b333b
          &.enough
            background-color: #00b43c
            color: #fff
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      width: 100%
      z-index: -1
      /*有shopcart-list多高,
      就相对于shopcart往上面偏移多高*/
      transform: translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave-active
        transform translate3d(0,0,0)
      &.fold-enter-active, &.fold-leave-active
        transition: all .5s
      .list-header
        display: flex
        justify-content space-between
        background-color: #f3f5f7
        height: 40px
        line-height 40px
        padding: 0 18px
        border-1px(rgba(7,17,27,0.1))
        .title
          margin: 0
          padding: 0
          font-size: 14px
          color: rgb(7,17,27)
        .empty
          font-size: 12px
          color: rgb(0,160,220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background-color: #fff
        .food
          padding: 12px 0
          position: relative
          font-size: 0
          border-1px(rgba(7,17,27,0.1))
          .name
            display inline-block
            vertical-align top
            font-size: 14px
          .price
            position: absolute
            right: 90px
            top: 14px
            font-size: 10px
          .cartcontrol-wrapper
            position: absolute
            right: 2px
            top: 0

    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 21px
        z-index: 200
        transition: all .4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background-color: red
          transition: all .4s linear
  .list-mask
    position: fixed
    left: 0
    right: 0
    bottom: 0
    top: 0
    opacity: 1
    background-color: rgba(7,17,27,0.6)
    backdrop-filter: blur(10px)
    z-index: 40
    &.fade-enter, &.fade-leave-active
      opacity: 0
    &.fade-enter-active, &.fade-leave-active
      transition: all .5s
</style>
<script type="text/ecmascript-6">
  import cartcontrol from "components/cartcontrol/cartcontrol.vue"
  import BScroll from 'better-scroll'
  export default {
    props: {
      //最低起送价格
      minPrice: {
        type: Number,
        default: 0
      },
      //配送费
      deliveryPrice: {
        type: Number,
        default: 0
      },
      //已经选择的商品
      selectFoods: {
        type: Array,
        default() {
          return [
            {
              price: 10,
              count: 1
            }
          ]
        }
      }
    },//props
    data() {
      return {
        fold: true, //默认是折叠的  但不是决定是否显示的
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
          },
          {
            show: false
          },
          {
            show: false
          }
        ],  //默认有5个小球，避免快速点击加号的时候，没有小球出现
        dropBalls: []  //将正在下落的小球缓存起来
      }
    },//data
    methods: {
      //让第一个show为false的小球变为show：true
      // 并且标记为dropBall
      //当运动结束后，将dropBall的第一个ball清除掉
      //让ball的show变为false，
      // 同时el（小球）元素的的display为none隐藏
      //ball是一个对象  所以一直都在改变
     drop(el) {   //el为加号元素
        for(let i=0; i< this.balls.length; i++) {
          let ball = this.balls[i]
          if(!ball.show) {
            ball.show = true
            ball.el = el
            this.dropBalls.push(ball)
//return的作用就是控制只将第一个show为false的小球
// 缓存到dropBalls中
            return   //很重要
          }
        }
      },
      //@before-enter  设置小球的起始位置
      beforeDrop(el) { //class="ball"
        let count = this.balls.length
        while (count--) {
          //必须是从后往前检测 因为前面的小球正在运动
          let ball = this.balls[count]
          if (ball.show) {

            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 21)
            //必须放在下面  否则动画不能出来
            el.style.display = 'block'
            el.style.webkitTransform = `translate3d(0,${y}px, 0)`
            el.style.transform = `translate3d(0,${y}px, 0)`
            let inner = el.getElementsByClassName('inner-hook')[0]
            inner.style.webkitTransform = `translate3d(${x}px, 0,0)`
            inner.style.transform = `translate3d(${x}px, 0,0)`
          }
        }
      },
      //@enter  注意done   设置小球的终止位置
      dropping(el, done){
        console.log('dropping');
        let rf = el.offsetHeight
        this.$nextTick(()=> {
          el.style.webkitTransform = `translate3d(0,0, 0)`
          el.style.transform = `translate3d(0,0, 0)`
          console.log(el.style.transform);
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(0, 0,0)`
          inner.style.transform = `translate3d(0, 0,0)`
          el.addEventListener('transitionend', done);

        })
      },
//@after-enter  将显示的小球隐藏display: none
// 删除dropBalls中的第一个小球
//并将这个小球的属性show变为false

      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      //是否要显示折叠列表(但不是最终决定的)
      toggleList(){
        if (!this.totalCount) {
          return
        }
        this.fold = !this.fold
      },
      //点击背景，隐藏折叠列表
      listHide() {
        this.fold = true
      },
      //加减号
      addFood(target) {
        this.drop(target);
      },
      //清空购物车
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
    },//methods
    computed: {
      //已经选择的商品个数
      totalCount(){
        let total = 0
        this.selectFoods.forEach((food)=> {
          if (food.count) {
            total += food.count
          }
        })
        return total
      },
      //所有商品的总价格
      totalPrice() {
        let sum = 0
        this.selectFoods.forEach((food)=> {
          sum += food.price * food.count
        })
        return sum
      },
      //右下角  计算状态
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice > 0 && this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else if (this.totalPrice >= this.minPrice) {
          return `去结算`
        }
      },
      //右下角  根据不同状态显示不同内容
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      //最终决定购物车折叠列表是否要显示
      //原因：
      listShow() {
        if (!this.totalCount) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          //初始化列表滚动
          this.$nextTick(()=> {
            if (!this.listScroll) {
              this.listScroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            } else {
              this.listScroll.refresh()
            }
          })

        }
        return show
      },
    },//computed
    components: {
      cartcontrol
    }
  }
</script>
