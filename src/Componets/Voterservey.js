import React, { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import { PlusSquareOutlined } from '@ant-design/icons';
import { Layout, Select, Button, Input, Form, Space } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const { Header } = Layout;
const { Option } = Select;

function Voterservey() {
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [filters, setFilters] = useState({
    Designation_name: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/get/');
        console.log('Fetched data:', response.data);
        setVoters(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = voters.filter((voter) => {
      return (
        (filters.Designation_name === '' || (voter.Designation_name && voter.Designation_name.includes(filters.Designation_name)))
      );
    });

    setFilteredVoters(filteredData);
  }, [voters, filters]);

  const getDropdownOptions = (data, key) => {
    const uniqueOptions = [...new Set(data.map((item) => item[key]))];
    return ['', ...uniqueOptions];
  };

  const handleFilterChange = (name, value) => {
    console.log(`Selected ${name}: ${value}`);
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://your-django-backend-api-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filters),
      });

      if (response.ok) {
        console.log('User registration successful');
      } else {
        console.error('Error submitting user registration');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Layout style={{ background: '#F5F5F5' }}>
      <Header style={{ background: '#fff', textAlign: 'left', padding: '5px', border: '3px solid #dedddd', boxShadow: '5px #dedddd', color: 'blue' }}>
        <Space>
          <PlusSquareOutlined style={{ fontSize: '20px' }} />
          <h5>Add User</h5>
        </Space>
      </Header>
      <Content className='container-fluid container-center'>
        <div className='ml-3 mx-auto'>
          <Form className='container lg-5 row justify-content-center'>
            <h3 className="text-center mt-4">User Registration</h3>
            <Form.Item
              label="User Name"
              name="userName"
              rules={[{ required: true }]}
              className='col-xs-7 col-sm-7'>
              <Input className='selectstyle' />
            </Form.Item>

            <Form.Item
              label="Phone No"
              name="phoneNumber"
              rules={[{ required: true }]}
              className='col-xs-7 col-sm-7'>
              <Input className='selectstyle' />
            </Form.Item>

            <Form.Item
              name="Designation_name"
              label="Designation"
              rules={[{ required: true }]}
              className='col-xs-7 col-sm-7'>
              <Select
                className='selectStyle'
                value={filters.Designation_name}
                onChange={(value) => handleFilterChange('Designation_name', value)}
              >
                <Option value="">Select Designation</Option>
                {getDropdownOptions(voters, 'Designation_name').map((option, index) => (
                  <Option key={index} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <div className='submit d-flex justify-content-center mt-4'>
              <Button type="primary" id='btn' onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}

export default Voterservey;
