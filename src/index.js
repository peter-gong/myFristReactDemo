/**
 * 入口
 */

 import React from 'react'
 import ReactDOM from 'react-dom'

 import memoryUtils from './utils/memoryUtils'
 import storageUtils from './utils/storageUtils'

 
 import App from './App'
 //读取local中保存的user,保存在内存中
 memoryUtils.user =  storageUtils.getUser();

 ReactDOM.render(<App />,document.getElementById('root'))