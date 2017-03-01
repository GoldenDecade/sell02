<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" >
        <svg class="icon inner" aria-hidden="true"
             @click.stop.prevent.capture="decreaseCart">
          <use xlink:href="#icon-remove_circle_outline"></use>
        </svg>
      </div>
    </transition>

    <div class="cart-count" v-show="food.count>0" >{{food.count}}</div>

    <div class="cart-add">
      <svg class="icon inner" aria-hidden="true"
           @click.stop.prevent.capture="addCart">
        <use xlink:href="#icon-add_circle"></use>
      </svg>
    </div>

  </div>
</template>
<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    .cart-decrease
      display inline-block
      vertical-align middle

      /*最终状态*/
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        padding: 6px
        display: inline-block
        font-size: 24px
        color: rgb(0, 160, 220)
        line-height 24px
        /*最终状态*/
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
        .inner
          transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display inline-block
      vertical-align middle
      font-size: 10px
      color: rgb(147,153,159)
      line-height 24px
    .cart-add
      display inline-block
      vertical-align middle
      .inner
        padding: 6px
        font-size: 24px
        color: rgb(0, 160, 220)
        line-height 24px
</style>
<script type="text/ecmascript-6">
  //将food.count变为全局的  （其实可以使用vuex）
  import Vue from 'vue'
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      decreaseCart(event) {
        if(!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--;
        }
      },
      addCart(event){
        if(!event._constructed) {
          return
        }
        if(!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        //告知父元素  现在点击的是哪个元素  从而得出元素的位置
        //这样就确定了小球的起始点
        this.$emit('add', event.target)
      }
    }
  }
</script>
