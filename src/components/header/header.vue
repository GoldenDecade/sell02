<template>
  <!--header  头部-->
  <div class="header">
    <!--顶部-->
    <div class="content-wrapper">
      <!--左侧图片-->
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <!--右侧内容-->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="iconPic" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <!--显示详细优惠信息  5个-->
      <div v-if="seller.supports"
           class="support-count"
           @click="showDetail"
      >
        <span class="count">{{ seller.supports.length}}个</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-keyboard_arrow_right"></use>
        </svg></div>
      <!--弹出页-->
    </div>
    <!--公告-->
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-keyboard_arrow_right"></use>
      </svg>
    </div>
    <!--顶部背景图片-->
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!--弹出页-->
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper">
          <div class="detail-main"></div>
        </div>
        <div class="detail-close" @click="hideDetail">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    seller: {
      type : Object,
      required: true
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/iconfont.css"
  @import '../../common/stylus/mixin'
.header
  position: relative
  overflow: hidden
  color: #fff
  background: rgba(7,17,27,0.5)
/*顶部内容*/
  .content-wrapper
    position: relative
    padding: 24px 12px 18px 24px
    font-size: 0
    .avatar
      display: inline-block
      vertical-align: top
      img
        border-radius: 2px
    .content
      margin-left: 16px
      display: inline-block
      .title
        margin: 2px 0 8px 0
        .brand
          display: inline-block
          vertical-align: top
          width: 30px
          height: 18px
          bg-image('brand')
          background-size: 30px 18px
          background-repeat: no-repeat
        .name
          margin-left: 6px
          font-size: 16px
          font-weight: bold
          line-height: 18px
      .description
        margin-bottom: 10px
        font-size: 12px
        font-weight: 200
        line-height 12px
      .support
        .iconPic
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.special
            bg-image('special_1')
          &.invoice
            bg-image('invoice_1')
          &.guarantee
            bg-image('guarantee_1')
        .text
          margin-left: 4px
          font-size: 10px
          line-height 12px


    .support-count
      position: absolute
      right: 12px
      bottom: 18px
      padding: 7px 8px
      height: 14px
      font-size: 10px
      line-height 14px
      border-radius: 7px
      background-color: rgba(0, 0, 0, 0.2)
      .count
        margin-right: 2px
      .icon
        font-size: 10px
/*公告样式*/
  .bulletin-wrapper
    position: relative
    height: 28px
    line-height 28px
    padding: 0 22px 0 12px
    background-color: rgba(7, 17, 27, 0.2)
    .bulletin-title
      display: inline-block
      vertical-align top
      margin-top: 8px
      width: 22px
      height: 12px
      bg-image('bulletin')
      background-size: 22px 12px
    .bulletin-text
      display: inline-block
      vertical-align top
      margin: 0 4px
      width: 85%
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      font-size: 10px
      line-height 28px
    .icon
      position: absolute
      right: 12px
      top: 8px
      font-size: 10px
/*顶部背景*/
  .background
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: -1
/*弹出页*/
  .detail
    position: fixed
    left: 0
    top: 0
    width: 100%
    height 100%
    overflow: auto
    -webkit-backdrop-filter blur(10px)
    opacity: 1
    background-color: rgba(7,17,27,0.8)
    .detail-wrapper
      width: 100%
      min-height: 100%
      .detail-main
        padding-bottom: 64px
    .detail-close
      margin: -64px auto 0
</style>
