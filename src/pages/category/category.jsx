import React, { useState, useEffect } from 'react'
import { Button, Card, message, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'


import LinkButton from '../../components/link-button'
import { reqCategories, reqAddCategory, reqUpdateCategory } from '../../api'
import './category.less'

const Category = () => {
  const [categories, setCategories] = useState([])

  const columns = [
    {
      title: '分类名称',
      dataIndex: 'name'
    },
    {
      title: '操作',
      width: 300,
      dataIndex: '',
      render: () => {
        return (
          <span>
            <LinkButton>修改分类</LinkButton>
            <LinkButton>查看子分类</LinkButton>
          </span>
        )
      }
    },
  ];

  // card的左侧，因后续有扩展，先固定显示字符串
  const title = '一级分类列表'

  // card的右侧
  const extra = (
    <Button type='primary'><PlusOutlined />添加</Button>
  )

  // 异步获取一级分类列表

  const getCategories = async () => {
    const result = await reqCategories('0')
    if (result.status === 0) {
      debugger
      setCategories(result.data)
    } else {
      message.error('获取分类列表失败')
    }
  }

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <Card title={title} extra={extra}>
      <Table
        columns={columns}
        dataSource={categories}
        bordered
        rowkey='key'
      />
    </Card>
  )
}
export default Category