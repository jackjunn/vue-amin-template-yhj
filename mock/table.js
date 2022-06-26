const Mock = require('mockjs')

const data = Mock.mock({
  'items|30': [{
    'id|+1': 1,
    "name|1": ["哈哈", "嘿嘿", "biubiu", "啾啾", "喵喵", "啦啦"],
    'age|1': [32, 15, 23, 13],
    'roles|1': ["用户", "管理员", "超级管理员"],
    remarks: '我是员工',
  }]
})

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
