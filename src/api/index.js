/**
 * 要求：能根据接口文档定义接口请求
 * 包含应用中所有接口请求函数的模块
 * 每个函数的返回值都是Promise
 */

import jsonp from 'jsonp';
import {
  message
} from 'antd'
import ajax from './ajax'

const BASE = 'http://localhost:5000'


//登录
//  export function reqLogin(username,password){
//   ajax('/login',{username,password},'POST')
//  }
//登录
export const reqLogin = (username, password) => ajax(BASE + '/login', {
  username,
  password
}, 'POST')
//添加用户
export const reqAddUser = (user) => ajax(BASE + '/manage/user/add', user, 'POST')

// 获取一级/二级分类的列表

// 添加分类

// 更新分类（名称）






/**
 * jsonp 请求的接口请求函数
 */

export const reqWeather = (cityCode) => {
  // 百度接口 const url = `http://api.map.baidu.com/weather/v1/?district_id=${cityCode}&data_type=all&ak=OEl0CBXhShoNpMTSvex27Tz4jMAprajo`
  //返回promise
  return new Promise((resolve, reject) => {
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=b5f269a3d1dcafa0af514ccfcfe3a162`
    //发送jsonp请求
    jsonp(url, {}, (error, data) => {
      if (!error && data.status === '1') { //请求成功了
        const {
          weather
        } = data.lives[0]
        resolve({
          weather
        })
      } else { //请求失败了
        message.error('获取天气信息失败！')
      }
    })
  })

}

// reqWeather('320509')