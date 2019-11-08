import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import qs from 'qs'
import merge from 'lodash/merge'
import {
    clearLoginInfo
} from '@/utils'

// const http = axios.create({
//     timeout: 1000 * 30,
//     withCredentials: true,
//     headers: {
//         // 'Content-Type': 'application/json; charset=utf-8'
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     transformRequest: [function(data) {
//         // condition
//         let ret = ''
//         if (JSON.stringify(data) == '{}') { // 如果是空对象 主动性添加 condition key
//             data = { 'condition': '{}' }
//         }
//         debugger
//         let userIDglobalData = Vue.cookie.get('token') + 'globalData' // 本用户存储的全局时间戳,全局时间戳key
//         let globalTimeObj = localStorage.getItem(userIDglobalData)
//         for (let it in data) {

//             try {
//                 let tempParam = JSON.parse(data[it])
//                 if ((typeof tempParam) == 'object') {
//                     if (globalTimeObj == undefined || globalTimeObj == null || globalTimeObj == '') { // 时间戳无值
        
//                         tempParam.globalStartTime = ''
//                         tempParam.globalEndTime = ''
//                     } else {
//                         tempParam.globalStartTime = JSON.parse(globalTimeObj).startTime
//                         tempParam.globalEndTime = JSON.parse(globalTimeObj).endTime
//                     }
//                     tempParam = JSON.stringify(tempParam)
//                     ret += encodeURIComponent(it) + '=' + encodeURIComponent(tempParam) + '&'
//                 }

//             } catch (error) {
//                 ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
//             }

//         }
//         return ret
//     }],
// })

const http = axios.create({
    timeout: 1000 * 30,
    withCredentials: true,
    headers: {
      //'Content-Type': 'application/json; charset=utf-8'
      "Content-Type": "application/x-www-form-urlencoded"
    },
    transformRequest: [
      function(data) {
        let ret = "";
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
        }
        return ret;
      }
    ]
  });

/**
 * 请求拦截
 */
http.interceptors.request.use(config => {
    config.headers['token'] = Vue.cookie.get('token') // 请求头带上token
    return config
}, error => {
    console.dir(error)
    return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {

    if (response.data && response.data.code === 401) { // 401, token失效
        clearLoginInfo()
        router.push({
            name: 'login'
        })
    }
    return response
}, error => {
    return Promise.reject(error)
})

/**
 * 请求地址处理
 * @param {*} actionName action方法名称
 */
http.adornUrl = (actionName, who) => {
        var proxyApi = '/proxyApi'
        if (who) {
            switch (who) {
                case 'CQ':
                    proxyApi = '/proxyCQ'
                    break
                case 'XZX':
                    proxyApi = '/proxyXZX'
                    break
                default:
                    break
            }
        }
        var newName = actionName.replace('op=', '/').replace('&func=', '/');
        // 非生产环境 && 开启代理, 接口前缀统一使用[/proxyApi/]前缀做代理拦截!
        // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? proxyApi : window.SITE_CONFIG.baseUrl) + '/nsbigdata_api/webservice/index.jsp?user=bigtable&pwd=bigtable1001&gtype=http&' + actionName
        // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? proxyApi : window.SITE_CONFIG.baseUrl) + '/webservice/index.php?user=bigtablesys&pwd=bigtable1001&gtype=http&' + actionName
        // return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? proxyApi : '/') + 'webservice/data_analysis/index.jsp/v1/sys' + newName + '?token=dXNlcj1kYXRhX2FuYWx5c2lzJnB3ZD1kYXRhX2FuYWx5c2lzXzEwMDE=' // product本地连接测试库
        return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? proxyApi : '/') + 'webservice/liangjiang_naire_analysis/index.jsp/v1/sys' + newName + '?token=dXNlcj1saWFuZ2ppYW5nX25haXJlX2FuYWx5c2lzJnB3ZD1saWFuZ2ppYW5nX25haXJlX2FuYWx5c2lzXzEwMDE=' // 重庆两江市
        //     return (process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? proxyApi : '/') + 'webservice/shishi_naire_analysis/index.jsp/v1/sys' + newName + '?token=dXNlcj1zaGlzaGlfbmFpcmVfYW5hbHlzaXMmcHdkPXNoaXNoaV9uYWlyZV9hbmFseXNpc18xMDAx' // shishi本地连接测试库
            // return '/nsbigdata_api/webservice/index.jsp?user=bigtablesys&pwd=bigtable1001&gtype=http&version=v3&' + actionName // 上线
    }
    // /proxyApi/
    /**
     * get请求参数处理
     * @param {*} params 参数对象
     * @param {*} openDefultParams 是否开启默认参数?
     */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        't': new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    // var defaults = {
    //   't': new Date().getTime()
    // }
    // data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

export default http
