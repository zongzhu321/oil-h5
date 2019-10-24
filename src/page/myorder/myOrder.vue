<template>
  <div class="myHome layout grayBack">
    <!-- <h2 class="layout_title">我的订单</h2> -->
    <div class="myOrder_main">
        <ul>
            <li v-for="item in orderLists" :key="item.id" @click="orderDetail(item)">
                <div class="orderInfo">
                  <div class="orderTitle">
                    <span class="orderType" style="background:#FFA752" v-if="item.orderStatus == 1">已提交</span>
                    <span class="orderType" style="background:#FFA752" v-if="item.orderStatus == 2">已付款</span>
                    <!-- <span class="orderType" v-if="item.orderStatus == 2 && (item.orderType ==1 || item.orderType ==2)">待发货</span> -->
                    <span class="orderType" style="background:#6595FF" v-if="item.orderStatus == 3">已发货</span>
                    <span class="orderType" style="background:#03A26D" v-if="item.orderStatus == 4">已完成</span>
                    <span class="orderName">{{item.packageName}}</span>
                    <span class="orderMoney">￥{{item.orderPrice}}</span>
                  </div>
                  <div class="orderTime"><span class="arrow">></span>{{item.createTime}}</div>
                </div>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myorder',
  data () {
    return {
      orderLists:[],
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
    orderList(){
      this.api.orderList().then(res => {
        if(res.code == 0){
          this.orderLists = res.resultData;
        }
      })
    },
    orderDetail(item){
      this.$router.push({
        path: 'orderdetail',
            query: {
                orderId: item.id
            }
        })
    }
  },
  created(){
      this.orderList();
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
    padding:0.25rem 0 0.3rem;
    border-bottom:1px solid #EEEEEE;
    span{
      display: inline-block;
      vertical-align: middle;
    }
    .orderName{
      width: 4.8rem;
    }
    .orderMoney{
      color: #ef7f78;
      font-size:0.36rem;
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
    padding:0.25rem 0.4rem;
    color: #999999;
    font-size:0.26rem;
    .arrow{
      float: right;
    }
  }
}
</style>
