<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <div class="title">{{ seller.name }}</div>
        <div class="desc border-1px">
          <star :size="24" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <div class="remark border-1px">
          <div class="block">
            <div class="block-text">起送价</div>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </div>
          <div class="block">
            <div class="block-text">商家配送</div>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </div>
          <div class="block">
            <div class="block-text">平均配送时间</div>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </div>
        </div>
        <div class="favorite" @click="toggleFavorite">
          <svg class="icon heart" aria-hidden="true" :class="{on: favorite}">
            <use xlink:href="#icon-favorite"></use>
          </svg>
          <span class="text">已收藏</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">
          公告与活动
        </div>
        <div class="content-wrapper border-1px">{{seller.bulletin}}</div>
        <ul v-if="seller.supports" class="supports">
          <li v-for="(item, index) in seller.supports"
              class="support-item border-1px">
            <span class="icon list-icon" :class="classMap[index]"></span>
            <span class="text">{{ item.description }}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <div class="title">商家实景</div>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li v-for="(item, index) in seller.pics" class="pic-item">
              <img :src="item" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <div class="title">商家信息</div>
        <div class="info-item border-1px" v-for="(item, index) in seller.infos">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {saveToLocal, loadFromLocal} from "common/js/store.js"
  import BScroll from "better-scroll"
  import split from "components/split/split.vue"
  import star from "components/star/star.vue"

export default {
  props: {
    seller: {
      type: Object
    }
  },
  data(){
    return {
      favorite(){
        return loadFromLocal(this.seller.id, "favorite", false)
      }
    }
  },
  //BScroll （1）必须等到DOM元素生成之后才能 new BScroll
  //        （2）内层的宽度或者高度必须大于外层
  //        （3）默认是scrollY   横向就要写scrollX
  //监听到seller发生变化就初始化better-scroll
  watch: {
    'seller'() {
      this.$nextTick(()=> {  //等数据有变化的时候，就要用nextTick
        this._initScroll()
        this._initPicScroll()
      })
    }
  },
  /*mounted() {
    this.$nextTick(()=> {
      this._initScroll()
      this._initPicScroll()
    })
  },*/

  methods: {
    toggleFavorite(event) {
      if(!event._constructed) {
        return
      }
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, "favorite",this.favorite)
    },
    _initScroll() {
      if (!this.sellerScroll) {
        this.sellerScroll = new BScroll(this.$refs.seller, {
          click: true
        })
      } else {
        this.sellerScroll.refresh()
      }
    },
    //计算ul的宽度  只有内层的宽度大于外层的时候，才能横向滚动（才能使用BScroll）
    _initPicScroll() {
      if (this.seller.pics) {
        let picWidth = 120
        let marginRight = 6
        let width = (picWidth + marginRight) * this.seller.pics.length - marginRight
        this.$refs.picList.style.width = width + "px"
        this.$nextTick(()=> {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs.picWrapper, {
              scrollX: true,
              eventPassthrough: "vertical"
            })
          } else {
            this.picScroll.refresh()
          }
        })
      }
    },
  },
  components: {
    split, star
  },

  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  .seller
    position: absolute
    top: 174px
    left: 0
    bottom: 0
    overflow: hidden
    width: 100%
    .seller-content
      padding: 18px 18px
      .overview
        position: relative
        .title
          margin-bottom: 8px
          font-size: 14px
          line-height: 14px
          color: rgb(7,17,27)
        .desc
          margin-bottom: 18px
          .star
            display inline-block
            vertical-align top
            margin-right: 8px
          .text
            margin-right: 12px
            font-size: 10px
            color: rgb(77,85,93)
            &:last-child
              margin-right: 0

        .remark
          display: flex
          justify-content space-around
          padding: 18px 0 0 0
          border-top-1px(rgba(7,17,27,.1))
          .block
            box-sizing: border-box
            width: 33.33%
            border-right: 1px solid rgba(7,17,27,0.1)
            font-size: 10px
            line-height 10px
            text-align center
            .block-text
              margin-bottom: 4px
            .content
              vertical-align bottom
              .stress
                font-size: 24px
                line-height 24px
                color: rgb(7,17,27)
        .favorite
          position: absolute
          right: 0
          top: 0
          width: 50px
          text-align center
          .heart
            display: block
            width: 50px
            font-size: 24px
            line-height 24px
            margin-bottom: 4px
            &.on
              color: rgb(240,20,20)
          .text
            display: block
            font-size: 10px
            line-height 10px
            color: rgb(77,85,93)

      .bulletin
        .title
          margin-bottom: 8px
          font-size: 14px
          color: rgb(7,17,27)
          line-height 14px
        .content-wrapper
          box-sizing border-box
          padding: 0 12px
          width: 100%
          font-size 12px
          line-height 24px
          color: rgb(240,20,20)

        .supports
          margin-top: 16px
          .support-item
            padding: 16px 12px
            border-top-1px(rgba(7,17,27,.1))
            .list-icon
              display: inline-block
              vertical-align top
              margin-right: 6px
              width: 16px
              height: 16px
              background-repeat no-repeat
              background-size cover
              &.decrease
                bg-image(decrease_4)
              &.discount
                bg-image(discount_4)
              &.guarantee
                bg-image(guarantee_4)
              &.invoice
                bg-image(invoice_4)
              &.special
                bg-image(special_4)
            .text
              display: inline-block
              vertical-align top
              font-size 12px
              line-height 16px
              color: rgb(7,17,27)




      .pics
        padding: 0 0 0 18px
        .title
          margin-bottom: 12px
        .pic-wrapper
          width: 100%
          overflow: hidden
          .pic-list
            font-size: 0
            .pic-item
              display: inline-block
              margin-right: 6px
              width: 120px
              height: 90px
              &:last-child
                margin-right: 0
      .info
        padding: 0 18px
        .title
          margin-bottom: 12px
          font-size 14px
          color: rgb(7,17,27)
          line-height 14px
        .info-item
          padding: 16px 12px
          font-size 12px
          line-height 16px
          color: rgb(77,85,93)
          border-top-1px(rgba(7,17,27,.1))
</style>
