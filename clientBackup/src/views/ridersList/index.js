import React, { useState, useEffect ,useRef} from 'react';
import { Table, Button, Modal, message } from 'antd';
import axios from 'axios';
import usersService from '../../services/users'
import { DeleteOutlined } from '@ant-design/icons';
import BookingRequestView from '../../pages/Rider/BookingRequestView';
import PdfConverter from '../../components/ConvertToPdf/PdfConverter';


const RiderList = () => {
  const contentRef = useRef(null);

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
      {/* <BookingRequestView /> */}
      <h1>Riders</h1>
      <Table 
        dataSource={users.filter((rider) => rider.role === "rider")}
        columns={columns}
        loading={loading}
        rowKey="_id"
      />
      <PdfConverter html = {contentRef} />
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

export default RiderList;
