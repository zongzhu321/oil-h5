import axios from 'axios'
import router from './../router/index'

const path = 'http://172.16.102.205:9400/h5' //测试地址


export default {
    //当前用户收货地址列表  address/list
    addressList(jsonObject) { return jsonHttpPost('/address/list', jsonObject) },
    //客户登录   customer/login
    login(jsonObject) { return jsonHttpPost('/customer/login', jsonObject) },
    //新增或者修改收货地址（带id为修改） /address/addOrUpdate
    addOrUpdate(jsonObject) { return jsonHttpPost('/address/addOrUpdate', jsonObject) },
    //获取地址详情  address/detail/{addressId}
    addressDetail(jsonObject) { return jsonHttpPost("/address/detail/"+ jsonObject +"", jsonObject) },
    //删除地址 /address/delete/{addressId}
    addressDelete(jsonObject) { return jsonHttpPost("/address/delete/"+ jsonObject +"", jsonObject) },
    //当前用户默认收货地址  /address/default
    addressDefault(jsonObject) { return jsonHttpPost("/address/default", jsonObject) },

    //油卡管理
    //用户已绑卡列表   /customer/card/list
    cartList(jsonObject) { return jsonHttpPost("/customer/card/list", jsonObject) },
    //绑卡   /customer/card/binding
    binding(jsonObject) { return jsonHttpPost("/customer/card/binding", jsonObject) },
    //办卡  /order/card
    buyCard(jsonObject) { return jsonHttpPost("/order/card", jsonObject) },
    //当前登录用户信息登录 /h5/customer/currentUserInfo

    currentUserInfo(jsonObject) { return jsonHttpPost("/customer/currentUserInfo", jsonObject) },





    //客户订单列表 /order/list
    orderList(jsonObject) { return jsonHttpPost("/order/list", jsonObject) },
    //客户订单详情  /h5/order/detail/{id}
    orderDetail(jsonObject,orderId) { return jsonHttpPost("/order/detail/"+orderId, jsonObject) },



    // 当前登录用户信息登录 /customer/currentUserInfo
    currentUserInfo(jsonObject) { return jsonHttpPost("/customer/currentUserInfo", jsonObject) },


    




    //省市区
    //获取所有省 /common/queryProvinceList
    queryProvinceList(jsonObject) { return jsonHttpPost('/common/queryProvinceList', jsonObject) },
    //通过省code获取所有城市 common/queryCityList
    queryCityList(jsonObject) { return jsonHttpPost('/common/queryCityList', jsonObject) },
    //listAllLoc common/queryAllLocation
    queryAllLocation(jsonObject) { return jsonHttpPost('/common/queryAllLocation', jsonObject) },

    //   common/allProvince
    allProvince(jsonObject) { return jsonHttpPost('/common/allProvince', jsonObject) },
    //   common/allCity
    allCity(jsonObject) { return jsonHttpPost('/common/allCity', jsonObject) },
    //   common/allArea
    allArea(jsonObject) { return jsonHttpPost('/common/allArea', jsonObject) },

    //套餐
    //获取套餐列表  /package/list
    getPackageList(jsonObject) { return jsonHttpPost('/package/list', jsonObject) },




    
}




/**  axios基础配置 */
axios.defaults.timeout = 30000
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'
/**
 * JSON格式的POST提交
 * @param {*} url
 * @param {*} params
 */
export function jsonHttpPost(url, params) {
    axios.defaults.headers.Authorization = sessionStorage.getItem("token")
    axios.defaults.headers['Content-Type'] = "application/json;charset=UTF-8"
    url = path + url
    return new Promise((resolve, reject) => {
        axios({
                method: "POST",
                url: url,
                data: params,
                withCredentials: false
            })
            .then(response => {
                console.log(response)
                if (response.data.code == '401' || response.data.code == "201") {
                    window.sessionStorage.removeItem('token')
                    console.info("重新登录")
                    // Message.info('会话过期 正在跳转登陆页面。。。');
                    setTimeout(() => {
                        router.push('login')
                    }, 0)

                } else {
                    resolve(response.data)
                }
            }, err => {
                reject(err)
                Message.warning('请求超时');
                if (url == '/logout') {
                    setTimeout(() => {
                        router.push('/login')
                    }, 3000)
                }

            })
            .catch((error) => {
                reject(error)
                Message.warning('系统错误');
            })
    })
}