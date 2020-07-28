/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 * 函数返回值是Promise对象
 * 
 * 1.优化1：统一处理请求异常
 *   在外层包一个自己创建的promise对象
 *   在请求出错时，不reject(error),而是显示错误提示
 * 2.优化2：异步得到的不是response，而是response.data
 *   在请求成功resolve时：resolve(response.data)
 */

import axios from "axios";
import {message} from 'antd'

//url必传；data可能为空所以有默认值；get请求最常用，默认可省代码
 export default function ajax(url,data={},type='GET'){

  return new Promise((resolve,reject)=>{
    let promise
    //执行异步ajax请求
    if(type==='GET'){//发get请求
      promise = axios.get(url,{//配置对象
        params: data  //指定请求参数
      })
    }else{//发post请求
      promise = axios.post(url,data)
    }
    //成功了，调用resolve(value)
    promise.then(response=>{
      resolve(response.data)

    //失败了，不调用调用reject(reason)，而是提示异常信息
    }).catch(error =>{
      message.error('请求出错了：'+error.message)

    })
  })

  
 }