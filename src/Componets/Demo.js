import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const { Option } = Select;

const pieParams = { height: 200, margin: { right: 5 } };

const Demo = () => {
  const [voters, setVoters] = useState([]);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedAge, setSelectedAge] = useState('');
  const [ageFrom, setAgeFrom] = useState('');
  const [ageTo, setAgeTo] = useState('');
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);
  const [genderData, setGenderData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/sai');
        if (Array.isArray(response.data)) {
          setVoters(response.data);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const filterData = () => {
    if (voters && voters.length > 0) {
      let filteredData = voters;

      if (selectedGender) {
        filteredData = filteredData.filter((voter) => voter.Gender.trim() === selectedGender);
      }

      if (selectedAge && ageFrom && ageTo) {
        filteredData = filterAgeRange(filteredData, ageFrom, ageTo);
      }

      return filteredData;
    }

    return [];
  };

  const filterAgeRange = (data, from, to) => {
    return data.filter((voter) => {
      const age = parseInt(voter.Age, 10);
      return age >= parseInt(from, 10) && age <= parseInt(to, 10);
    });
  };

  const countGender = (data, gender) => {
    return data.filter((voter) => voter.Gender.trim() === gender).length;
  };

  useEffect(() => {
    const filteredData = filterData();
    const maleCount = countGender(filteredData, 'Male');
    const femaleCount = countGender(filteredData, 'Female');

    setMaleCount(maleCount);
    setFemaleCount(femaleCount);

    // Calculate genderData for the PieChart
    const genderData = [['Gender', 'Count'], ['Male', maleCount], ['Female', femaleCount]];
    setGenderData(genderData);
  }, [voters, selectedGender, selectedAge, ageFrom, ageTo]);

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const handleAgeChange = (value) => {
    setSelectedAge(value);
  };

  const handleAgeFromChange = (value) => {
    setAgeFrom(value);
  };

  const handleAgeToChange = (value) => {
    setAgeTo(value);
  };

  return (
    <Stack direction="column" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <Typography>Gender PieChart</Typography>
        {genderData.length > 0 ? (
          <PieChart series={[{ data: genderData }]} {...pieParams} />
        ) : (
          <Typography>No gender data available for the PieChart</Typography>
        )}
      </Box>
      <Stack direction="row" spacing={2}>
        <Box flexGrow={1}>
          <Typography>Barchart</Typography>
          {/* Modify the BarChart as needed */}
          {/* Use filteredData to create the series and xAxis */}
          <BarChart
            xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
            series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
            width={500}
            height={300}
          />
        </Box>
      </Stack>
      {/* Add the Select components and other UI elements for age filtering */}
      <Select value={selectedGender} onChange={handleGenderChange}>
        <Option value="Male">Male</Option>
        <Option value="Female">Female</Option>
      </Select>
      {/* Add other Select components for age filtering */}
    </Stack>
  );
};

export default Demo;


