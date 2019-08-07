import React, { Component } from 'react'
import {
  Layout, Button, Modal, Form, Input, message, Switch
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
class UserManage extends Component {
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
    formData: {
      userName: ''
    }
  }

  componentWillMount() {
    this.getData(this.state.pager.currentPage, this.state.pager.pageSize)
  }

  setFormData(obj) {
    this.setState({ formData: Object.assign(this.state.formData, obj) })
  }

  /**
   * 删除数据
   */
  deleteRow =(userId) => {
    const self = this
    confirm({
      title: '温馨提示',
      content: '您确定要删除？',
      onOk() {
        self.doDelete(userId)
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  doDelete = (userId) => {
    const id = userId || this.state.selectRows.map(item => ({ userId: item.userId }))
    let params = { userId: id }
    let url = '/user/delete'
    if (!userId) {
      params = id
      url = '/user/deleteList'
    }
    http.post(url, params).then((result) => {
      if (result) {
        message.success('删除成功')
        this.getData(this.state.pager.currentPage, this.state.pager.pageSize)
      }
    })
  }

  getData = (currentPage, pageSize) => {
    http.post('/user/list', {
      page: currentPage,
      rows: pageSize
    }).then((result) => {
      this.setState({
        selectedRowKeys: [],
        selectRows: []

      }, () => {
        this.setState({
          list: result.list,
          pager: {
            currentPage,
            pageSize,
            total: result.total
          }
        })
      })
    })
  }

  handleCancel = () => {
    this.setState({
      ModalShow: false
    })
  }

  showModal = () => {
    this.setState({
      ModalShow: true
    })
  }

  openHandle = (bool) => {
    this.setState({ formData: Object.assign(this.state.formData, { islock: bool }) })
  }

  edit = (obj) => {
    this.props.form.setFieldsValue({
      password: obj.password
    })
    this.setState({
      formData: Object.assign(this.state.formData, {
        userId: obj.userId,
        userName: obj.userName,
        password: obj.password,
        remark: obj.remark,
        email: obj.email,
        levels: obj.levels,
        phone: obj.phone,
        islock: obj.islock !== '0'
      })
    }, () => {
      this.showModal()
    })
  }

  updateData = () => {
    http.post('/user/update', {
      ...this.state.formData,
      islock: this.state.formData.islock ? 1 : 0
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

  check = () => {
    this.props.form.validateFields((err) => {
      if (!err) {
        this.updateData()
      }
    })
  };

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
    const { getFieldDecorator } = this.props.form
    const {
      prodClassName, described, remark, formData
    } = this.state

    return (
      <Layout>
        <Header style={{
          background: '#fff', paddingLeft: 10, lineHeight: '54px', height: '54px'
        }}
        >
          <Button type="danger" icon="delete" onClick={e => this.deleteRow()} disabled={!(this.state.selectedRowKeys.length > 0)}>删除</Button>
        </Header>
        <Content>
          <DataTable {...dataTableProps} onPageChange={this.getData} />
        </Content>
        <Modal
          visible={this.state.ModalShow}
          onCancel={this.handleCancel}
          footer={null}
          title="编辑"
        >
          <FormItem {...formItemLayout} label="用户名">
            <Input
              onChange={(e) => {
                this.setState({ formData: Object.assign(formData, { userName: e.target.value }) })
              }}
              placeholder="请填写用户名"
              value={formData.userName}
              disabled
            />
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {
              getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码'
                  }
                ],
                initialValue: this.state.formData.password
              })(<Input
                className="input-view"
                onChange={(e) => {
                  this.setFormData({ password: e.target.value })
                }}
                placeholder="请填写密码"
              />)
            }

          </FormItem>
          <FormItem {...formItemLayout} label="邮箱">
            <Input
              onChange={(e) => {
                this.setFormData({ email: e.target.value })
              }}
              placeholder="请填写邮箱"
              value={formData.email}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="手机号">
            <Input
              onChange={(e) => {
                this.setFormData({ phone: e.target.value })
              }}
              placeholder="请填写手机号"
              value={formData.phone}
            />
          </FormItem>
          <FormItem {...formItemLayout} label="是否启用">
            <Switch checked={formData.islock} onChange={this.openHandle} />
          </FormItem>
          {/*  <FormItem {...formItemLayout} label="备注" >
            <TextArea
              autosize={{ minRows: 2, maxRows: 6 }}
              onChange={(e) => {
                this.setFormData({ remark: e.target.value })
              }}
              placeholder="请填写备注"
              value={formData.remark}
            />
          </FormItem> */}
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
const WrappedDynamicRule = Form.create()(UserManage)
export default WrappedDynamicRule
