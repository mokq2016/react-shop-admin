import React, { Component } from 'react'
import {
  Layout, Button, Modal, Form, Input, message
} from 'antd'

import DataTable from '../../components/dataTable/dataTable'
import createColumns from './column'
import RowSelectHandle from '../../decorators/handleRowSelect'
import http from '@/utils/http.js'

const { Content, Header, Footer } = Layout
const FormItem = Form.Item
const { TextArea } = Input
const { confirm } = Modal

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
  prodclassId: '',
  prodClassName: '',
  described: '',
  remark: '',
  modalType: 'add'
}

componentWillMount() {
  this.getData(this.state.pager.currentPage, this.state.pager.pageSize)
}

  getData = (currentPage, pageSize) => {
    http.post('/productClass/list', {
      page: currentPage,
      rows: pageSize
    }).then((result) => {
      this.setState({
        selectedRowKeys: [],
        selectRows: [],
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
    this.props.form.setFieldsValue({
      prodClassName: obj.prodclassName
    })
    this.setState({
      prodclassId: obj.prodclassId,
      prodClassName: obj.prodclassName,
      described: obj.described,
      remark: obj.remark
    }, () => {
      this.showModal('update')
    })
  }

  deleteRow = (prodclassId) => {
    const self = this
    confirm({
      title: '温馨提示',
      content: '您确定要删除？',
      onOk() {
        self.doDelete(prodclassId)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  doDelete = (prodclassId) => {
    const id = prodclassId || this.state.selectRows.map(item => ({ prodclassId: item.prodclassId }))
    let url = '/productClass/delete'
    let params = { prodclassId: id }
    if (prodclassId === undefined) {
      url = '/productClass/deleteList'
      params = id
    }
    http.post(url, params).then((result) => {
      if (result) {
        message.success('删除成功')
        this.getData(this.state.pager.currentPage, this.state.pager.pageSize)
      }
    })
  }

  addData = () => {
    http.post('/productClass/insert', {
      prodclassName: this.state.prodClassName,
      described: this.state.described,
      remark: this.state.remark
    }).then((result) => {
      if (result) {
        this.setState({
          ModalShow: false
        })
        message.success('添加成功')
        this.getData(this.state.pager.currentPage, this.state.pager.pageSize)
      }
    })
  }

  updateData = () => {
    http.post('/productClass/update', {
      prodclassId: this.state.prodclassId,
      prodclassName: this.state.prodClassName,
      described: this.state.described,
      remark: this.state.remark
    }).then((result) => {
      if (result) {
        this.setState({
          ModalShow: false
        })
        message.success('修改成功')
        this.getData(this.state.pager.currentPage, this.state.pager.pageSize)
      }
    })
  }

  showModal =(type = 'add') => {
    if (type === 'add') {
      this.props.form.setFieldsValue({
        prodClassName: ''
      })
      this.setState({
        prodclassId: '',
        prodClassName: '',
        described: '',
        remark: ''
      })
    }
    this.setState({
      ModalShow: true,
      modalType: type
    })
  }

  handleCancel = () => {
    this.setState({
      ModalShow: false
    })
  }

  check = () => {
    this.props.form.validateFields((err) => {
      if (!err) {
        if (this.state.modalType === 'add') {
          this.addData()
        } else {
          this.updateData()
        }
      }
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form
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
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 24,
          offset: 4
        }
      }
    }
    const { prodClassName, described, remark } = this.state
    return (
      <Layout>
        <Header style={{
          background: '#fff', paddingLeft: 10, lineHeight: '54px', height: '54px'
        }}
        >
          <Button type="primary" icon="plus" className="mr-10" onClick={e => this.showModal('add')}>
            新增
          </Button>
          <Button type="danger" icon="delete" onClick={e => this.deleteRow()} disabled={!(this.state.selectedRowKeys.length > 0)}>删除</Button>
        </Header>
        <Content>
          <DataTable {...dataTableProps} onPageChange={this.getData} />
        </Content>
        <Modal
          visible={this.state.ModalShow}
          onCancel={this.handleCancel}
          footer={null}
          title={this.state.modalType === 'add' ? '新增类型' : '修改类型'}
        >
          <FormItem {...formItemLayout} label="类型名称">
            {
              getFieldDecorator('prodClassName', {
                rules: [
                  {
                    required: true,
                    message: '请填写类型名称'
                  }
                ],
                initialValue: this.state.prodClassName
              })(<Input
                className="input-view"
                onChange={(e) => {
                  this.setState({ prodClassName: e.target.value })
                }}
                placeholder="请填写类型名称"
              />)
            }

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
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" onClick={this.check}>
            确定
            </Button>
          </FormItem>
        </Modal>
      </Layout>
    )
  }
}
const WrappedDynamicRule = Form.create()(list)
export default WrappedDynamicRule
