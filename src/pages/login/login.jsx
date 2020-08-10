import React, { Component } from "react";
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
/**
 * 登录路由组件
 */
import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from "react-router";

export default class Login extends Component {

  onFinish = async (values) => {
    // console.log('Received values of form: ', values);
    //请求登录
    const {username,password} = values;
    const result = await reqLogin(username,password)
    console.log('请求成功！',result)
    //const result = response.data //{status:0,data:user} {status:1,msg:'xxx'}
   if(result.status===0){
     console.log("登录成功！");
     message.success('登录成功！')

     //保存user
     const user = result.data
     memoryUtils.user = user //保存在内存中
     storageUtils.saveUser(user) //保存到local

     //跳转管理页面,用replace 不需要回退，需要用push
     this.props.history.replace('/')
   }else{
    //  console.log("失败");
     message.error(result.msg)
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
    //如果用户已经登录，则跳转到后台管理页面
    const user = memoryUtils.user;
    if (user && user._id){
      return <Redirect to='/' />
    }

    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo" />
          <h1>React项目：后台管理系统</h1>
        </div>
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