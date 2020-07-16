const {override,fixBabelImports,addLessLoader} = require('customize-cra')

module.exports = override(
  //针对antd实现按需打包： 根据import打包
  //package json 配置react-app-rewired start 才能读取这个文件，使得生效
  fixBabelImports('import',{
    libraryName:'antd',
    libraryDirectory:'es',
    style:true,//自动打包相关样式
  }),

  addLessLoader({
    lessOptions:{//新版本写法，将addLessLoader的配置选项现在将嵌套在一个lessOptions对象中
      javascriptEnabled:true,
      modifyVars:{'@primary-color':'#1DA57A'},
    },    
  }),
);