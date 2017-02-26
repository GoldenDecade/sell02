<template>
  <div>
    <v-header :seller="seller"></v-header>
    <router-link to="/goods">商品</router-link>
    <router-link to="/seller">商家</router-link>
    <router-link to="/ratings">评论</router-link>
    <router-view></router-view>
  </div>
</template>

<script type='text/ecmascript-6'>
  import { urlParse } from 'common/js/util'
import header from 'components/header/header.vue'
  const ERR_OK = 0
export default {
  data() {
    return {
      seller: {
        id: (()=>{
          let queryParam = urlParse()
          return queryParam.id
        })()
      }
    }
  },
  created() {
    //vue-resource
    this.$http.get('/api/seller?id='+this.seller.id).then((res) => {
      res = res.body
      if(res.errno === ERR_OK) {

      }
    })
  },
  components: {
    'v-header': header
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
