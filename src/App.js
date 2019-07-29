import React, { Component } from 'react'
import './App.scss'
import { LocaleProvider, Layout, Icon } from 'antd'
import zhCN from 'antd/es/locale-provider/zh_CN'
import LeftNav from './views/leftNav'

const { Header, Sider, Content } = Layout

class App extends Component {
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  };

  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <LeftNav />
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </LocaleProvider>

    )
  }
}

export default App
