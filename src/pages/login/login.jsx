import React, { Component } from "react";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/**
 * 登录路由组件
 */

import './login.less'
import logo from './images/logo.png'
import {reqLogin} from '../../api'





export default class Login extends Component {

  onFinish = async (err,values) => {
    // console.log('Received values of form: ', values);
    //请求登录
    console.log(err);
    const {username,password} = values;
    try{
      const response = await reqLogin(username,password)
      console.log('请求成功！',response.data)
    }catch(error){
      console.log("请求失败");
    }
    
  };

  /**对密码进行自定义验证  */
  validatePwd=(rule,value)=>{
    if (!value) {
      return Promise.reject('密码不能为空！');
    }else if (value.length < 4) {
      return Promise.reject('密码最少4位！');
    }else if (value.length > 12) {
      return Promise.reject('密码最多12位！');
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject('密码必须是字母数字或下划线！');
    }else{
      return Promise.resolve();
    }
  }

  render() {
    return (
      <div className="login">
        <head className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </head>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  whitespace:true,
                  message: '必须输入用户名!',
                },
                {
                  max: 12,
                  message: '长度最多12位！',
                },
                {
                  min: 4,
                  message: '长度最少4位！',
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: '用户名必须是字母数字或下划线！',
                }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="site-form-item-icon" />} 
                placeholder="用户名" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  validator:this.validatePwd
                }
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}


/**
 * 消灭回调函数，使用
 * async和await
 * 1.作用？
 * 简化promise使用：不用使用.then()来指定成功/失败的回调函数
 * 以同步编码（没有回调函数）方式，实现异步流程
 * 
 * 2.哪里写await
 * 在返回promise的表达式的左侧写await：不想要promise，想要promise异步执行的成功的value数据
 * 
 * 3.哪里写async?
 * await所在函数最近的函数的左侧写async
 * 
 * 
 */