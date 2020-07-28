import React,{ Component } from "react";

import memoryUtils from '../../utils/memoryUtils'
import { Redirect } from "react-router";
/**
 * 后台管理的路由组件
 */
  export default class Admin extends Component{
    
    render(){

      const user = memoryUtils.user
      if(!user || !user._id){
        return <Redirect to='/login'/>
      }

      return (
        <div>
          Hello {user.username} !
        </div>
      )
    }
  }