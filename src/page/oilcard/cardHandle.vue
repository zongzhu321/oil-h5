<template>
  <div class="myHome layout grayBack">
    <!-- <h2 class="layout_title">油卡办理</h2> -->
    <div class="addressBox clear mrl_30 mb20">
        <div v-if="hasAddress" @click="toAddressList()" class="receiveAdress">
            <div class="info">
                <p><span>{{addressInfo.name}}</span><span>{{addressInfo.tel}}</span></p>
                <p><span><img class="addressIcon" src="../../../static/imgs/icon/address01.png"/></span><span>{{addressInfo.addressDetail}}</span></p>
            </div>
            <div class="arrow">
                <img class="arrowWhite" src="../../../static/imgs/icon/arrow_white.png"/>
            </div>
        </div>
        <p v-else class="addressBtn" @click="toAddressList()">选择地址</p>
    </div>
    <div class="oilType mrl_30 mb20">
        <h3 class="oilType-title">
            <img src="../../../static/imgs/icon/oil-icon.png"/>
            <span class="fontSize30 color333">选择油卡种类</span>
        </h3>
        <van-radio-group class="cardRadio" v-model="cardInfo.companyRadio" @change="getCard()">
            <van-radio name="1">
                <img
                slot="icon"
                slot-scope="props"
                :src="props.checked ? cardImg.shihua.active : cardImg.shihua.inactive"
                >
            </van-radio>
            <van-radio name="2">
                <img
                slot="icon"
                slot-scope="props"
                :src="props.checked ? cardImg.shiyou.active : cardImg.shiyou.inactive"
                >
            </van-radio>
            </van-radio-group>
        <!-- <van-grid :border="false" :gutter="10" :column-num="2">
            <van-grid-item>
                <van-image class="cardImg" src="../../static/imgs/icon/card01.png" />
            </van-grid-item>
            <van-grid-item>
                <van-image class="cardImg" src="../../static/imgs/icon/card02.png" />
            </van-grid-item>
        </van-grid> -->
    </div>
    <div class="discountType mrl_30 mb20">
        <div class="payType">
            <img class="icon" src="../../../static/imgs/icon/cout01.png"/>
            <span class="fontSize30 color333">折扣种类:</span>
            <van-radio-group class="sellRadio" v-model="cardInfo.discountRadio" @change="getCard()">
                <van-radio name="1">
                    <span slot="icon" slot-scope="props" :class="{'selected':props.checked}" class="sell_select">消费折扣</span>
                </van-radio>
                <van-radio name="2">
                    <span slot="icon" slot-scope="props" :class="{'selected':props.checked}" class="sell_select">充值折扣</span>
                </van-radio>
            </van-radio-group>
        </div>
        <div class="payList">
            <h3 class="fontSize28">请选择套餐</h3>
            <div class="Box">
                <van-radio-group class="packageRadio" @change="getMoney" v-model="cardInfo.packageRadio">
                    <van-radio v-for="value in packageList" :name="value.id" :key="value.id">
                        <div slot="icon" slot-scope="props" :class="{'packageSelected':props.checked}" class="package_select">
                            <p v-if="value.packageType == 1" class="money fontSize34">暂不充值</p>
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
        <p class="money"><span>总计:</span> <span class="amount">￥{{cardInfo.payMoney}}</span></p>
        <p class="submitBtn">立即办理</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OilHandle',
  data () {
    return {
      currentAddressId: this.$route.query.addressID,
      hasAddress:false,   //false: 地址为空  true:有收获地址
      addressInfo:{
          name:'',
          tel:'',
          addressDetail:''
      },
      cardImg: {
        shiyou:{
            active: '../../../static/imgs/icon/shiyou01.png',
            inactive: '../../../static/imgs/icon/shiyou02.png',
        },
        shihua:{
            active: '../../../static/imgs/icon/shihua01.png',
            inactive: '../../../static/imgs/icon/shihua02.png',
        }
      },
      //套餐参数
      packageParams:{
        "companyType": null,
        "discountType": null
      },
      packageList:[],
    //   payMoney: 0,    //支付金额
      cardInfo:{
        companyRadio: '1',
        discountRadio: '1',
        packageRadio: '',
        payMoney: 0  //支付金额
      }
    }
  },
  methods:{
      getMoney(e){
          this.packageList.forEach((item) => {
              if(item.id == e){
                  this.cardInfo.payMoney = item.currentPrice || item.freight;
                  return
              }
          })
      },
      //获取默认地址
      addressDefault(){
          this.api.addressDefault().then(res => {
              let result = res.resultData;
              if(res.code == 0 && result){
                  this.hasAddress = true;
                  this.addressInfo.name = result.name;
                  this.addressInfo.tel = result.tel;
                  this.addressInfo.addressDetail = result.addressDetail;
                  this.currentAddressId = result.id;
              }
          });
      },
      //根据ID获取地址详情
      addressDetail(){
        this.api.addressDetail(this.currentAddressId).then(res => {
            let result = res.resultData;
            if(res.code == 0 && result){
                this.hasAddress = true;
                this.addressInfo.name = result.name;
                this.addressInfo.tel = result.tel;
                this.addressInfo.addressDetail = result.addressDetail;
            }
        })
      },
      //获取套餐列表
      getPackageList(){
          this.packageParams.companyType = this.cardInfo.companyRadio;
          this.packageParams.discountType = this.cardInfo.discountRadio;
          this.api.getPackageList(this.packageParams).then(res => {
              if(res.code == 0){
                  this.packageList = res.resultData;
              }
          })
      },
      //获取package类型
      getCard(){
          this.cardInfo.packageRadio = '';
          this.cardInfo.payMoney = 0;
          this.getPackageList()
      },
      //办理
      cardHandle(){
          let params = {
              addressId: this.currentAddressId,
              packageId: this.cardInfo.packageRadio
          }
          this.api.buyCard(params).then(res => {
              if(res.code == 0){
                  this.$toast('办理成功！');
              }else{
                  this.$toast(res.msg);
              }
          })
      },
      toAddressList(){
          this.$router.push({
            path: 'addresslist',
                query: {
                    origin:'oilhandle',
                    type: 'getAddress',
                    addressID: this.currentAddressId,
                    cardInfo: this.cardInfo
                }
            })
      }
  },
  created(){
      this.cardInfo.companyRadio = this.$route.query.cardInfo.companyRadio || '1';
      this.cardInfo.discountRadio = this.$route.query.cardInfo.discountRadio || '1';
      this.cardInfo.packageRadio = this.$route.query.cardInfo.packageRadio || '';
      this.cardInfo.payMoney = this.$route.query.cardInfo.payMoney || 0;
      this.$route.query.cardInfo
      if(this.currentAddressId){
          this.addressDetail();
      }else{
          this.addressDefault();
      }
    //   this.addressDefault();
      this.getPackageList();
  }
}
</script>
<style scoped lang="less">
.addressBox{
    background: #FF7773;
    height: 1.4rem;
    border-radius: 0.1rem;
    .addressBtn{
        width: 2.88rem;
        height:0.74rem;
        line-height: 0.74rem;
        margin: 0.32rem auto 0;
        text-align: center;
        border:1px solid #ffffff;
        border-radius: 0.36rem;
        font-size:0.3rem;
        color: #ffffff;
    }
}
.oilType{
    background: #ffffff;
    padding: 0 0 0.3rem 0;
    // padding:0.1rem 0.15rem;
    .oilType-title{
        padding:0.2rem 0 0 0.2rem;
        color: #666666;
        display: table;
        font-size: 0.3rem;
        img,span{
            display:table-cell;vertical-align:middle
        }
        img{
            width:0.48rem;
            height: 0.48rem;
            margin-right:0.1rem;
        }
        span{
            padding-top:0.06rem
        }
    }
}
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
            width:0.45rem;
            height: 0.45rem;
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
.receiveAdress{
    &>div{
        display: table-cell;
        vertical-align:middle;
    }
    .info{
        width: 5.5rem;
        padding:0.2rem 0.42rem;
        font-size: 0.6rem;
        color: #ffffff;
    }
    span{
        font-size:0.3rem;
        display: table-cell;
        vertical-align:middle;
        padding:0 0.2rem 0 0;
    }
    p{
        padding: 0.1rem 0;
    }
    .addressIcon{
        width: 0.32rem;
        height: 0.4rem;
    }
}
</style>
