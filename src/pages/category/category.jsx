import React from 'react'
import { Button, Card, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'


import LinkButton from '../../components/link-button'
import './category.less'

const Category = () => {

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

  const data = [
    {
      key: '1',
      name: 'John Brown',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  // card的左侧，因后续有扩展，先固定显示字符串
  const title = '一级分类列表'

  // card的右侧
  const extra = (
    <Button type='primary'><PlusOutlined />添加</Button>
  )

  return (
    <Card title={title} extra={extra}>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        rowkey='key'
      />
    </Card>
  )
}
export default Category