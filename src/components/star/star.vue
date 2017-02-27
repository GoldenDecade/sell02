<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass, index) in itemClasses"
              :class="itemClass" class="star-item" key="index"></span>
    </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .star
        font-size: 0
        .star-item
            display: inline-block
            background-repeat no-repeat

        &.star-24
            .star-item
                width: 10px
                height: 10px
                background-size: 10px 10px
                &.on
                    bg-image(star24_on)
                &.off
                    bg-image(star24_off)
                &.half
                    bg_image(star24_half)
        &.star-36
            .star-item
                width: 15px
                height: 15px
                background-size: 15px 15px
                &.on
                    bg-image(star36_on)
                &.off
                    bg-image(star36_off)
                &.half
                    bg_image(star36_half)
        &.star-48
            .star-item
                width: 20px
                height: 20px
                background-size: 20px 20px
                &.on
                    bg-image(star48_on)
                &.off
                    bg-image(star48_off)
                &.half
                    bg_image(star48_half)


</style>
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
    }
</script>
