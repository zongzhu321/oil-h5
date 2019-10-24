<template>
  <div class="layout whiteBg clear" style="margin-top:0;" ref="homePage">
    <!-- <h2 class="layout_title">登录</h2> -->
    <div class="login_title">
        <p class="title">手机号快捷登录</p>
        <p class="tips">手机号未注册 验证后自动注册</p>
    </div>
    <div class="login_form">
        <ul>
            <li>
                <!-- <img src="../../static/imgs/icon/iphone.png"/>
                <input v-model="params.mobile" type="" placeholder="请输入手机号"> -->
                <van-field class="iphone" v-model="params.mobile" clearable="" placeholder="请输入手机号">
                    <template slot="left-icon">
                        <img src="../../static/imgs/icon/iphone.png"/>
                    </template>
                </van-field>
            </li>
            <li>
                <img src="../../static/imgs/icon/message.png"/>
                <input v-model="params.smsCode" type="" placeholder="请输入验证码">
                <!-- <van-field v-model="params.smsCode" placeholder="请输入验证码" /> -->
                <span>获取验证码</span>
            </li>
        </ul>
    </div>
    <div class="login_btn">
        <p class="active" v-if="params.smsCode != ''" @click="loginFun">登录</p>
        <p v-else>登录</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      params: {
          mobile:'',
          smsCode:''
      },
    }
  },
  methods:{
      loginFun(){
          if(this.params.mobile == ''){
              this.$toast('手机号不能为空');
              return
          }
          if(this.params.smsCode == ''){
              this.$toast('请输入验证码');
              return
          }
          this.api.login(this.params).then(res => {
              if(res.code == 0){
                  window.sessionStorage.setItem("token", res.token);
                  this.$router.push('/')
              }
          })
      }
  },
  mounted(){
    this.$refs.homePage.style.height = window.innerHeight +'px';
  }
}
</script>
<style scoped lang="less">
.login_btn{
    text-align: center;
    margin-top:1.6rem;
    p{
        width: 5rem;
        height: 0.8rem;
        line-height: 0.8rem;
        font-size:0.34rem;
        color: #ffffff;
        display: inline-block;
        background: #D5D5D5;
    }
    p.active{
        background: linear-gradient(to bottom right, #FF8984 , #FF827C);
    }
}
.login_title{
    margin: 2.04rem 0 1.22rem 0.44rem;
    .title{
        font-size: 0.5rem;
        margin-bottom:0.2rem; 
        color: #333333;
    }
    .tips{

        font-size:0.26rem;
        color: #999999;
    }
}
.login_form{
    color: #666666;
    margin: 0 0.44rem;
    .iphone{
        padding: 0;
        .van-field__left-icon{
            margin:0!important
        }
    }
    span,input{
        font-size:0.26rem;
    }
    ul{
        li{
            border-bottom:1px solid #D8D8D8;
            padding: 0.24rem 0;
            margin-bottom: 0.32rem;
            display:table;
            width: 100%;
            img{
                width: 0.42rem;
                height: 0.42rem;
                margin: 0 0.32rem;
                vertical-align:middle;
            }
            input,span{
                display:table-cell;vertical-align:middle
            }
            input::-webkit-input-placeholder{
                color:#969799;
            }
            span{
                padding-left:0.4rem;
                border-left:1px solid #FF7773;
                color: #FF7773;
            }
        }
    }
}
</style>
