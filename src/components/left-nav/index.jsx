import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
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

class LeftNav extends Component {
  /**
   * 根据menu的数据数组生成对应的标签数组
   */
  // getMenuNodes_map = (menuList) => {
  //   return menuList.map(item => {
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
    //得到当前请求的路由路径
    const path = this.props.location.pathname
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
        //查找一个与当前请求路径匹配的子item
        const cItem = item.children.find(cItem => cItem.key === path)
        //如果存在，说明当前item的子列表需要打开
        if (cItem) {
          this.openKey = item.key
        }

        pre.push((
          <SubMenu key={item.key} title={item.title}>
            {this.getMenuNodes(item.children)}
          </SubMenu>
        ))
      }
      return pre
    }, [])
  }

  /**
   * 在第一次render()之前执行一次
   * 为第一个render()准备数据（必须同步的）
   */
  componentWillMount() {
    this.menuNodes = this.getMenuNodes(menuList)
  }

  render() {
    //得到当前请求的路由路径
    const path = this.props.location.pathname
    console.log('render()', path)
    //得到需要打开菜单项的key
    const openKey = this.openKey

    return (
      <div className='left-nav'>
        <header className='left-nav-header'>
          <img src={Logo} alt="Logo" />
          <h1>硅谷后台</h1>
        </header>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[path]}
          defaultOpenKeys={[openKey]}
        >

          {
            this.menuNodes
          }

        </Menu>
      </div>
    )
  }
}

//withRouter高阶组件，包装非路由组件，返回新组件，传递3个属性：history/location/match
export default withRouter(LeftNav)