<template>
  <div>
    <div class="shopcart">
      <div class="content">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-shopping_cart"></use>
              </svg>
            </div>
          </div>
          <div class="price">
            ￥0
          </div>
          <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{ payDesc }}
          </div>
        </div>
      </div>
    </div>
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

</style>
<script type="text/ecmascript-6">
  export default {
    props: {
      minPrice: {
        type: Number,
        default: 0
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
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
    },
    data() {

    },

  }
</script>
