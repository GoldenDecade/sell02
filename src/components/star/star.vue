<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass"
          class="star-item" key="index"></span>
  </div>
</template>

<script type="text/ecmascript-6">

    const LENGTH = 5
    const CLS_ON = 'on'
    const CLS_HALF = 'half'
    const CLS_OFF = 'off'
    export default {
        props: {
            score: {
                type: Number
            },
            size: {
                type: Number
            }
        },
        computed: {
            starType() {
                return 'star-'+this.size
            },
            itemClasses() {
                //3.2 生成3个星 2个空   6.4/2 ==> 3
                //3.7  3个星 1个半星 1个空星  7.4/2 ==>3.5
                let result = []
                let score = Math.floor(this.score * 2)/2
                let integer = Math.floor(score)
                let hasDecimal = score % 1 !== 0
                for(let i = 0; i< integer; i++) {
                    result.push(CLS_ON)
                }
                if(hasDecimal) {
                    result.push(CLS_HALF)
                }
                while( result.length < LENGTH) {
                    result.push(CLS_OFF)
                }
                return result
            }

        }
    };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .star
    font-size: 0
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 16px
        height: 16px
        margin-right: 6px
        background-size: 16px 16px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>


