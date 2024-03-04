import React, { useEffect, useState } from 'react';
import { Content } from 'antd/es/layout/layout';
import '../css/Sachivalayam.css';
import { Layout, Select, Button, Input, Form } from 'antd';
import axios from 'axios';

const { Header } = Layout;
const { Option } = Select;

function SachivalayamNew() {
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [filters, setFilters] = useState({
    mandals_name: '',
    division_name: '',
    sachivalayamName: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/divisions/');
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
        (filters.mandals_name === '' || voter.mandals_name.includes(filters.mandals_name)) &&
        (filters.division_name === '' || voter.division_name.includes(filters.division_name))
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


  
  const handleSubmit = async (formValues, event) => {
    try {
      const postData = {
        Sachivalayam: formValues.sachivalayamName,
        division_name: formValues.divisionName,
        mandals_name: formValues.mandalName,
        Constituency: 'Chandragiri', 
      };

      const response = await axios.post('http://127.0.0.1:8000/api/post', postData);
      console.log('Form submitted successfully:', response.data);
  
      setFilters({
        mandals_name: '',
        division_name: '',
        sachivalayamName: '',
      });
  

      alert('Form submitted successfully');

      window.location.reload();
  

      event.preventDefault();
    } catch (error) {
      console.error('Error submitting form:', error);
      // Display error message if submission fails
      alert('Error submitting form. Please try again.');
    }
  };
  
  
  

  return (
    <Content style={{ background: '#fff', border: '5px solid #ddd', top: '10vh', width: '60%', margin: '10% 10% 0% 15%', padding: '0% 0% 0% 5%' }}>
      <h1>SachivalayamNew</h1>

      <Form className='container' onFinish={(formValues, event) => handleSubmit(formValues, event)}>
  {/* ... rest of the form */}
        <Form.Item name="constituency" label="Constituency">
          <Select defaultValue="Chandragiri" className='selectStyle' showSearch>
            <Option value="Chandragiri">Chandragiri</Option>
          </Select>
        </Form.Item>
        <Form.Item name="mandalName" label="Mandal Name">
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
        <Form.Item name="divisionName" label="Division Name">
          <select
            className='selectStyle'
            value={filters.division_name}
            onChange={(event) => handleFilterChange('division_name', event.target.value)}
          >
            <option value="">Select division_name</option>
            {getDropdownOptions(voters, 'division_name').map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        </Form.Item>
        <Form.Item name="sachivalayamName" label="Sachivalayam Name">
          <Input className='input' onChange={(event) => handleFilterChange('sachivalayamName', event.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
            
          </Button>
        </Form.Item>
      </Form>
    </Content>
  );
}

export default SachivalayamNew;