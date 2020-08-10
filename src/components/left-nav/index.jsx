import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
// import {
//   AppstoreOutlined,
//   // MenuUnfoldOutlined,
//   // MenuFoldOutlined,
//   PieChartOutlined,
//   DesktopOutlined,
//   ContainerOutlined,
//   MailOutlined,
// } from '@ant-design/icons';

import Logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
import './index.less'

const { SubMenu } = Menu;

export default class LeftNav extends Component {
  /**
   * 根据menu的数据数组生成对应的标签数组
   */
  // getMenuNodes_map = (menuList) => {
  //   return menuList.map(item => {
  //     /* {
  //           title:'首页',//菜单标题名称
  //           key:'/home',//对应的path
  //           icon:'home',//图标名称
  //           children:[],//可能有也可能没有
  //         },
  //      */
  //     if (!item.children) {
  //       return (
  //         <Menu.Item key={item.key} >
  //           <Link to={item.key}>
  //             {item.title}
  //           </Link>
  //         </Menu.Item>
  //       )
  //     } else {
  //       return (
  // <SubMenu key={item.key} title={item.title}>
  //   {this.getMenuNodes(item.children)}
  // </SubMenu>
  //       )
  //     }

  //   })
  // }

  getMenuNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.children) {

        pre.push((
          <Menu.Item key={item.key} >
            <Link to={item.key}>
              {item.title}
            </Link>
          </Menu.Item>
        ))

      } else {
        pre.push((
          <SubMenu key={item.key} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      return pre
    }, [])
  }

  render() {
    return (
      <Link to='/' className='left-nav'>
        <header className='left-nav-header'>
          <img src={Logo} alt="Logo" />
          <h1>硅谷后台</h1>
        </header>
        <Menu
          mode="inline"
          theme="dark"
        >
          {/* <Menu.Item key="/home" icon={<PieChartOutlined />}>
            <Link to='/home'>
              首页
            </Link>            
          </Menu.Item>
          <SubMenu key="sub1" icon={<MailOutlined />} title="商品">
            <Menu.Item key="/category">
            <Link to='/category'>
              品类管理
            </Link>    
            </Menu.Item>
            <Menu.Item key="/product">
            <Link to='/product'>
              商品管理
            </Link></Menu.Item>
          </SubMenu> */}
          {
            this.getMenuNodes(menuList)
          }

        </Menu>
      </Link>
    )
  }
}