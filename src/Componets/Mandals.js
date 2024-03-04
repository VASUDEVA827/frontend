import React, { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import { Layout, Select, Button, Input, Form, Space } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PlusSquareOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Header } = Layout;
const { Option } = Select;

function Divisionsnew() {
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [filters, setFilters] = useState({
    mandals_name: '',
  });

  const handleSubmit = async (formValues) => {
    try {
      const postData = {
       
        division_name: formValues.divisionName,
        mandals_name: formValues.mandalName,
        Constituency: 'Chandragiri', 
      };
  
      const response = await axios.post('http://127.0.0.1:8000/post_division', postData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/divisions/');
        setVoters(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = voters.filter((voter) => {
      return filters.mandals_name === '' || voter.mandals_name.includes(filters.mandals_name);
    });

    setFilteredVoters(filteredData);
  }, [voters, filters]);

  const getDropdownOptions = (data, key) => {
    const uniqueOptions = [...new Set(data.map((item) => item[key]))];
    return ['', ...uniqueOptions];
  };

  const handleFilterChange = (name, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const onFinish = (formValues) => {
    handleSubmit(formValues);
  };

  return (
    <Layout style={{ background: '#F5F5F5' }}>
      <Header style={{ background: '#fff', textAlign: 'left', padding: '5px', border: '3px solid #dedddd', boxShadow: '5px #dedddd', color: 'blue' }}>
        <Space>
          <PlusSquareOutlined style={{ fontSize: '14px' }} />
          <h5>Division New</h5>
        </Space>
      </Header>
      <Content class='container-fluid'>
        <div className='ml-3 mx-auto'>
          <Form className='container lg-5 row justify-content-center' onFinish={onFinish}>
            <Form.Item
              name="constituency"
              label="Constituency"
              rules={[{ required: true }]}
              className='col-xs-6 col-sm-7 text-left mt-4'>
              <Select defaultValue='' style={{ width: 200 }}>
                <Option value='' disabled>
                  Chandragiri
                </Option>
              </Select>
            </Form.Item>

            <Form.Item
              name={"mandalName"}
              label="Mandal Name"
              rules={[{ required: true }]}
              className='col-xs-7 col-sm-7'>
              <select
                className='selectStyle'
                value={filters.mandals_name}
                onChange={(event) => handleFilterChange('mandals_name', event.target.value)}
              >
                <option value="">Select mandal_name</option>
                {getDropdownOptions(voters, 'mandals_name').map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </Form.Item>

            <Form.Item
              label="Division Name"
              name="Division Name"
              rules={[{ required: true }]}
              className='col-xs-7 col-sm-7'>
              <Input onChange={(event) => handleFilterChange('Division Name', event.target.value)} style={{ marginLeft: '2.2vw', width: '25vw' }} />
            </Form.Item>

            <div className='submit d-flex justify-content-center mt-4'>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Content>
    </Layout>
  );
}

export default Divisionsnew;
