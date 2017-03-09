<template>
  <transition name="move">
    <div class="food" ref="food"
    v-show="showFlag">
      <div class="food-content">
        <!--顶部图片开始-->
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <svg class="icon"
                 aria-hidden="true"
                 >
              <use xlink:href="#icon-arrow_lift"></use>
            </svg>
          </div>
        </div>
        <!--顶部图片结束-->
        <!--商品详情开始-->
        <div class="content">
          <div class="title">{{food.name}}</div>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">

          </div>
          <transition name="fade">
            <div class="buy">
              加入购物车
            </div>
          </transition>
        </div>
        <!--商品详情结束-->
      </div>
    </div>
  </transition>
</template>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    width: 100%
    background-color: #fff
    transform translate3d(0, 0, 0)
    &.move-enter, &.move-leave-active
      transform translate3d(100%, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    .food-content
      .image-header
        position: relative
        width: 100%
        img
          width: 100%
          height: 100%
        .back
          position: absolute
          left: 0
          top: 0
          .icon
            display: block
            padding: 10px
            font-size: 20px
            color: #fff


      .content
        position: relative
        padding: 18px 18px 0
        .title
          font: 700 14px/14px
          color: rgb(7,17,27)
        .detail
          margin-bottom: 18px
          color: rgb(147,153,159)
          font-size 10px
          .sell-count
            margin-right: 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size: 14px
            color: rgb(240,20,20)
          .old
            font-size 10px
            color: rgb(147,153,159)
            text-decoration line-through
        .cartcontrol-wrapper
          position: absolute
          right: 18px
          bottom: 0

</style>
<script type="text/ecmascript-6">

  export default {
    props: {
      food: {
        type: Object
      }
    }, //props
    data() {
      return {
        showFlag: false
      }
    },//data
    methods: {
      hide() {
        this.showFlag = false
      },
      show() {
        this.showFlag = true
      }
    }, //methods
  }
</script>
