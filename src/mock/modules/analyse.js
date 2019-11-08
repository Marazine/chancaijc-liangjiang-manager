import Mock from 'mockjs'

// 生成数据列表
var dataList = []
for (let i = 0; i < Math.floor(Math.random() * 10 + 4); i++) {
  dataList.push(Mock.mock({
    'groupName': '@name',
    'count|1-100': 100,
    'percent|1': ['0.4%','5.4%','10.4%']
  }))
}
// 登录
export function getTableData() {
  return {
    // isOpen: false,
    url: '/analyse/getTableData',
    type: 'post',
    data: {
      "code": 200,
      "status": "ok",
      "desc": "查询成功...",
      "data": dataList,
    }
  }
}
