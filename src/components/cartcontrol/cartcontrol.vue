<template>
  <div class="cartcontrol">
    <div class="cart-decrease">
      <svg class="icon inner" aria-hidden="true" v-show="food.count>0"
           @click.stop.prevent="decreaseCart">
        <use xlink:href="#icon-remove_circle_outline"></use>
      </svg>
    </div>

    <div class="cart-count" v-show="food.count>0" >{{food.count}}</div>
    <div class="cart-add">
      <svg class="icon inner" aria-hidden="true"
           @click.stop.prevent="addCart">
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
      .inner
        padding: 6px
        font-size: 24px
        color: rgb(0, 160, 220)
        line-height 24px

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
        this.$emit('add', event.target)
      }
    }
  }
</script>
