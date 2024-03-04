import React, { useEffect, useState } from 'react';
import { Layout, Form, Table, Button, Select, Col, Row, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Option } = Select;

function VoterDataVerification() {
  const [records, setRecords] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);

  const [mandalFilter, setMandalFilter] = useState('');
  const [divisionFilter, setDivisionFilter] = useState('');
  const [sachivalayamFilter, setSachivalayamFilter] = useState('');
  const [partNumberFilter, setPartNumberFilter] = useState('');
  const [partNumberSerialFilter, setPartNumberSerialFilter] = useState('');
  const [voterIdFilter, setVoterIdFilter] = useState('');

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://127.0.0.1:8000/getdata/', {
        params: {
          page: pagination.current,
          pageSize: pagination.pageSize,
          mandal: mandalFilter,
          division: divisionFilter,
          sachivalayam: sachivalayamFilter,
          partnumber: partNumberFilter,
          partnumberserial: partNumberSerialFilter,
          voter_id: voterIdFilter,
        },
      });
      setDataSource(response.data);
      setRecords(response.data);
      setPagination((prev) => ({
        ...prev,
        total: response.data.total,
      }));
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
      // Handle error states or show error messages
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.current, pagination.pageSize, mandalFilter, divisionFilter, sachivalayamFilter, partNumberFilter, partNumberSerialFilter, voterIdFilter]);


  const columns = [
    {
      title: "PartNO",
      dataIndex: "Part_No",
      key: "Part_No",
    },
    {
      title: "Village",
      dataIndex: "Village",
      key: "village",
    },
    {
      title: "PartSLNO",
      dataIndex: "Part_SLno",
      key: "Part_SLno",
    },
    {
      title: "Voter ID",
      dataIndex: "voter_id",
      key: "voter_id",
    },
    {
      title: "Name",
      dataIndex: "Name",
      key: "name",
    },
    {
      title: "F/H/M Name",
      dataIndex: "FHM_name",
      key: "FHM_name",
    },
    {
      title: "HNO",
      dataIndex: "HNO",
      key: "hno",
    },
    {
      title: "Age",
      dataIndex: "Age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "Gender",
      key: "Gender",
    },
    {
      title: "Sachivalayam",
      dataIndex: "Sachivalayam_name",
      key: "Sachivalayam_name",
    },
    {
      title: "Divisions",
      dataIndex: "Divisions",
      key: "divisions",
    },
    {
      title: "Mandal",
      dataIndex: "Mandal",
      key: "mandal",
    },
    {
      key: 'actions',
      title: 'Edit',
      render: (record) => <EditOutlined style={{ color: 'blue', marginLeft: 12 }} onClick={handleEdit}/>,
},
  
  ];


  const extractUniqueValues = (columnName) => {
    const uniqueValues = [...new Set(dataSource.map((item) => item[columnName]))];
    return uniqueValues.filter((value) => value !== undefined && value !== null && value !== '');
  };

  const mandalOptions = extractUniqueValues('Mandal');
  const divisionOptions = extractUniqueValues('Division');
  const sachivalayamOptions = extractUniqueValues('Sachivalayam');
  const partNumberOptions = extractUniqueValues('PartNumber');
  const partNumberSerialOptions = extractUniqueValues('PartNumberSerial');
  const voterIdOptions = extractUniqueValues('VoterId');
  //onClick={() => handleEdit(record)}

  // const handleSearch = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get('http://127.0.0.1:8000/getdata/', {
  //       params: {
  //         // Include search parameters here
  //         // For example:
  //         // voterId: '123', // Assuming you want to search by Voter ID
  //         // name: 'John Doe', // Assuming you want to search by name
  //       },
  //     });
  //     setDataSource(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //     setLoading(false);
  //     // Handle error states or show error messages
  //   }
  // };


  const handleEdit = (record) => {
    setEditingRecord(record); 
    setIsEditing(true); 
  };

  return (
    <Layout style={{ background: '#F5F5F5' }}>
      
      <Content className='container-fluid'>

        <div className='Sachivalayam'>     
         <Form layout='inline'>
         <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={6} lg={6}>
                <Form.Item name={'constituency'} label='Constituency'>
                  <Select defaultValue='' style={{ width: '100%' }}>
                    <Option value='' disabled>
                      Chandragiri
                    </Option>
                  </Select>
                </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                <Form.Item name={'mandal'} label='Mandal' style={{ maxWidth: '500px' }}>
                <Select value={mandalFilter} onChange={(value) => setMandalFilter(value)} style={{ width: '100%' }}>
                  {mandalOptions.map((mandal, index) => (
                    <Option key={index} value={mandal}>
                      {mandal}
                    </Option>
                  ))}
                </Select>
                </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                <Form.Item name={'division'} label='Division' style={{ maxWidth: '500px' }}>
                  <Select defaultValue='' style={{ width: '100%' }}>
                    <Option value='' disabled hidden>
                      All
                    </Option>
                    
                  </Select>
                </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                <Form.Item name={'sachivalaym'} label='Sachivalayam' style={{ maxWidth: '500px' }}>
                  <Select defaultValue='' style={{ width: '100%' }}>
                    <Option value='' disabled hidden>
                      All
                    </Option>
                   
                  </Select>
                </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                <Form.Item name={'partnumber'} label='PartNumber' style={{ maxWidth: '500px' }}>
                  <Select defaultValue='' style={{ width: '100%' }}>
                    <Option value='' disabled hidden>
                      All
                    </Option>
                    
                  </Select>
                </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={6} lg={6}>
                <Form.Item name={'partnumber Serial No'} label='PartNumber Serial No' style={{ maxWidth: '500px' }}>
                  <Select defaultValue='' style={{ width: '100%' }}>
                    <Option value='' disabled hidden>
                      All
                    </Option>
                    
                  </Select>
                </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={6}>
                <Form.Item name={'name'} label="Voter ID" >
                 <Input placeholder="" />
                </Form.Item>
                
                </Col>
                <div className='btn'>
                <Button type='primary' >
                <Link to='voterdata/'>Search</Link> 
                </Button>
              
            </div>
                </Row>
              </Form>
              
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          scroll={{ x: '100%' }}
          style={{ borderColor: 'blue', marginTop: 20 }}
          className='custom-table'
          components={{
            header: {
              cell: (props) => <th style={{ backgroundColor: '#113857', color: 'white' }}>{props.children}</th>,
            },
          }}
          loading={loading} // Set loading state for the table
          pagination={{ ...pagination, onChange: (page, pageSize) => setPagination({ current: page, pageSize }) }} // Handle pagination changes
        />
            
         
   
    
    </Content>
  </Layout>
  );
};


export default VoterDataVerification;