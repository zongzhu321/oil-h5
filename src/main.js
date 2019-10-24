// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/js/rem'
import api from './api/api'
import headerTitle from './page/widget/headerTitle'

Vue.config.productionTip = false

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.component('headerTitle', headerTitle)
const addVueInstanceMethod = {
  api
}
Object.assign(Vue.prototype, addVueInstanceMethod)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
