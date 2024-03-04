import React from 'react';
import { Content } from 'antd/es/layout/layout';

import { Layout, Select, Button, Input ,Form} from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
const { Header } = Layout;
const { Option } = Select;

function Mandalsnew(){
  return (
    
      <Layout style={{ background: '#F5F5F5'}}>
      <Content class='container-fluid'> 
        <div className='ml-3 mx-auto'>
          <Form className='container lg-5 row justify-content-center '>
          <h3 className="text-center mt-4"> Mandals-New</h3>
            <Form.Item
              name={"constituency"}
              label="Constituency"
              rules={[{ required: true }]}
              className='col-xs-6 col-sm-7 text-left mt-4'>
              <Select defaultValue="" style={{marginLeft:'2.7vw',width:'25vw'}} >
                <Option value="" disabled >Chandragiri</Option>
              </Select>
            </Form.Item>
            <Form.Item
                label="Mandal Name"
                name="Mandal Name"
                rules={[{ required: true }]}
                className='col-xs-7 col-sm-7'>
                <Input style={{marginLeft:'2.2vw',width:'25vw'}}  />
              </Form.Item>
            <div className='submit d-flex justify-content-center mt-4'>
              <Button  type="primary">
                Submit
              </Button>
              </div>
          </Form>
        </div>
    
      </Content>
      </Layout>
   
  );
}

export default Mandalsnew;