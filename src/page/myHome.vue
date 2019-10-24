<template>
  <div class="myHome layout whiteBg clear" style="margin-top:0" ref="homePage">
    <!-- <h2 class="layout_title">我的</h2> -->
    <p style="height:0.3rem;"></p>
    <div class="my_avatar mrl_40 clear">
      <p class="per_Info">
        <span class="pic">
          <img class="icon" src="../../static/imgs/icon/y-logo.png"/>
        </span>
        <!-- <span class="text">登录/注册</span> -->
        <span class="text">{{userInfo.customerPhone}}</span>
        <span v-if="userInfo.customerPhone == ''" class="arrow" @click="goLogin">
          <img class="arrowWhite" src="../../static/imgs/icon/arrow_white.png"/>
        </span>
      </p>
    </div>
    <div class="my_fun mrl_40">
      <van-cell-group :border="false">
        <van-cell title="我的订单" to="myorder" is-link>
          <template slot="icon">
            <img class="icon_img" src="../../static/imgs/icon/order.png" alt="">
          </template>
        </van-cell>
        <van-cell icon="gold-coin" title="我的地址" is-link to="addresslist">
          <template slot="icon">
            <img class="icon_img" src="../../static/imgs/icon/address.png" alt="">
          </template>
        </van-cell>
        <van-cell icon="gift" title="我的油卡" is-link to="myoilcard">
          <template slot="icon">
            <img class="icon_img" src="../../static/imgs/icon/oil.png" alt="">
          </template>
        </van-cell>
        <van-cell icon="gift" title="设置" is-link>
          <template slot="icon">
            <img class="icon_img" src="../../static/imgs/icon/setting.png" alt="">
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myhome',
  data () {
    return {
      userInfo:{}
    }
  },
  methods:{
    currentUserInfo(){
      this.api.currentUserInfo().then(res => {
        if(res.code == 0){
          this.userInfo = res.resultData
        }
      })
    },
    goLogin(){
      this.$router.push('login')
    }
  },
  created(){
    this.currentUserInfo()
  },
  mounted(){
    this.$refs.homePage.style.height = window.innerHeight +'px';
  }
}
</script>
<style scoped lang="less">
.my_fun{
  margin-top:0.4rem;
  .icon_img{
    width: 0.42rem;
    height: 0.42rem;
    margin-right: 0.1rem;
  }
}
.my_avatar{
  height: 3rem;
  border-radius:0.16rem;
  background: linear-gradient(to bottom right, #3B6CFC , #619EFE);
}
.per_Info{
  margin:0.56rem 0 0 0.3rem;
  display:table;
  span{
    display:table-cell;vertical-align:middle
  }
  .pic{
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .text{
    width: 4.6rem;
    font-size:0.3rem;
    color: white;
    text-align: left;
    padding-left:0.32rem;
  }
  .arrow{
  }
}
</style>
