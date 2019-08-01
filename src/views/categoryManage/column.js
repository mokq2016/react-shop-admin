import React from 'react'

export default self => [
  {
    dataIndex: 'prodclassName',
    title: '类型名称',
    name: 'prodclassName',
    width: 150
  },
  {
    width: 200,
    dataIndex: 'described',
    title: '描述',
    name: 'described'
  },
  {
    width: 200,
    dataIndex: 'remark',
    title: '备注',
    name: 'remark'
  },
  {
    width: 150,
    dataIndex: 'createdBy',
    title: '添加人',
    name: 'createdBy'
  },
  {
    width: 150,
    dataIndex: 'createdTime',
    title: '添加时间',
    name: 'createdTime'
  },
  {
    width: 150,
    dataIndex: 'updatedBy',
    title: '更新人',
    name: 'updatedBy'
  },
  {
    width: 150,
    dataIndex: 'updatedTime',
    title: '更新时间',
    name: 'updatedTime'
  },
  {
    title: '操作',
    key: 'operation',
    width: 200,
    render: (text, record, index) => (<span><a href="javascript:;" onClick={() => { self.edit({ text, record, index }) }}>编辑</a><a href="javascript:;" onClick={() => { self.edit({ text, record, index }) }}>删除</a></span>)
  }
]
