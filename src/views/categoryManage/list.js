import React, { Component } from 'react'
import { Layout, Button } from 'antd'

import DataTable from '../../components/dataTable/dataTable'
import createColumns from './column'

const { Content, Header, Footer } = Layout

export default class list extends Component {
  getData = (currentPage, pageSize) => {
    console.log(currentPage, pageSize)
  }

  edit = (obj) => {
    console.log(obj)
  }

  deleteRow = () => {
    console.log()
  }

  render() {
    const list = []
    for (let i = 0; i < 15; i++) {
      list.push({
        key: i,
        name: `alex ${i}`,
        price: 32,
        storeInfo: `London Park no. ${i}`,
        description: '',
        stockNum: 18
      })
    }
    const dataTableProps = {
      columns: createColumns(this),
      dataList: {
        list,
        currentPage: 1,
        total: 30
      },
      selectedRowKeys: [],
      selectType: 'checkbox'
    }

    return (
      <Layout>
        <Header style={{
          background: '#fff', paddingLeft: 10, lineHeight: '54px', height: '54px'
        }}
        >
          <Button type="primary" icon="plus" className="mr-10">
            新增
          </Button>
          <Button type="danger" icon="delete" onClick={this.deleteRow}>删除</Button>
        </Header>
        <Content>
          <DataTable {...dataTableProps} onPageChange={this.getData} />
        </Content>
      </Layout>
    )
  }
}
