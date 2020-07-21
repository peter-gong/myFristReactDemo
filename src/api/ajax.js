/**
 * 能发送异步ajax请求的函数模块
 * 封装axios库
 * 函数返回值是Promise对象
 */

import axios from "axios";

//url必传；data可能为空所以有默认值；get请求最常用，默认可省代码
 export default function ajax(url,data={},type='GET'){
  if(type==='GET'){//发get请求
    return axios.get(url,{//配置对象
      params: data  //指定请求参数
    })
  }else{//发post请求
    return axios.post(url,data)
  }
 }