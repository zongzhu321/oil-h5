<template>
  <div class="myHome layout grayBack clear">
    <!-- <h2 class="layout_title">油卡绑定</h2> -->
    <div class="addCardBox mb20 clear">
        <h3 class="addCard-title"><span class="fontSize32"><i></i>卡片信息</span></h3>
        <div class="form">
            <van-cell-group>
                <van-field
                    v-model="cardNo"
                    clearable
                    label="油卡卡号:"
                    placeholder="请输入油卡卡号"
                />

                <van-field
                    v-model="surecardNo"
                    label="确认卡号:"
                    placeholder="请确认油卡卡号"
                    clearable
                    :border="false"
                />
            </van-cell-group>
        </div>
        <div class="Agreement">
            <van-checkbox v-model="agreeChecked" checked-color="#07c160">
                <img
                class="checkimg"
                    slot="icon"
                    slot-scope="props"
                    :src="props.checked ? checked_icon.active : checked_icon.inactive"
                >
                添加即代表您同意<span class="agreeName">《服务协议》</span></van-checkbox>
        </div>
    </div>
    <div class="addCardBtn" @click="addCard()">确认添加</div>
  </div>
</template>

<script>
export default {
  name: 'myOilcard',
  data () {
    return {
        cardNo:'',
        surecardNo:'',
        agreeChecked: true,
        checked_icon: {
            active: '../../../static/imgs/icon/checked.png',
            inactive: '../../../static/imgs/icon/unchecked.png'
        }
    }
  },
  methods:{
      
      //获取cardlist
      cartList(){
          
          this.api.cartList({}).then(res => {
              if(res.code == 0){
                  
              }
          })
      },
      addCard(){
          if(!this.agreeChecked){
              this.$toast('请同意服务协议');
              return
          }
          let params = {
              cardNo: this.cardNo
          }
          this.api.binding(params).then(res => {
              if(res.code == 0){
                  this.$router.push('myoilcard')
              }else{
                  this.$toast(res.msg);
              }
          })
      }
  },
  created(){
      this.cartList();
  }
}
</script>
<style scoped lang="less">
.addCard-title{
    margin:0.1rem 0.4rem 0.2rem;
    span{
        padding-left:0.20rem;
        i{
            width: 3px;
            height:0.32rem;
            float: left;
            margin-top: 0rem;
            display: inline-block;
            background: #FF7773
        }
    }
}
.form{
    .van-cell__title{
        span{
            font-size:0.3rem!important;
        }
    }
}
.Agreement{
    color: #666666;
    margin:0.36rem 0.4rem;
    .checkimg{
        width: 0.3rem;height: 0.3rem;
    }
    .agreeName{
        color: #FF7773;
    }
}
</style>
