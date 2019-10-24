<template>
  <div class="myHome layout grayBack">
    <!-- <h2 class="layout_title">我的油卡</h2> -->
    <!-- <div class="oilcardBox mrl_30 mb20">
        
    </div> -->
    <div class="cardBox mrl_30">
      <ul>
        <li v-for="item in cardList" :key="item.id">
          <div class="cardmain" @click="recharge(item)">
            <p class="card_name">
              <span v-if="item.companyType == '1'">{{cardimg.card_y.name}}</span>
              <span v-if="item.companyType == '2'">{{cardimg.card_h.name}}</span>
              <span v-if="item.discountType == '1'" class="zhekou">(充值折扣)</span>
              <span v-if="item.discountType == '2'" class="zhekou">(消费折扣)</span>
            </p>
            <p class="card_img" v-if="item.companyType == '1'"><img class="card_bg" :src="cardimg.card_y.img"/><img class="card_logo" :src="cardimg.card_y.logo"/></p>
            <p class="card_img" v-if="item.companyType == '2'"><img class="card_bg" :src="cardimg.card_h.img"/><img class="card_logo" :src="cardimg.card_h.logo"/></p>
            <p class="cardNo">{{item.cardNo}}</p>
            <p class="buy">充值</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="addCardBtn" @click="addCard()">添加油卡</div>
  </div>
</template>

<script>
export default {
  name: 'myOilcard',
  data () {
    return {
        cardList: [],
        cardimg:{
          card_h:{
            name:'中石化全国卡',
            img:'../../../static/imgs/icon/h-card.png',
            logo:'../../../static/imgs/icon/h-logo.png'
          },
          card_y:{
            name:'中石油全国卡',
            img:'../../../static/imgs/icon/y-card.png',
            logo:'../../../static/imgs/icon/y-logo.png'
          }
        }
    }
  },
  methods:{
      
      //获取cardlist
      cartList(){
          this.api.cartList({}).then(res => {
              if(res.code == 0){
                  this.cardList = res.resultData;
              }
          })
      },
      addCard(){
        this.$router.push('addcard')
      },
      //充值 'cardrecharge'
      recharge(item){
        console.log(item)
        this.$router.push({
          path: 'cardrecharge',
          query: {
              cardNo: item.cardNo,
              companyType: item.companyType,
              id: item.id
          }
        });
      }
  },
  created(){
      this.cartList();
  }
}
</script>
<style scoped lang="less">
.cardBox{
  li{
    margin-bottom: 0.2rem;
  }
}
.cardmain{
  position: relative;
  .buy{
    position: absolute;
    right:0.3rem;
    top:0.3rem;
    border: 1px solid #ffffff;
    border-radius: 0.3rem;
    padding:0.1rem 0.2rem 0.05rem;
    font-size:0.28rem;
    color: #ffffff;
  }
  .card_name{
    color: #ffffff;
    font-size:0.3rem;
    position: absolute;
    top:0.53rem;
    left:1.3rem;
    .zhekou{
      font-size:0.24rem;
    }
  }
  .cardNo{
    color: #ffffff;
    font-size:0.28rem;
    position: absolute;
    top:1.1rem;
    left:1.3rem;
  }
  .card_img{
    .card_bg{
      width: 100%;
    }
    .card_logo{
      position: absolute;
      width: 0.7rem;
      height:0.7rem;
      left:0.3rem;
      top:0.3rem;
    }
  }
}
</style>
