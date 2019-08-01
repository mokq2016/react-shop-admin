import React, { Component } from 'react'
import {
  Layout, Button, Modal, Form, Input
} from 'antd'

import DataTable from '../../components/dataTable/dataTable'
import createColumns from './column'
import RowSelectHandle from '../../decorators/handleRowSelect'
import http from '@/utils/http.js'

const { Content, Header, Footer } = Layout
const FormItem = Form.Item
const { TextArea } = Input

@RowSelectHandle
class list extends Component {
state = {
  selectedRowKeys: [],
  selectRows: [],
  list: [],
  pager: {
    currentPage: 1,
    pageSize: 10,
    total: 0
  },
  ModalShow: false,
  prodClassName: '',
  described: '',
  remark: ''
}

componentWillMount() {
  this.getData(this.state.pager.currentPage, this.state.pager.pageSize)
}

  getData = (currentPage, pageSize) => {
    http.post('/productClass/list', {}).then((result) => {
      this.setState({
        list: result.list,
        pager: {
          currentPage,
          pageSize,
          total: result.total
        }
      })
    })
  }

  edit = (obj) => {
    console.log(obj)
  }

  deleteRow = () => {
    console.log(this.state.selectRows)
  }

  showModal =() => {
    this.setState({
      ModalShow: true
    })
  }

  handleCancel = () => {
    this.setState({
      ModalShow: false
    })
  }

  render() {
    const dataTableProps = {
      columns: createColumns(this),
      dataList: {
        list: this.state.list,
        ...this.state.pager
      },
      selectedRowKeys: this.state.selectedRowKeys,
      selectType: 'checkbox',
      onRowSelect: this.rowSelectHandle.bind(this)
    }
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    }
    const { prodClassName, described, remark } = this.state
    return (
      <Layout>
        <Header style={{
          background: '#fff', paddingLeft: 10, lineHeight: '54px', height: '54px'
        }}
        >
          <Button type="primary" icon="plus" className="mr-10" onClick={this.showModal}>
            新增
          </Button>
          <Button type="danger" icon="delete" onClick={this.deleteRow} disabled={!(this.state.selectedRowKeys.length > 0)}>删除</Button>
        </Header>
        <Content>
          <DataTable {...dataTableProps} onPageChange={this.getData} />
        </Content>
        <Modal
          visible={this.state.ModalShow}
          onCancel={this.handleCancel}
          footer={null}
          title="新增商品类型"
        >
          <FormItem {...formItemLayout} label="类型名称">
            <Input
              className="input-view"
              onChange={(e) => {
                this.setState({ prodClassName: e.target.value })
              }}
              placeholder="请填写类型名称"
              value={prodClassName}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="描述">
            <Input
              onChange={(e) => {
                this.setState({ described: e.target.value })
              }}
              placeholder="请填写描述"
              value={described}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="备注">
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              onChange={(e) => {
                this.setState({ remark: e.target.value })
              }}
              placeholder="请填写备注"
              value={remark}
            />
          </FormItem>
        </Modal>
      </Layout>
    )
  }
}
export default list
