import React from 'react';
import { Table, Form, Input, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Politicalparty = () => {
  
  const columns = [
    {
      key: '1',
      title: 'Seq ID',
      dataIndex: 'id',
    },
    {
        key: '2',
        title: 'Name',
        dataIndex: 'name',
      },
      {
        key: '3',
        title: 'Edit',
        render: (record) => (
          <Space>
            <EditOutlined className="edit-icon" style={{ color: 'blue' }} />
          </Space>
        ),
      },
      {
        key: '4',
        title: 'Delete',
        render: (record) => (
          <Space>
            <DeleteOutlined className="delete-icon" style={{ color: 'blue' }}/>
          </Space>
        ),
      },
    ];
       
  const data = [
    {
        id: 1,
        name: 'Priya',
      },
      {
        id: 2,
        name: 'Sathish',
      },
      {
        id: 3,
        name: 'Malli',
      },
  ];

  return (
    <>
    <h2 style={{ textAlign: 'center', color: 'black', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif' }}>Political Parties</h2>
    
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', margin: '10px' }}>
          <Table columns={columns} dataSource={data} bordered  
            components={{
              header: {
                cell: (props) => <th style={{ backgroundColor: '#113857', color: 'white', textAlign:'center' }}>{props.children}</th>, 
              },
            }}  
          />
        </div>
        <div style={{ flex: '1', margin: '5%' }}>
          <Form>
            <Form.Item name={'number'} label="Seq Number" >
              <Input placeholder="Enter Number" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={'name'} label="Party Name" >
              <Input placeholder="Enter Party Name" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary">Add New</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Politicalparty;