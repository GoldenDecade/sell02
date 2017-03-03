<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <!--顶部评分-->
      <div class="overview">
        <div class="overview-left">
          <h2 class="score">{{seller.score}}</h2>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
<!--服务态度和食品评价  模板一样只是数据不一样而已-->
          <!--组件的灵活运用-->
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :score="seller.serviceScore" :size="36"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :score="seller.foodScore" :size="36"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="deivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <!--split-->
      <split></split>
      <!--选择部分
      选择三者之一   选择onlyContent-->
      <ratingselect
        @select="selectRating"
        @toggle="toggleContent"
        :selectType="selectType"
        :onlyContent="onlyContent"
        :ratings="ratings">
      </ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="(rating, index) in ratings"
              v-show="needShow(rating.rateType, rating.text)"
          class="rating-item border-1px"
          >

            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>

            <div class="content">
              <div class="name">{{rating.username}}</div>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery"
                      v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate }}
              </div>
              <div class="text">{{rating.text}}</div>
              <div class="recommend"
                   v-show="rating.recommend && rating.recommend.length ">
                <svg class="icon" v-show="rating.rateType === UP">
                  <use xlink:href="#icon-thumb_up"></use>
                </svg>
                <svg class="icon" v-show="rating.rateType === DOWN">
                  <use xlink:href="#icon-thumb_down"></use>
                </svg>
                <span class="item" v-for="item in rating.recommend">
                  {{item}}
                </span>
              </div>
            </div>


          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  @import "../../common/stylus/base.styl"
  .ratings
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .ratings-content
      .overview
        display: flex
        padding: 18px 0 0
        .overview-left
          flex: 0 0 137px
          padding: 6px 0
          width: 137px
          text-align center
          border-right: 1px solid #ccc
          @media only screen and (max-width: 320px)
            flex: 0 0 120px
            width: 120px
          .score
            margin: 0 0 6px
            font-size: 24px
            color: rgb(255,153,0)
            line-height 28px
          .title
            margin-bottom: 8px
            font-size: 12px
            color: rgb(7, 17, 27)
            line-height 12px
          .rank
            font-size: 10px
            line-height 10px
            color: rgb(7, 17, 27)
        .overview-right
          flex: 1
          padding: 6px 12px
          @media only screen and (max-width: 320px)
            padding: 6px 6px
          .score-wrapper
            margin-bottom: 8px
            font-size: 12px
            color: rgb(7, 17, 27)
            .title
              display: inline-block
              vertical-align top
              line-height 18px
            .star
              display: inline-block
              vertical-align top
              margin: 0 12px
              @media only screen and (max-width: 320px)
                margin: 0 0
            .score
              display: inline-block
              vertical-align top
              line-height 18px
              color: rgb(255,153,0)
          .deivery-wrapper
            font-size: 12px
            line-height 18px
            .title
              display: inline-block
              vertical-align top
              margin-right: 12px
              color: rgb(7, 17, 27)
            .delivery
              display: inline-block
              vertical-align top
              color: rgb(147,153,159)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          display: flex
          padding: 18px 0
          border-1px(rgb(7,17,27,0.1))
          .avatar
            flex: 0 0 28px
            width: 28px
            margin-right: 12px
            img
              border-radius: 50%
          .content
            position: relative
            flex: 1
            .name
              margin-bottom: 4px
              font-size: 10px
              color: rgb(7,17,27)
              line-height: 12px
            .star-wrapper
              margin-bottom: 6px
              height: 12px
              .star
                display inline-block
                vertical-align top
                margin-right: 6px
              .delivery
                display inline-block
                vertical-align top
                font-size: 10px
                line-height: 12px
                color: rgb(147,153,159)
            .time
              position: absolute
              right: 0
              top: 0px
              font-size: 10px
              line-height: 12px
            .text
              margin-bottom: 8px
            .recommend
              .item
                display: inline-block
                vertical-align middle
                margin: 0 0 8px 8px
                padding: 6px 8px
                border: 1px solid rgba(7,17,27,0.1)
                border-radius: 1px
                background-color: #fff
                font-size: 9px
                color: rgb(147,153,159)
</style>
<script type="text/ecmascript-6">
  import BScroll from "better-scroll"
  import star from "components/star/star.vue"
  import split from "components/split/split.vue"
  import ratingselect from "components/ratingselect/ratingselect.vue"
  import {formatDate} from 'common/js/date';

  const ERR_OK = 0
  const ALL = 2

  export default {
    props: {
      seller: {
        type: Object,
        required: true
      }
    },//props
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true,
        UP: 0,
        DOWN: 1
      }
    },//data
    created() {
      this.$http.get("/api/ratings").then((res)=> {
        res = res.body
        if(res.errno === ERR_OK) {
          this.ratings = res.data
        }
        this.$nextTick(() => {
          this.ratingScroll = new BScroll(this.$refs.ratings, {
            click: true
          })
        })
      })
    },//created
    //过滤器
    filters: {
      formatDate(time){
        let date = new Date(time)
        return formatDate(date,"yyyy-MM-dd hh:mm")
      }
    },//filters
    methods: {
      //改变rating  需不需要显示
      needShow(type, text) {  //返回  布尔值
        //只看有内容的
        if(this.onlyContent && !text) {
          return false
        }
        //选择哪一个看哪一个
        if(this.selectType === ALL) {
          return true
        }else {
          return type === this.selectType
        }
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
      },
      //改变this.selectType  更新视图
      selectRating(type) {
        this.selectType = type
        this.$nextTick(()=> {
          this.ratingScroll.refresh()
        })
      },

    },
    components: {
      star, split, ratingselect
    },//components
  }
</script>
