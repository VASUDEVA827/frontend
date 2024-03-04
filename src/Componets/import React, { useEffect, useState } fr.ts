import React, { useEffect, useState } from 'react';
import Head from './Heading';
import Slide from './Slide';
import '../css/Report.css';
import axios from 'axios';

const Report = () => {
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [filters, setFilters] = useState({
    mandal: '',
    panchayat: '',
    booth: '',
    voterId: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get'); // Replace with your actual API endpoint
        setVoters(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once (on mount)

  useEffect(() => {
    // Apply filters when voters or filters change
    const filteredData = voters.filter((voter) => {
      return (
        (filters.mandal === '' || voter.mandal.includes(filters.mandal)) &&
        (filters.panchayat === '' || voter.panchayat.includes(filters.panchayat)) &&
        (filters.booth === '' || voter.booth.includes(filters.booth)) &&
        (filters.voterId === '' || voter.voterid.includes(filters.voterId))
      );
    });

    setFilteredVoters(filteredData);
  }, [voters, filters]);

  const getDropdownOptions = (data, key) => {
    const uniqueOptions = [...new Set(data.map((item) => item[key]))];
    return ['', ...uniqueOptions];
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  return (
    <>
      <div>
        <Head />
        <Slide />
      </div>
      <div className='re'>
        <div className='tble'>
          <h1>Voter Survey List</h1>
          <div className="filters">
            <label>Mandal:</label>
            <select
              name="mandal"
              value={filters.mandal}
              onChange={handleFilterChange}
            >
              {getDropdownOptions(voters, 'mandal').map((option, index) => (
                <option key={index} value={option}>
                  {option === '' ? 'Select Mandal' : option}
                </option>
              ))}
            </select>

            <label>Panchayat:</label>
            <select
              name="panchayat"
              value={filters.panchayat}
              onChange={handleFilterChange}
            >
              {getDropdownOptions(voters, 'panchayat').map((option, index) => (
                <option key={index} value={option}>
                  {option === '' ? 'Select Panchayat' : option}
                </option>
              ))}
            </select>

            <label>Booth:</label>
            <select
              name="booth"
              value={filters.booth}
              onChange={handleFilterChange}
            >
              {getDropdownOptions(voters, 'booth').map((option, index) => (
                <option key={index} value={option}>
                  {option === '' ? 'Select Booth' : option}
                </option>
              ))}
            </select>

            <label>Voter ID:</label>
            <select
              name="voterId"
              value={filters.voterId}
              onChange={handleFilterChange}
            >
              {getDropdownOptions(voters, 'voterid').map((option, index) => (
                <option key={index} value={option}>
                  {option === '' ? 'Select Voter ID' : option}
                </option>
              ))}
            </select>
          </div>

          <table className='table_class'>
            <thead>
              <tr>
                <th>Voterid</th>
                <th>Name</th>
                <th>S/o</th>
                <th>Gender</th>
                <th>phone</th>
                <th>Mandal</th>
                <th>Panchayat</th>
                <th>Booth</th>
              </tr>
            </thead>
            <tbody>
              {filteredVoters.map((d, i) => (
                <tr key={i}>
                  <td>{d.voterid}</td>
                  <td>{d.votername}</td>
                  <td>{d.fathername}</td>
                  <td>{d.gender}</td>
                  <td>{d.voterphone}</td>
                  <td>{d.mandal}</td>
                  <td>{d.panchayat}</td>
                  <td>{d.booth}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Report;
