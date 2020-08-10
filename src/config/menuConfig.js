const menuList=[
  {
    title:'首页',//菜单标题名称
    key:'/home',//对应的path
    icon:'<PieChartOutlined />',//图标名称
  },
  {
    title:'商品',
    key:'/products',
    icon:'appstore',
    children:[
      {
        title:'品类管理',
        key:'/category',
        icon:'bars',
      },
      {
        title:'商品管理',
        key:'/product',
        icon:'tool',
      }
    ]
  },
]

export default menuList