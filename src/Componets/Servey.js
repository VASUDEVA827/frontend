import React, { useEffect, useState } from 'react';
import Head from './Heading';
import Slide from './Slide';
import '../css/Report.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const Report = () => {
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [totalVoters, setTotalVoters] = useState(0);
  const [totalMandalVoters, setTotalMandalVoters] = useState(0);
  const [filters, setFilters] = useState({
    mandal: '',
    panchayat: '',
    booth: '',
    voterId: '',
    gender: '',
    age: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/get');
        setVoters(response.data);
        setTotalVoters(response.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = voters.filter((voter) => {
      return (
        (filters.mandal === '' || voter.mandal.includes(filters.mandal)) &&
        (filters.panchayat === '' || voter.panchayat.includes(filters.panchayat)) &&
        (filters.booth === '' || voter.booth.includes(filters.booth)) &&
        (filters.voterId === '' || voter.voterid.includes(filters.voterId)) &&
        (filters.gender === '' || voter.gender === filters.gender) &&
        (filters.age === '' || voter.age === parseInt(filters.age))
      );
    });

    setFilteredVoters(filteredData);
    setTotalMandalVoters(filteredData.length);
  }, [voters, filters]);

  const getDropdownOptions = (data, key, parentKey, parentValue) => {
    const filteredData = parentKey ? data.filter((item) => item[parentKey] === parentValue) : data;
    const uniqueOptions = [...new Set(filteredData.map((item) => item[key]))];
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

        <div className='header'>
          <h3>Voters</h3>
        </div>
      
        <div className='tble'>
          <div className="filter">
            <label>Mandal:</label>
            <select
              name="mandal"
              id='mandal'
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
              id='panc'
              name="panchayat"
              value={filters.panchayat}
              onChange={handleFilterChange}
            >
              {getDropdownOptions(voters, 'panchayat', 'mandal', filters.mandal).map((option, index) => (
                <option key={index} value={option}>
                  {option === '' ? 'Select Panchayat' : option}
                </option>
              ))}
            </select>

            <label>Booth:</label>
            <select
              id='booth'
              name="booth"
              value={filters.booth}
              onChange={handleFilterChange}
            >
              {getDropdownOptions(voters, 'booth', 'panchayat', filters.panchayat).map((option, index) => (
                <option key={index} value={option}>
                  {option === '' ? 'Select Booth' : option}
                </option>
              ))}
            </select>

            <label>Voter ID:</label>
            <select
              id='id'
              name="voterId"
              value={filters.voterId}
              onChange={handleFilterChange}
            >
              {getDropdownOptions(voters, 'voterid', 'booth', filters.booth).map((option, index) => (
                <option key={index} value={option}>
                  {option === '' ? 'Select Voter ID' : option}
                </option>
              ))}
            </select>

            <label>Gender:</label>
            <select
              id='gender'
              name="gender"
              value={filters.gender}
              onChange={handleFilterChange}
            >
              {getDropdownOptions(voters, 'gender').map((option, index) => (
                <option key={index} value={option}>
                  {option === '' ? 'Select Gender' : option}
                </option>
              ))}
            </select>

            <label>Age:</label>
            <input
              type="text"
              id='age'
              name="age"
              value={filters.age}
              onChange={handleFilterChange}
              placeholder="Enter Age"
            />
          </div>

          <div className='data'>
            <h4>Voters</h4>
            
            <p>Total Voters: {totalVoters}</p>
            {filters.mandal && <p>Total Voters in {filters.mandal}: {totalMandalVoters}</p>}
            
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Voterid</th>
                  <th>Name</th>
                  <th>S/o</th>
                  <th>Gender</th>
                  <th>Age</th>
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
                    <td>{d.age}</td>
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
      </div>
    </>
  );
};

export default Report;
