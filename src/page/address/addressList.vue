<template>
  <div class="myHome layout grayBack" style="margin:0;">
    <!-- <h2 class="layout_title">收货地址</h2> -->
    <div class="address_main">
        <van-address-list
            v-model="chosenAddressId"
            :list="list"
            @add="onAdd"
            @edit="onEdit"
            @select="selectAddress"
            :switchable="switchable"
            />
    </div>
  </div>
</template>

<script>
export default {
  name: 'addressList',
  data () {
    return {
      switchable: false,
      chosenAddressId: null,
      list: [],
      origin:''  //来源
    }
  },
  methods:{
    //新增地址
    onAdd() {
        this.$router.push('add_address')
    },
    //编辑地址  id:list.id
    onEdit(e) {
        console.log(e)
        // this.$router.push('add_address/${id}');
        this.$router.push({
        path: 'add_address',
            query: {
              origin: this.origin,
              id: e.id
            }
        })
    },
    getAddressList(){
        this.api.addressList().then(res => {
            if(res.code == 0){
                this.list = res.resultData;
            }
        })
    },
    selectAddress(){
      this.$router.push({
        path: this.$route.query.origin,
            query: {
                addressID: this.chosenAddressId,
                cardInfo: this.$route.query.cardInfo
            }
        })
    }
  },
  created(){
      this.getAddressList();
      this.chosenAddressId = Number(this.$route.query.addressID);
      if(this.$route.query.origin){
        this.origin = this.$route.query.origin;
        this.switchable = true;
      }
  }
}
</script>
<style scoped lang="less">
.address_main{
  .van-cell:not(:last-child)::after{
    left: 0;
  }
}
</style>
