<template>
  <div class="myHome layout grayBack" style="margin:0;">
    <!-- <h2 class="layout_title">编辑收货地址</h2> -->
    <p style="height:0.2rem;background:#fff"></p>
    <div class="address_main">
        <van-address-edit
            :area-list="areaList"
            :address-info="addressInfo"
            show-postal
            show-delete
            show-set-default
            @save="onSave"
            @delete="onDelete"
            :key="updateKey"
        />
    </div>
  </div>
</template>

<script>
export default {
  name: 'addressList',
  components: {},
  data () {
    return {
        updateKey:null,
      searchResult: [],
      provinceList:{},
      cityList:{},
      areaList:{
          province_list:{},
          city_list:{},
          county_list:{}
      },
      //收件人信息
      AddresseeParams:{
        name:'',
        phone:'',
        provinceCode:'',
        cityCode:'',
        areaCode:'',
        addressDetail:'',
        postcode:'',
        isDefault:'',
        id:''
      },
      modifyId:'',  //当前地址ID
      addressInfo:{
        name:'',
        tel:'',
        areaCode:'',
        addressDetail:'',
        postalCode:'',
        isDefault:'',
        id:''
      }
    }
  },
  methods: {
    //获取地址详情
    addressDetail(){
        this.api.addressDetail(this.modifyId).then(res => {
            if(res.code == 0){
                let result = res.resultData;
                this.addressInfo.name = result.name;
                this.addressInfo.tel = result.tel;
                this.addressInfo.areaCode = result.areaCode.toString();
                this.addressInfo.isDefault = result.isDefault;
                this.addressInfo.postalCode = result.postcode;
                this.addressInfo.addressDetail = result.addressDetail;
                this.addressInfo.id = result.id;
            }
            this.updateKey++;
        })
    },
    //省
    allProvince(){
        this.api.allProvince({}).then(res => {
            if(res.code == 0){
                let provinceData = res.resultData;
                let provinceList = {};
                if(provinceData && provinceData.length){
                    for(let i = 0; i < provinceData.length; i++){
                        provinceList[provinceData[i].provinceCode]=provinceData[i].provinceName;
                    }
                    this.areaList.province_list = provinceList;
                }
                this.updateKey++;
            }
        })
    },
    //市
    allCity(){
        this.api.allCity({}).then(res => {
            if(res.code == 0){
                let cityData = res.resultData;
                let cityList = {};
                if(cityData && cityData.length){
                    for(let i = 0; i < cityData.length; i++){
                        cityList[cityData[i].cityCode]=cityData[i].cityName;
                    }
                    this.areaList.city_list = cityList;
                }
                this.updateKey++;
            }
        })
    },
    //区
    allArea(){
        this.api.allArea({}).then(res => {
            if(res.code == 0){
                let areaData = res.resultData;
                let areaList = {};
                if(areaData && areaData.length){
                    for(let i = 0; i < areaData.length; i++){
                        areaList[areaData[i].areaCode]=areaData[i].areaName;
                    }
                    this.areaList.county_list = areaList;
                }
                this.updateKey++;
            }
        })
    },
    //保存、修改地址
    addOrUpdate(){
        this.api.addOrUpdate(this.AddresseeParams).then(res => {
            if(res.code == 0){
                this.$router.go(-1);
                // this.$router.push('addresslist');
            }
        })
    },
    //删除地址
    addressDelete(){
        this.api.addressDelete(this.modifyId).then(res => {
            if(res.code == 0){
                this.$router.go(-1);
                // this.$router.push('addresslist');
                // this.$Notify({ type: 'success', message: res.message });
            }
        })
    },
    onSave(e) {
        this.AddresseeParams.name = e.name;
        this.AddresseeParams.phone = e.tel;
        this.AddresseeParams.provinceCode = e.areaCode.slice(0,2)+'0000';
        this.AddresseeParams.cityCode = e.areaCode.slice(0,4)+'00';
        this.AddresseeParams.areaCode = e.areaCode;
        this.AddresseeParams.addressDetail = e.addressDetail;
        this.AddresseeParams.postcode = e.postalCode;
        this.AddresseeParams.isDefault = e.isDefault || false;
        this.AddresseeParams.id = this.modifyId;
        this.addOrUpdate()
    },
    onDelete() {
        this.addressDelete();
    },
  },
  created(){
      this.modifyId = this.$route.query.id;
      this.allProvince();
      this.allCity();
      this.allArea();
      if(this.modifyId){
        this.addressDetail();
      }
  },
  mounted(){
    this.addressDetail()
  },
}
</script>
<style scoped lang="less">
.address_main{
  .van-cell:not(:last-child)::after{
    left: 0;
  }
}
</style>
