import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import './index.scss'

const { SubMenu } = Menu
export default class LeftNav extends Component {
  render() {
    const menuArr = [
      {
        name: '数据统计',
        icon: 'stock',
        path: '/test2'
      },
      {
        name: '商品管理',
        icon: 'book',
        menuItemArr: [
          {
            path: '/category',
            name: '分类管理'
          }
        ]
      },
      {
        name: '订单管理',
        icon: 'ordered-list',
        path: '/test1'
      },
      {
        name: '用户管理',
        icon: 'team',
        path: '/userManage'
      }
    ]
    return (
      <div className="left-nav-wrapper">
        <div className="logo" />
        <Menu
          className="left-menu"
          mode="inline"
          defaultSelectedKeys={['echarts']}
          style={{
            height: '100%',
            borderRight: 0
          }}
        >
          {menuArr.map((item, index) => {
            if (item.menuItemArr) {
              return (
                <SubMenu
                  key={item.name}
                  title={(
                    <span>
                      <Icon type={item.icon} />
                      <span>{item.name}</span>
                    </span>
                  )}
                >
                  {item.menuItemArr.map((obj, inx) => (
                    <Menu.Item key={obj.name}>
                      <Link to={obj.path}>{obj.name}</Link>
                    </Menu.Item>
                  ))}
                </SubMenu>
              )
            }
            return (
              <Menu.Item key={item.name}>
                <Link to={item.path}>
                  <Icon type={item.icon} />
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            )
          })}
        </Menu>
      </div>
    )
  }
}
