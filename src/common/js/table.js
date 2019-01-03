import { cloneObj } from 'common/js/util'

export function Getuserthead (that) {
  return [
    {
      title: '选项(一个)',
      align: 'center',
      width: 100,
      type: 'selection'
    }, {
      title: '用户名',
      align: 'center',
      key: 'username'
    }, {
      title: '真实姓名',
      align: 'center',
      key: 'realname'
    }, {
      title: '邮箱',
      align: 'center',
      key: 'email'
    }, {
      title: '手机号',
      align: 'center',
      key: 'mobile'
    }, {
      title: '状态',
      align: 'center',
      key: 'status'
    }, {
      title: '创建时间',
      align: 'center',
      key: 'createTime'
    }, {
      title: '操作',
      align: 'center',
      render: (h, params) => {
        return h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                let data = cloneObj(params.row, params.index)
                delete data['_index']
                delete data['_rowKey']
                that.edit(data)
              }
            }
          }, '编辑'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => {
                that.del(cloneObj(params.row))
              }
            }
          }, '删除')
        ])
      }
    }
  ]
}

export function GetMenuThead (that) {
  return [
    {
      title: 'ID',
      align: 'center',
      key: 'menuId',
      width: 100
    }, {
      title: '名称',
      align: 'center',
      key: 'name'
    }, {
      title: '排序号',
      align: 'center',
      key: 'orderNum'
    }, {
      title: '图标',
      align: 'center',
      key: 'icon'
    }, {
      title: '类型',
      align: 'center',
      key: 'type'
    }, {
      title: '菜单Url',
      align: 'center',
      key: 'url'
    }, {
      title: '授权标识',
      align: 'center',
      key: 'perms'
    }
  ]
}
