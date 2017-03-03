<template>
    <div class="ratingselect border-1px">
      <div class="rating-type border-1px">
        <span
          @click="select(2, $event)"
          class="block positive"
          :class="{'active': selectType === 2}"
        >{{desc.all}}
        <span class="count">{{ ratings.length}}</span>
        </span>
        <span
          @click="select(1, $event)"
          class="block positive"
          :class="{'active': selectType === 1}"
        >{{desc.positive}}
        <span class="count">{{positive.length}}</span>
        </span>
        <span
          @click="select(0, $event)"
          class="block negative"
          :class="{'active': selectType === 0}"
        >{{desc.negative}}
        <span class="count">{{negative.length}}</span>
        </span>
      </div>

      <div class="switch" :class="{on: onlyContent}">
        <svg class="icon" @click="toggleContent">
          <use xlink:href="#icon-check_circle"></use>
        </svg>
        <span class="text">只看有内容的评价</span>
      </div>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/base.styl"
  @import "../../common/stylus/mixin.styl"
  .ratingselect
    padding: 0 18px
    border-1px(rgb(7,17,27,0.1))
    .rating-type
      padding-bottom: 18px
      border-1px(rgb(7,17,27,0.1))
      font-size: 0
      .block
        display: inline-block
        vertical-align top
        margin-right: 8px
        padding: 8px 12px
        font-size 12px
        line-height 32px
        border-radius: 2px
        color: rgb(77,85,93)
        &.positive
          background-color: #CCECF8
        &.negative
          background-color: #E9EAEC
        &.active
          background-color: #009FDB
          color: #fff
        .count
          display inline-block
          vertical-align bottom
    .switch
      padding: 12px 0
      .icon
        display: inline-block
        vertical-align top
        font-size: 24px
        line-height: 24px
        color: rgb(147,153,159)
      &.on
        .icon
          color: #00c850
      .text
        display: inline-block
        vertical-align top
        font-size: 12px
        line-height: 24px
        color: rgb(147,153,159)

</style>
<script type="text/ecmascript-6">
  const ALL = 2
  const POSITIVE = 1
  const NEGATIVE = 0
  export default {
    props: {
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      ratings: {
        type: Array,
        default() {
          return [];
        }
      }
    },//props
    data() {
      return {
        desc: {
          all: "全部",
          positive: "满意",
          negative: "不满意"
        }
      }
    },//data
    methods: {
//当前选择的是哪一个  传的参数很有用
      select(type, event) {
        if(!event._constructed) {
          return
        }
        this.$emit("select", type)
      },
//子向父发命令 执行父组件中的事件  逻辑不在子中写
      toggleContent(event) {
        if(!event._constructed) {
          return
        }
        this.$emit("toggle")
      },
    },//methods
    computed: {
      positive() {
        return this.ratings.filter((rating)=> {
          return rating.rateType === POSITIVE
        })
      },
      negative() {
        return this.ratings.filter((rating)=> {
          return rating.rateType === NEGATIVE
        })
      }
    },//computed

  }
</script>


