import Vue from 'vue'
import router from '@/router'
import store from '@/store'

/**
 * 获取uuid
 */
export function getUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
    return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
    }
    for (var k = 0; k < data.length; k++) {
        if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
            if (!temp[data[k][pid]]['children']) {
                temp[data[k][pid]]['children'] = []
            }
            if (!temp[data[k][pid]]['_level']) {
                temp[data[k][pid]]['_level'] = 1
            }
            data[k]['_level'] = temp[data[k][pid]]._level + 1
            temp[data[k][pid]]['children'].push(data[k])
        } else {
            res.push(data[k])
        }
    }
    return res
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
    Vue.cookie.delete('token')
    store.commit('resetStore')
    router.options.isAddDynamicMenuRoutes = false
}


/**
 * 表格预览地址
 */
export function previewAddress(company_id) {
    // "https://nsbigdata.job1001.com/nsbigdata/v1/print.html?company_id=" + row.company_id
    // "https://nsbigdatatest.job1001.com/nsbigdata/v2/print.html?company_id=" + row.company_id
    // var tempAddress = "http://192.168.60.171:8020/6667templateedit/print.html?id=" + company_id;
    var tempAddress = "/print.html?id=" + company_id;
    return tempAddress;
}

// 数组数据翻转
export function filterReserve(value) {
    return value.reverse();
}

/**
 * 删除数组对象最后一层
 */
export function deleteChildren(arr) {
    arr.forEach(function (item) {
      if (item.children instanceof Array && item.children.length > 0) {
        deleteChildren(item.children)
      } else {
        delete (item.children)
      }
    })
  }