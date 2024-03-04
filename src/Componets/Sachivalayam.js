import React, { useEffect, useState } from 'react';
import { Table, Select, Button, Layout, Form, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const { Option } = Select;
const { Header, Content } = Layout;

const Sachivalayam = () => {
  const [dataSource, setDataSource] = useState([]);
  const [filteredSachivalayam, setFilteredSachivalayam] = useState([]);
  const [filters, setFilters] = useState({
    mandals_name: '',
    division_name: '',
  });

  const columns = [
    { title: 'Sachivalayam_id', dataIndex: 'Sachivalayam_id', key: 'Sachivalayam_id' },
    { title: 'MandalName', dataIndex: 'mandals_name', key: 'mandals_name' },
    { title: 'DivisionName', dataIndex: 'division_name', key: 'division_name' },
    { title: 'SachivalayamName', dataIndex: 'Sachivalayam_name', key: 'Sachivalayam_name' },
    {
      key: 'edit/delete',
      title: 'Edit/Delete',
      render: (record) => (
        <>
          <EditOutlined style={{ color: 'blue', marginLeft: 12 }} />
          <DeleteOutlined
            style={{ color: 'blue', marginLeft: 12 }}
            onClick={() => showDeleteConfirm(record.Sachivalayam_id)}
          />
        </>
      ),
    },
  ];

  const handleAddRow = () => {
    const newRow = {
      Sachivalayam_id: 'NewID',
      mandals_name: 'New Mandal',
      division_name: 'New Division',
      Sachivalayam_name: 'New Sachivalayam',
    };
    setDataSource([...dataSource, newRow]);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/getsachivalayam/');
      setDataSource(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = dataSource.filter((Sachivalayam) => {
      return (
        (filters.mandals_name === '' || Sachivalayam.mandals_name.includes(filters.mandals_name)) &&
        (filters.division_name === '' || Sachivalayam.division_name.includes(filters.division_name))
      );
    });

    setFilteredSachivalayam(filteredData);
  }, [dataSource, filters]);

  const getDropdownOptions = (data, key) => {
    const uniqueOptions = Array.isArray(data) ? ['', ...new Set(data.map((item) => item[key]))] : [''];
    return uniqueOptions;
  };

  const handleFilterChange = (value, name) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this item?',
      icon: <DeleteOutlined />,
      content: 'This action cannot be undone.',
      onOk: () => handleDelete(id),
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${id}`);
      // Refresh the page
      setDataSource((prevData) => prevData.filter((record) => record.Sachivalayam_id !== id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className='Sachivalayam'>
        <Layout>
          <h1> Sachivalayam</h1>
          <Content style={{ padding: '0 50px' }}>
            <div style={{ background: '#fff', padding: 24, minHeight: 580 }}>
              <div className='container'>
                <Form layout='inline'>
                  <Form.Item name={'container'} label='Container'>
                    <Select defaultValue='' style={{ width: 200 }}>
                      <Option value='' disabled>
                        Chandragiri
                      </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={'mandal'}
                    label='Mandal'
                    style={{ maxWidth: '500px' }}
                  >
                    <Select
                      value={filters.mandals_name}
                      onChange={(value) => handleFilterChange(value, 'mandals_name')}
                      style={{ width: 200 }}
                    >
                      {getDropdownOptions(filteredSachivalayam, 'mandals_name').map((option, index) => (
                        <Option key={index} value={option}>
                          {option === '' ? 'Select Mandal' : option}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name={'division'}
                    label='Division'
                    style={{ maxWidth: '500px' }}
                  >
                    <Select
                      value={filters.division_name}
                      onChange={(value) => handleFilterChange(value, 'division_name')}
                      style={{ width: 200 }}
                    >
                      {getDropdownOptions(filteredSachivalayam, 'division_name').map((option, index) => (
                        <Option key={index} value={option}>
                          {option === '' ? 'Select Division' : option}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
              </div>
              <Table
                dataSource={filteredSachivalayam}
                columns={columns}
                bordered
                style={{ borderColor: 'blue', marginTop: 20 }}
                className='custom-table'
                components={{
                  header: {
                    cell: (props) => <th style={{ backgroundColor: '#113857', color: 'white' }}>{props.children}</th>,
                  },
                }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginLeft: 600, marginRight: 600 }}>
                <Button type='primary' onClick={handleAddRow}>
                  Add Row
                </Button>
                <Button type='primary'>Update</Button>
              </div>
            </div>
          </Content>
        </Layout>
      </div>
    </div>
  );
}

export default Sachivalayam;
