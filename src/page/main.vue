<template>
	<div>
		<router-view></router-view>
		<van-tabbar :route="true" v-model="active">
		  <van-tabbar-item to="/" icon="wap-home">
      商城
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.shop.active : icon.shop.normal"
        >
      </van-tabbar-item>
		  <van-tabbar-item to="/myhome" icon="contact" >
      我的
      <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.home.active : icon.home.normal"
        >
      </van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
export default {
  name: 'mymain',
  data () {
    return {
      active: 0,
      cartCount:'',
      icon: {
        shop:{
          normal: '../../static/imgs/icon/shop_dark.png',
          active: '../../static/imgs/icon/shop_active.png'
        },
        home:{
          normal: '../../static/imgs/icon/home_dark.png',
          active: '../../static/imgs/icon/home_active.png'
        }
      }
    }
  },
  mounted(){

  }
}
</script>

<style scoped>

</style>
