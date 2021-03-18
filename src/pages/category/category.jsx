import React, { useState, useEffect } from 'react'
import { Button, Card, message, Modal, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'


import LinkButton from '../../components/link-button'
import { reqCategories, reqAddCategory, reqUpdateCategory } from '../../api'
import './category.less'

const Category = () => {
  const [loading, setLoading] = useState(false) // 是否正在获取数据中
  const [categories, setCategories] = useState([]) // 一级分类列表
  const [addModalVisible, setAddModalVisible] = useState(false); // 添加窗口显示状态
  const [editModalVisible, setEditModalVisible] = useState(false); // 编辑窗口显示状态



  // 异步获取一级分类列表
  const getCategories = async () => {
    // 再发请求前，显示loading
    setLoading(true)
    const result = await reqCategories('0')
    // 再发请求后，隐藏loading
    setLoading(false)
    if (result.status === 0) {
      setCategories(result.data)
    } else {
      message.error('获取分类列表失败')
    }
  }

  // 显示窗口
  const showModal = (e) => {
    console.log('add', e.target.innerText)
    if (e.target.innerText === '添加') { // 显示添加
      setAddModalVisible(true)
    } else if (e.target.innerText === '修改分类') { // 显示编辑
      setEditModalVisible(true)
    }
  };

  // 添加弹出框确认
  const addOk = () => {
    addCategory()
  };

  // 编辑弹出框确认
  const editOk = () => {
    editCategory()
  };

  // 弹出框取消
  const handleCancel = () => {
    setAddModalVisible(false);
    setEditModalVisible(false);
  };

  // 添加分类
  const addCategory = () => {
    console.log('addCategory')
    setAddModalVisible(false);
  }

  // 编辑分类
  const editCategory = () => {
    console.log('editCategory')
    setEditModalVisible(false);
  }


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
            <LinkButton onClick={showModal}>修改分类</LinkButton>
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
    <Button type='primary' onClick={showModal}><PlusOutlined />添加</Button>
  )

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
        pagination={{ defaultPageSize: 5 }}
        loading={loading}
      />
      <Modal title="添加分类" visible={addModalVisible} onOk={addOk} onCancel={handleCancel}>
        <p>所属分类：</p>
        <p>分类名称：</p>
      </Modal>
      <Modal title="更新分类" visible={editModalVisible} onOk={editOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Card>
  )
}
export default Category