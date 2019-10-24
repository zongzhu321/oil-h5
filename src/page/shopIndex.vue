<template>
  <div class="myHome layout whiteBg" style="margin-top:0;" ref="homePage">
    <!-- <h2 class="layout_title">商城</h2> -->
    <div class="banner">
      <img src="../../static/imgs/img/banner01.png"/>
    </div>
    <div class="columnBox">
      <van-grid :border="false" :gutter="10" :column-num="4">
        <van-grid-item to="oilhandle">
          <van-image class="columnImg" src="../../static/imgs/icon/column-01.png" />
          <p class="columnText">油卡办理</p>
        </van-grid-item>
        <van-grid-item to="myoilcard">
          <van-image class="columnImg" src="../../static/imgs/icon/column-02.png" />
          <p class="columnText">油卡充值</p>
        </van-grid-item>
        <van-grid-item to="addcard">
          <van-image class="columnImg" src="../../static/imgs/icon/column-03.png" />
          <p class="columnText">油卡激活</p>
        </van-grid-item>
        <van-grid-item>
          <van-image class="columnImg" src="../../static/imgs/icon/column-04.png" />
          <p class="columnText">敬请期待</p>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      banner_images: [],
      screenHeight:null
    }
  },
  mounted(){
    this.$refs.homePage.style.height = window.innerHeight +'px';
  }
}
</script>
<style scoped lang="less">
.banner{
  img{
    width:100%;
  }
}
.columnBox{
  .columnImg{
    text-align: center;
    img{
      width: 0.76rem!important;
      height: 0.76rem;
    }
  }
  .columnText{
    font-size:0.26rem;
  }
}
</style>
