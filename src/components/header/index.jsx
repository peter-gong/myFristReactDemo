import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { reqWeather } from '../../api'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import menuList from '../../config/menuConfig'

import './index.less'

class Header extends Component {

  state = {
    currentTime: formateDate(Date.now()),//当前时间字符串
    weather: ''//天气的文本
  }


  getTime = () => {
    setInterval(() => {
      const currentTime = formateDate(Date.now())
      this.setState({ currentTime })
    }, 1000)
  }

  getWeather = async () => {
    //吴江 320509
    const { weather } = await reqWeather('320509')
    this.setState({ weather })
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

  getTitle = () => {
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
        if(cItem){
          title = cItem.title
        }
      }
    })
    return title
  }

  render() {
    const { currentTime, weather } = this.state
    const username = memoryUtils.user.username
    const title = this.getTitle()
    return (
      <div className="content">
        <div className="header-top">
          <span>欢迎，{username}</span>
          <a href="#">退出</a>
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