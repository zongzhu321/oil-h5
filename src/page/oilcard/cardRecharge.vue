<template>
  <div class="myHome layout grayBack">
    <!-- <h2 class="layout_title">油卡充值</h2> -->
    <div class="cardBox mrl_30 mb20">
        <div class="cardmain" @click="changeCard()">
            <p class="card_name">
                <span v-if="cardInfo.companyType == '1'">{{cardimg.card_y.name}}</span>
                <span v-if="cardInfo.companyType == '2'">{{cardimg.card_h.name}}</span>
                <!-- <span v-if="cardInfo.discountType == '1'" class="zhekou">(充值折扣)</span>
                <span v-if="cardInfo.discountType == '2'" class="zhekou">(消费折扣)</span> -->
            </p>
            <p class="card_img" v-if="cardInfo.companyType == '1'"><img class="card_bg" :src="cardimg.card_y.img"/><img class="card_logo" :src="cardimg.card_y.logo"/></p>
            <p class="card_img" v-if="cardInfo.companyType == '2'"><img class="card_bg" :src="cardimg.card_h.img"/><img class="card_logo" :src="cardimg.card_h.logo"/></p>
            <p class="cardNo">{{cardInfo.cardNo}}</p>
            <!-- <p class="buy">充值</p> -->
        </div>
    </div>
    <div class="discountType mrl_30 mb20">
        <div class="payList clear">
            <h3 class="moneyTitle">请选择充值金额</h3>
            <div class="Box">
                <van-radio-group class="packageRadio" v-model="packageRadio">
                    <van-radio v-for="value in packageList"  @click="payMoney = value.currentPrice" :name="value.id" :key="value.id">
                        <div slot="icon" slot-scope="props" :class="{'packageSelected':props.checked}" class="package_select">
                            <p v-if="value.packageType == 1" class="money">暂不充值</p>
                            <p v-else class="money">{{value.originalPrice}}元</p>
                            <p v-if="value.packageType == 1" class="tehui">押金: {{value.freight}}元</p>
                            <p v-else class="tehui">售价: {{value.currentPrice}}元</p>
                        </div>
                    </van-radio>
                </van-radio-group>
            </div>
        </div>
    </div>
    <div class="buyCardBtn" @click="cardHandle()">
        <p class="money">
            <span>总计:</span> 
            <span v-if="payMoney" class="amount">￥{{payMoney - cashPledge}}</span>
            <span v-else class="amount">￥0</span>
            <span v-if="cashPledge" class="cashPledge">(押金抵扣{{cashPledge}}元)</span></p>
        <p class="submitBtn">确认支付</p>
    </div>
    <div class="md-section-divider"></div>
  </div>
</template>

<script>
export default {
  name: 'OilHandle',
  data () {
    return {
      adressInfo:{
          name:'',
          tel:'',
          addressDetail:''
      },
      cardInfo:{
        cardNo: this.$route.query.cardNo,
        companyType: this.$route.query.companyType,
        id: this.$route.query.id
      },
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
      },
      //套餐参数
      packageParams:{
        "companyType": null,
        "discountType": null,
        "packageType": 2
      },
      packageList:[],
      companyRadio: '1',
      discountRadio: '1',
      packageRadio: '',
      cashPledge: null,  //折扣金额
      payMoney: null,    //支付金额
    }
  },
  methods:{
      //获取默认地址
      addressDefault(){
          this.api.addressDefault().then(res => {
              let result = res.resultData;
              if(res.code == 0){
                  this.adressInfo.name = result.name;
                  this.adressInfo.tel = result.tel;
                  this.adressInfo.addressDetail = result.addressDetail;
              }
          })
      },
      //获取套餐列表
      getPackageList(){
          this.packageParams.companyType = this.companyRadio;
          this.packageParams.discountType = this.discountRadio;
          this.api.getPackageList(this.packageParams).then(res => {
              if(res.code == 0){
                  this.packageList = res.resultData;
              }
          })
      },
      //获取用户信息
      currentUserInfo(){
          this.api.currentUserInfo().then(res => {
              if(res.code == 0){
                  this.cashPledge = Number(res.resultData.cashPledge);
              }
          })
      },
      getCard(){
          this.getPackageList()
      },
      changeCard(){
          this.$router.push('myoilcard')
      }
  },
  created(){
      this.addressDefault();
      this.getPackageList();
      this.currentUserInfo();
  }
}
</script>
<style scoped lang="less">
.discountType{
    background: #ffffff;
    .payType{
        padding:0.24rem 0;
        width: 100%;
        border-bottom:1px solid #f5f5f5;
        color: #666666;
        display: table;
        font-size: 0.3rem;
        img,span{
            vertical-align:middle
        }
        i{width: 0.2rem}
        img.icon{
            width:0.42rem;
            height: 0.42rem;
            margin:0 0.1rem 0 0.2rem;
        }
        span{
            padding-top:0.06rem
        }
        .sell_select{
            border: 1px solid #989898;
            font-size:0.24rem;
            padding:0.08rem 0.2rem;
            margin:0 0.2rem;
            border-radius: 0.04rem;
        }
        .selected{
            border: 1px solid #6595FF!important;
            color: #6595FF!important;
        }
    }
    .payList{
        h3{
            margin:0.2rem 0.2rem;
            color: #999999;
            font-size:0.3rem;
        }
        .Box{
            .money{
                margin:0.05rem 0 0 0;
                font-size: 0.38rem;
                color: #333333;
            }
            .tehui{
                margin:0.14rem 0 0 0;
                font-size:0.24rem;
            }
        }
    }
}
.moneyTitle{
    font-size: 0.28rem;
    padding:0.1rem 0 0 0.05rem;
}
.cardmain{
  position: relative;
  .buy{
    position: absolute;
    right:0.3rem;
    top:0.3rem;
    border: 1px solid #ffffff;
    border-radius: 0.3rem;
    padding:0.06rem 0.2rem;
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
.cashPledge{
    font-size:0.24rem;
    color: #FF7773;
    margin-left:0.1rem;
}
</style>
