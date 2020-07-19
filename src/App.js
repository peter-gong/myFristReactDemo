/**
 * 应用根组件
 */

 import React, { Component } from 'react'
 import {BrowserRouter,Route,Switch} from 'react-router-dom'

 import Login from './pages/login/login'
 import Admin from './pages/admin/admin'

 export default class App extends Component{
    render(){
      return (
        <BrowserRouter>{/* 路由器 */}
          <Switch>{/* 设置仅匹配一个路由 */}
            <Route path='/login' component={Login} ></Route>{/* 标签,key-path,value-组件 */}
            <Route path='/' component={Admin} ></Route>
          </Switch>
        </BrowserRouter>
      )
    }
 }