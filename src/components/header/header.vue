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
      >
        <span class="count">{{ seller.supports.length}}个</span>
        <svg class="icon" aria-hidden="true"
             @click="showDetail">
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
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="content-wrapper">
              <div class="title">
                <div class="line"></div>
                <div class="text">优惠信息</div>
                <div class="line"></div>
              </div>
              <ul v-if="seller.supports"
                   class="supports">
                <li class="support-item"
                    v-for="(item, index) in seller.supports">
                  <span class="theIcon" :class="classMap[item.type]"></span>
                  <span class="text">{{item.description}}</span>
                </li>
              </ul>
              <div class="title">
                <div class="line"></div>
                <div class="text">商家公告</div>
                <div class="line"></div>
              </div>
              <div class="bulletin">
                <p class="content">{{seller.bulletin}}</p>
              </div>
            </div>

          </div>
        </div>
        <div class="detail-close" >
          <svg class="icon" aria-hidden="true"
               @click="hideDetail">
            <use xlink:href="#icon-close"></use>
          </svg>
        </div>
      </div>
    </transition>

  </div>
</template>

<script type="text/ecmascript-6">
  import star from "components/star/star.vue"
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
    //classMap 必须与后台的数据一一对应
    // 意义在于：后台第一个是减少  因为图片中有decrease
    //所以我们加载背景图片的时候可以传入数组的元素名字就行  加以区分
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    star
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/iconfont.css"
  @import "../../common/stylus/mixin"
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
          bg-image(brand)
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
    z-index: 300
    -webkit-backdrop-filter blur(10px)
    background-color: rgba(7,17,27,0.8)
    &.fade-enter-active, &.fade-leave-active {
      opacity: 1
      transition: all .5s
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0
      background: rgba(7,17,27,0)
    }
    .detail-wrapper
      width: 100%
      min-height: 100%
      .detail-main
        padding-bottom: 64px
        .name
          margin: 0
          padding: 64px 0 16px 0
          font-size: 16px
          font-weight: 700
          line-height: 16px
          text-align: center
        .star-wrapper
          text-align: center
          /*这里用的是80%  */
        .content-wrapper
          margin-top: 28px
          padding: 0 10%
          width: 80%
        .title
          display: flex
          margin-bottom: 24px
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid #61676d
          .text
            padding: 0 12px
            font-size: 14px
            font-weight: 700

        .supports
          margin-bottom: 28px
          font-size: 0
          .support-item
            margin-bottom: 12px
            &:last-child
              margin-bottom: 0
            .theIcon
              display: inline-block
              vertical-align top
              margin-right: 6px
              width: 16px
              height: 16px
              background-size: cover
              background-repeat no-repeat
              &.special
                bg-image(special_2)
              &.invoice
                bg-image(invoice_2)
              &.guarantee
                bg-image(guarantee_2)
              &.decrease
                bg-image(decrease_2)
              &.discount
                bg-image(discount_2)

            .text
              height: 16px
              font-size: 12px
              line-height 16px
        .bulletin
          .content
            font-size: 12px
            line-height 24px
    .detail-close
      margin: -64px auto 0
      height: 32px
      font-size: 32px
      text-align: center
      color: rgba(255,255,255,0.5)


</style>
