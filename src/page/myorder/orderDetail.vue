<template>
  <div class="myHome layout grayBack">
    <!-- <h2 class="layout_title">订单详情</h2> -->
    <div class="myOrder_main">
        <div class="orderInfo">
            <div class="orderTitle">
                <span class="orderType" style="background:#FFA752" v-if="orderDetailInfo.orderStatus == 1">已提交</span>
                <span class="orderType" style="background:#FFA752" v-if="orderDetailInfo.orderStatus == 2">已付款</span>
                <span class="orderType" style="background:#6595FF" v-if="orderDetailInfo.orderStatus == 3">已发货</span>
                <span class="orderType" style="background:#03A26D" v-if="orderDetailInfo.orderStatus == 4">已完成</span>
                <span class="orderName">{{orderDetailInfo.packageName}}</span>
                <span class="orderMoney fr">￥{{orderDetailInfo.orderPrice}}</span>
            </div>
            <div class="orderData">
                <p>
                    <span class="labelName">消费折扣套餐</span><span class="fr valueName">{{orderDetailInfo.packageName}}</span>
                </p>
                <p>
                    <span class="labelName">套餐金额</span><span class="fr valueName">￥{{orderDetailInfo.orderPrice}}</span>
                </p>
                <p>
                    <span class="labelName">抵扣金额</span><span class="fr valueName">￥{{Number(orderDetailInfo.deductionPrice)}}</span>
                </p>
                <p>
                    <span class="labelName">支付金额</span><span class="fr valueName money">￥{{Number(orderDetailInfo.orderPrice)-Number(orderDetailInfo.deductionPrice)}}</span>
                </p>
            </div>
            <div class="orderAddress">
                <p>
                    <span class="labelName">收货地址</span><span class="fr valueName">{{orderDetailInfo.provinceName}} {{orderDetailInfo.cityName}} {{orderDetailInfo.areaName}} {{orderDetailInfo.addressDetail}}</span>
                </p>
                <p>
                    <span class="labelName">订单编号</span><span class="fr valueName">{{orderDetailInfo.orderNo}}</span>
                </p>
                <p>
                    <span class="labelName">下单时间</span><span class="fr valueName">{{orderDetailInfo.createTime}}</span>
                </p>
                <p>
                    <span class="labelName">订单状态</span>
                    <span class="fr valueName" v-if="orderDetailInfo.orderStatus == 1">已提交</span>
                    <span class="fr valueName" v-if="orderDetailInfo.orderStatus == 2">已付款</span>
                    <span class="fr valueName" v-if="orderDetailInfo.orderStatus == 3">已发货</span>
                    <span class="fr valueName" v-if="orderDetailInfo.orderStatus == 4">已完成</span>
                </p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myorder',
  data () {
    return {
      orderDetailInfo:{},
      aaa:{
        "return_url":"http://www.paymax.cc",
        "user_id": "100",
        "show_url":"http://www.paymax.cc"
      },
      bbb:{
        "time_expire":(new Date().getTime()+10*60*1000),
        "title":"Paymax demo",
        "subject":"subject1",
        "body":"body1",
        "amount":0.01,
        "order_no":'',
        "client_ip":"180.168.47.66",
        "extra":this.aaa
      }

    }
  },
  methods:{
    orderDetail(){
      this.api.orderDetail({},this.$route.query.orderId).then(res => {
        if(res.code == 0){
          this.orderDetailInfo = res.resultData;
        }
      })
    },
  },
  created(){
      this.orderDetail();
  }
}
</script>
<style scoped lang="less">
.myOrder_main{
  li{
    background: #ffffff;
    margin-bottom: 0.2rem;
  }
}
.orderInfo{
  .orderTitle{
    padding:0.25rem 0.4rem 0.3rem 0;
    border-bottom:1px solid #EEEEEE;
    background: #ffffff;
    span{
      display: inline-block;
      vertical-align: middle;
    }
    .orderName{
      padding-left: 0.15rem;
    }
    .orderMoney{
      color: #ef7f78;
      font-size:0.36rem;
      margin-top:0.13rem;
    }
  }
  .orderType{
    text-align: center;
    font-size:0.28rem;
    width: 1.3rem;
    display: inline-block;
    padding: 0.14rem 0 0.10rem;
    background: #FFA752;
    border-top-right-radius:0.3rem;
    border-bottom-right-radius:0.28rem;
      color: #ffffff;
  }
  .orderTime{
    padding:0.15rem 0.4rem;
    color: #999999;
    font-size:0.26rem;
    .arrow{
      float: right;
    }
  }
}
.orderInfo{
    
}
.orderData{
    background: #ffffff;
    padding:0.1rem 0;
    p{
        padding: 0.2rem 0.4rem;
    }
}
.orderAddress{
    background: #ffffff;
    margin-top:0.24rem;
    padding:0.1rem 0;
    p{
        padding: 0.2rem 0.4rem;
    }
}
.labelName{
    font-size:0.28rem;
    color: #999999;
}
.valueName{
    font-size:0.28rem;
    color: #333333;
}
.fr{
    float: right;
}
.money{
    color: #ef7f78;
}
</style>
