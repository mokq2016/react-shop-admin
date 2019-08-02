import React from 'react'
import { Button } from 'antd'

export default self => [
  {
    dataIndex: 'userName',
    title: '用户名',
    name: 'userName',
    width: 150
  },
  {
    width: 200,
    dataIndex: 'password',
    title: '密码',
    name: 'password'
  },
  /*   {
    width: 200,
    dataIndex: 'remark',
    title: '备注',
    name: 'remark'
  }, */
  {
    width: 150,
    dataIndex: 'email',
    title: '邮箱',
    name: 'email'
  },
  {
    width: 150,
    dataIndex: 'levels',
    title: '用户等级',
    name: 'levels'
  },
  {
    width: 150,
    dataIndex: 'phone',
    title: '手机号',
    name: 'phone'
  },
  {
    width: 150,
    dataIndex: 'islock',
    title: '是否启用',
    name: 'islock'
  },
  {
    title: '操作',
    key: 'operation',
    width: 200,
    render: (text, record, index) => (<div><Button className="mr-10" type="primary" onClick={() => { self.edit(record) }}>编辑</Button><Button type="danger" onClick={() => { self.deleteRow(record.prodclassId) }}>删除</Button></div>)
  }
]
