import Vue from 'vue'
import Router from 'vue-router'
import myHome from '@/page/myHome'
import shopIndex from '@/page/shopIndex'
import Main from '@/page/main'
import AddressList from '@/page/address/addresslist'
import addAddress from '@/page/address/add_address'
import Login from '@/page/login'
import OilHandle from '@/page/oilcard/cardHandle'
import myOilcard from '@/page/oilcard/myOilcard'
import addCard from '@/page/oilcard/addCard'
import myOrder from '@/page/myorder/myOrder'
import cardRecharge from '@/page/oilcard/cardRecharge'
import orderDetail from '@/page/myorder/orderDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Main,
      children:[
        {
          path: '',
          name: '商城',
          component: shopIndex
        },{
          path: '/myhome',
          name: '我的',
          component: myHome
        },
      ]
    },{
      path: '/myorder',
      name: '我的订单',
      component: myOrder
    },{
      path: '/orderdetail',
      name: '订单详情',
      component: orderDetail
    },{
      path: '/oilhandle',
      name: '油卡办理',
      component: OilHandle
    },{
      path: '/cardrecharge',
      name: '油卡充值',
      component: cardRecharge
    },{
      path: '/myoilcard',
      name: '我的油卡',
      component: myOilcard
    },{
      path: '/addcard',
      name: '油卡绑定',
      component: addCard
    },{
      path: '/addresslist',
      name: '收货地址',
      component: AddressList
    },{
      path: '/add_address',
      name: '修改地址',
      component: addAddress
    },{
      path: '/login',
      name: '登录',
      component: Login
    }
    
  ]
})
