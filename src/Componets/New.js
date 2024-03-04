import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const COLORS = ['#113857', '#00FF00'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div style={{ background: 'white', border: '1px solid #ddd', padding: '10px' }}>
        <p>{`${label} : ${payload[0].value}%`}</p>
        <p>{`Category: ${payload[0].name}`}</p>
      </div>
    );
  }
  return null;
};

const GenderPieChart = () => {
  const [voters, setVoters] = useState([]);
  const [maleCount, setMaleCount] = useState(0);
  const [femaleCount, setFemaleCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/sai');
        if (Array.isArray(response.data)) {
          setVoters(response.data);

          // Calculate male and female counts
          const maleCount = response.data.filter((voter) => voter.Gender.trim() === 'Male').length;
          const femaleCount = response.data.filter((voter) => voter.Gender.trim() === 'Female').length;

          setMaleCount(maleCount);
          setFemaleCount(femaleCount);
        } else {
          console.error('Invalid data format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const totalVoters = voters.length;

  const pieChartData = [
    { category: 'Male', value: maleCount },
    { category: 'Female', value: femaleCount },
  ];

  // Calculate percentages
  const malePercentage = (maleCount / totalVoters) * 100;
  const femalePercentage = (femaleCount / totalVoters) * 100;

  return (
    <>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            innerRadius="0%"
            outerRadius="80%"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            label
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} name={entry.category} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p>Total Voters: {totalVoters}</p>
        <p>Male Percentage: {malePercentage.toFixed(2)}%</p>
        <p>Female Percentage: {femalePercentage.toFixed(2)}%</p>
      </div>
    </>
  );
};

export default GenderPieChart;
