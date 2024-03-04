import React from 'react';
import { Content } from 'antd/es/layout/layout';
import '../css/Sachi.css'
import { Layout, Select, Button, Input ,Form} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
const { Header } = Layout;
const { Option } = Select;


function Sachi() {
  return (
    
      <Layout style={{ background: '#F5F5F5'}}>
      <Content class='container-fluid'> 
      
        <div className='ml-3 mx-auto'>
          <Form className='container lg-5 row justify-content-center '>
          <h3 className="text-center mt-4"> SachivalayamNew</h3>
            <Form.Item
              name={"constituency"}
              label="Constituency"
              rules={[{ required: true }]}
              className='col-xs-6 col-sm-7 text-left mt-4'>
              <Select defaultValue="" className='selectstyle'  >
                <Option value="" disabled >Chandragiri</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"mandalName"}
              label="Mandal Name"
              rules={[{ required: true }]}
              className='col-xs-7 col-sm-7'>
              <Select placeholder="Select mandal" className='selectstyle'>
                <Option value="mandal1">Mandal 1</Option>
                <Option value="mandal2">Mandal 2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"division name"}
              label="Division Name"
              rules={[{ required: true }]}
              className='col-xs-7 col-sm-7'>
              <Select placeholder="Select division" className='selectstyle'>
                <Option value="mandal1">Mandal 1</Option>
                <Option value="mandal2">Mandal 2</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name={"sachivalayam name"}
              label="Sachivalayam Name"
              rules={[{ required: true }]}
              className='col-xs-7 col-sm-7'>
              <Input className='input ' />
            </Form.Item>
            <div className='submit d-flex justify-content-center mt-4'>
              <Button  type="primary" >
                Submit
              </Button>
              </div>
          </Form>
        </div>
       
        
      </Content>
      </Layout>
   
  );
}

export default Sachi;