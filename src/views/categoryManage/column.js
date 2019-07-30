import React from 'react'

export default self => [
  {
    dataIndex: 'name',
    title: '商品名称',
    name: 'name',
    width: 300
  },
  {
    width: 250,
    dataIndex: 'storeInfo',
    title: '所属商铺',
    name: 'storeInfo'
  },
  {
    width: 100,
    dataIndex: 'price',
    title: '商品价格',
    name: 'price'
  },
  {
    width: 200,
    dataIndex: 'description',
    title: '商品描述',
    name: 'description'
  },
  {
    width: 100,
    dataIndex: 'stockNum',
    title: '库存量',
    name: 'stockNum'
  },
  {
    width: 200,
    dataIndex: 'imgs',
    title: '商品图片',
    name: 'imgs'
  },
  {
    title: '操作',
    key: 'operation',
    width: 200,
    render: (text, record, index) => (<span><a href="javascript:;" onClick={() => { self.edit({ text, record, index }) }}>编辑</a><a href="javascript:;" onClick={() => { self.edit({ text, record, index }) }}>删除</a></span>)
  }
]
