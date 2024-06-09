import React, { useState, useEffect,useRef } from 'react';
import { Table, Button, Modal, message } from 'antd';
import axios from 'axios';
import usersService from '../../services/users'
import { DeleteOutlined } from '@ant-design/icons';
import PdfConverter from '../ConvertToPdf/PdfConverter';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
    const response = await usersService.usersList()
      setUsers(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    console.log("entered jere")
    try {
      await usersService.deleteUser(userId); 
      setDeleteModalVisible(false);
      fetchUsers();
      message.success('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error.message);
      message.error('Failed to delete user');
    }
  };

  console.log("users inside",users)

  const contentRef = useRef(null);

  const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
      },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <Button
            onClick={() => {
              setDeleteUserId(record._id);
              setDeleteModalVisible(true);
            }}
            type="danger"
            icon={<DeleteOutlined />} // Replace "Delete" text with trash icon
          />
        ),
      },
  ];

  return (
    <div ref={contentRef}>
      <h1>Customers</h1>
      <Table 
        dataSource={users.filter((customer) => customer.role === "customer")}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
      <PdfConverter html={contentRef} />
      {/* <Button onClick={convertToPdf}>Export</Button> */}

      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={() => handleDelete(deleteUserId)}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </div>
  );
};

export default UserList;
