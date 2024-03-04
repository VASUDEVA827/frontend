import React, { useEffect, useState } from 'react';
import { Table, Select } from 'antd';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Option } = Select;

const Volunteer = () => {
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [filters, setFilters] = useState({
    Mandal: '',
    Sachivalayam: '',
    Part_No: '',
    Part_Serial_No: '',
    ageFrom: '',
    ageTo: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/sai');
        setVoters(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = voters.filter((voter) => {
      const ageInRange =
        (filters.ageFrom === '' || voter.age >= parseInt(filters.ageFrom, 10)) &&
        (filters.ageTo === '' || voter.age <= parseInt(filters.ageTo, 10));
      return (
        (filters.Mandal === '' || voter.Mandal.includes(filters.Mandal)) &&
        (filters.Sachivalayam === '' || voter.Sachivalayam.includes(filters.Sachivalayam)) &&
        (filters.Part_No === '' || voter.Part_No.toLowerCase().includes(filters.Part_No.toLowerCase())) &&
        (filters.Part_Serial_No === '' || voter.Part_Serial_No.includes(filters.Part_Serial_No)) &&
        ageInRange
      );
    });

      setFilteredVoters(filteredData);
}, [voters, filters]);

  const getDropdownOptions = (data, key) => {
    const uniqueOptions = Array.isArray(data) ? ['', ...new Set(data.map((item) => item[key]))] : [''];
    return uniqueOptions;
  };

  const handleFilterChange = (value, name) => {
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const columns = [
    { title: 'Constituency', dataIndex: 'Constituency', key: 'Constituency' },
    { title: 'Part_No', dataIndex: 'Part_No', key: 'Part_No' },
    { title: 'Part_Serial_No', dataIndex: 'Part_Serial_No', key: 'Part_Serial_No' },
    { title: 'Voter ID', dataIndex: 'Voter_ID', key: 'Voter_ID' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Father_or_husband_Name', dataIndex: 'Father_or_husband_Name', key: 'Father_or_husband_Name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Gender', dataIndex: 'Gender', key: 'Gender' },
    { title: 'Mobile Number', dataIndex: 'Mobile', key: 'Mobile' },
    { title: 'Mandal', dataIndex: 'Mandal', key: 'Mandal' },
    { title: 'Sachivalayam', dataIndex: 'Sachivalayam', key: 'Sachivalayam' },
    { title: 'Survey_Pulse', dataIndex: 'Survey_Pulse', key: 'Survey_Pulse' },
    { title: 'Ticket', dataIndex: 'Ticket', key: 'Ticket' },
    { title: 'Residential_Status', dataIndex: 'Residential_Status', key: 'Residential_Status' },
  ];
    const totalVoterCount = filteredVoters.length;
  const maleCount = filteredVoters.filter((voter) => voter.Gender === 'M').length;
  const femaleCount = filteredVoters.filter((voter) => voter.Gender === 'F').length;


  return (
    <div className="container-fluid bg-white">
      <div className="row">
        <div className="col-md-8 mt-5 ">
          <div className="shadow-lg p-1 mb-5 bg-white rounded overflow-auto h-100">
          <div className="row">
  <div className="col-md-12">
 
  <div className="d-flex align-items-left">
  <label className="fs-3 bg-darkblue text-white" style={{ width: '30%' }}>Voter :</label>
  <div className="progress bg-blue">
    <div
      className="progress-bars w-50"
      role="progressbar w-100"
      aria-valuenow={totalVoterCount}
      aria-valuemin="0"
      aria-valuemax={filteredVoters.length}
    >
      {totalVoterCount}
    </div>
  </div>
</div>

            </div>
          </div>
            <Table dataSource={filteredVoters} columns={columns} />
          </div>
        </div>
        <div className="shadow-lg p-3 col-md-4 mt-5 bg-white rounded">
          <div className="row m-4">
            <div className="col-md-6">
              <label className="fs-2">Mandal:</label>
              <Select
                className="form-select p-0 col-md-12 bg-white rounded"
                value={filters.Mandal}
                onChange={(value) => handleFilterChange(value, 'Mandal')}
              >
                {getDropdownOptions(voters, 'Mandal').map((option, index) => (
                  <Option key={index} value={option}>
                    {option === '' ? 'Select Mandal' : option}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="col-md-6">
              <label className="fs-2">Sachivalayam:</label>
              <Select
                className="form-select p-0 col-md-12 bg-white rounded"
                value={filters.Sachivalayam}
                onChange={(value) => handleFilterChange(value, 'Sachivalayam')}
              >
                {getDropdownOptions(voters, 'Sachivalayam').map((option, index) => (
                  <Option key={index} value={option}>
                    {option === '' ? 'Select Sachivalayam' : option}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="row m-4">
          <div className="col-md-6">
    <label className="fs-4">Part_No:</label>
    <Select
      className="form-select p-0 col-md-12 bg-white rounded"
      value={filters.Part_No}
      onChange={(value) => handleFilterChange(value, 'Part_No')}
    >
      {getDropdownOptions(voters, 'Part_No').map((option, index) => (
        <Option key={index} value={option}>
          {option === '' ? 'Select Part_No' : option}
        </Option>
      ))}
    </Select>
  </div>
            <div className="col-md-6">
              <label className="fs-4">Part_Serial_No:</label>
              <Select
                className="form-select p-0 col-md-12 bg-white rounded"
                value={filters.Part_Serial_No}
                onChange={(value) => handleFilterChange(value, 'Part_Serial_No')}
              >
                {getDropdownOptions(voters, 'Part_Serial_No').map((option, index) => (
                  <Option key={index} value={option}>
                    {option === '' ? 'select Part_Serial_No' : option}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="row m-5">
  <div className="col-md-7">
    <label className="fs-4">Age Range:</label>
    <div className="d-flex">
      <input
        type="number"
        placeholder="From"
        className="form-control me-1 p-0 col-md-1 bg-white rounded"
        value={filters.ageFrom}
        onChange={(e) => handleFilterChange(e.target.value, 'ageFrom')}
      />
      <input
        type="number"
        placeholder="To"
        className="form-control p-0 col-md-6 bg-white rounded"
        value={filters.ageTo}
        onChange={(e) => handleFilterChange(e.target.value, 'ageTo')}
      />
        </div>
      </div>
    </div>

          <div className="mb-3 m-4">
            <label className="fs-4">Male:</label>
            <div className="progress h-100">
              <div 
                className="progress-bar bg-primary"
                role="progressbar"
                style={{ width: `${(maleCount / filteredVoters.length) * 100}%` }}
                aria-valuenow={maleCount}
                aria-valuemin="0"
                aria-valuemax={filteredVoters.length}
              >
                {maleCount}
              </div>
            </div>
          </div>

          <div className="mb-3 m-4">
            <label className="fs-4">Female:</label>
            <div className="progress h-100">
              <div
                className="progress-bar bg-pink"
                role="progressbar"
                style={{ width: `${(femaleCount / filteredVoters.length) * 100}%` }}
                aria-valuenow={femaleCount}
                aria-valuemin="0"
                aria-valuemax={filteredVoters.length}
              >
                {femaleCount}
              </div>
            </div>
          </div>
          <div className="mb-3 m-4">
  <label className="fs-4">Total Voter Count:</label>
  <div className="progress">
    <div
      className="progress-bar bg-info"
      role="progressbar"
      style={{ width: `${(totalVoterCount / filteredVoters.length) * 100}%` }}
      aria-valuenow={totalVoterCount}
      aria-valuemin="0"
      aria-valuemax={filteredVoters.length}
    >
      {totalVoterCount}
    </div>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;















