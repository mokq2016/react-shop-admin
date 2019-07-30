import React, { Component } from 'react'
import { Table, Pagination } from 'antd'
import './style.scss'

export default class DataTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedRowKeys: []
    }
  }


  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  onSelectChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedRowKeys
    })
  }

  onChange = (page, pageSize) => {
    this.props.onPageChange(page, pageSize)
  }

  onShowSizeChange = (current, size) => {
    this.props.onPageChange(current, size)
  }


  render() {
    const {
      columns, dataList, selectType, selectedRowKeys, showPager = true
    } = this.props
    const _rowSelection = {
      type: selectType === 'radio' ? 'radio' : 'checkbox',
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: this.onSelectChange
    }
    return (
      <div className="data-table">
        <Table
          size="small"
          columns={columns}
          dataSource={dataList.list}
          rowSelection={selectType ? _rowSelection : null}
          pagination={false}
        />
        {
          showPager ? <Pagination className="paging-wraper" onChange={this.onChange} onShowSizeChange={this.onShowSizeChange} total={50} showSizeChanger showQuickJumper /> : ''
        }

      </div>
    )
  }
}
