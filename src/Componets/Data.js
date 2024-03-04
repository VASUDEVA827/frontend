import React, { useState, useEffect } from 'react';
import { Layout, Select, Button, Input, Form } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Header, Content } = Layout;
const { Option } = Select;

const VoterSurvey = () => {
  const [formData, setFormData] = useState({
    voterId: '',
    mobile: '',
    residentialAddress: '',
    surveyPlus: '',
    issue: '',
    reason: '',
  });

  const [partyOptions, setPartyOptions] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    const fetchPartyOptions = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/get_party');
        if (response.ok) {
          const data = await response.json();
          setPartyOptions(data);
        } else {
          console.error('Failed to fetch party options');
        }
      } catch (error) {
        console.error('Error fetching party options:', error);
      }
    };

    fetchPartyOptions();
  }, []);

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/post_tiket/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Survey submitted successfully!');
        setShowSuccessPopup(true);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error('Failed to submit survey');
      }
    } catch (error) {
      console.error('Error during survey submission:', error);
    }
  };

  return (
    <Layout style={{ background: '#F5F5F5' }}>
      <Header style={{ background: '#fff', textAlign: 'left', padding: '5px', border: '3px solid #dedddd', boxShadow: '5px #dedddd', color: '#113857' }}>
        <h3>Voter Survey</h3>
      </Header>
      <Content className='container-fluid'>
        <div className='ml-3 mx-auto'>
          <Form className='container lg-5 row justify-content-center ' onSubmit={handleSubmit}>
            <Form.Item label='VOTER ID' rules={[{ required: true }]}>
              <Input value={formData.voterId} onChange={(e) => handleChange(e, 'voterId')} />
            </Form.Item>

            <Form.Item label='MOBILE NUMBER' rules={[{ required: true }]}>
              <Input type='number' value={formData.mobile} onChange={(e) => handleChange(e, 'mobile')} />
            </Form.Item>

            <Form.Item label='RESIDENTIAL ADDRESS' rules={[{ required: true }]}>
              <Input value={formData.residentialAddress} onChange={(e) => handleChange(e, 'residentialAddress')} />
            </Form.Item>

            <Form.Item label='SURVEY PULSE' rules={[{ required: true }]}>
              <Select value={formData.surveyPlus} onChange={(value) => handleChange({ target: { value } }, 'surveyPlus')}>
                <Option value='select option'>Select option</Option>
                {partyOptions.map((party) => (
                  <Option key={party.name} value={party.name}>
                    {party.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label='ISSUE' rules={[{ required: true }]}>
              <Input value={formData.issue} onChange={(e) => handleChange(e, 'issue')} />
            </Form.Item>

            <Form.Item label='REASON' rules={[{ required: true }]}>
              <Input value={formData.reason} onChange={(e) => handleChange(e, 'reason')} />
            </Form.Item>

            <div className='submit d-flex justify-content-center mt-4'>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            </div>
          </Form>
        </div>
        {showSuccessPopup && (
          <div className='popup'>
            <p>Data submitted successfully!</p>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default VoterSurvey;
