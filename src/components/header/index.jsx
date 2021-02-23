import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuConfig'
import LinkButton from '../link-button';

import './index.less'

const { confirm } = Modal;


class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()),//当前时间字符串
    weather: ''//天气的文本
  }


  getTime = () => { //获取当前时间
    this.intervalId = setInterval(() => {//储存定时器id，卸载时候使用
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }

  getWeather = async () => { //获取天气
    //吴江 320509
    const { weather } = await reqWeather('320509')
    this.setState({ weather })
  }


  getTitle = () => { //获取标题
    //得到当前请求路径
    const path = this.props.location.pathname
    let title
    menuList.forEach(item => {
      //如果当前item的key等于地址栏的key
      if (item.key === path) {
        title = item.title
      } else if (item.children) {
        //在item的children中查找
        const cItem = item.children.find(cItem => cItem.key === path)
        //有值说明匹配到了
        if (cItem) {
          title = cItem.title
        }
      }
    })
    return title
  }

  logout = () => { //退出
    confirm({
      title: '确定退出吗？',
      icon: <ExclamationCircleOutlined />,
      content: '',
      onOk: () => {
        // console.log('OK');
        // 删除保存的user
        storageUtils.removeUser()
        memoryUtils.user = {}
        // 跳转到Login
        this.props.history.replace('/login')
      }
    });
  }

  /**
    * 在第一次render（）之后执行一次
    * 一般在此执行异步操作：发ajax请求/启动定时器
    */
  componentDidMount() {
    //获取当前时间
    this.getTime();
    //获取当前天气
    this.getWeather();

  }

  /**
   * 在当前组建卸载之前，调用 
   * */
  componentWillUnmount() {
    //清除定时器
    clearInterval(this.intervalId)
  }


  render() {
    const { currentTime, weather } = this.state
    const username = memoryUtils.user.username
    const title = this.getTitle()
    return (
      <div className="content">
        <div className="header-top">
          <span>欢迎，{username}</span>
          {/* <a href="#!" onClick={this.logout}>退出</a> */}
          <LinkButton onClick={this.logout}>退出</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{currentTime}</span>
            <span>天气：{weather}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)