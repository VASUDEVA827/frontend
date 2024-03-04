
import React, { useEffect, useState } from 'react';
import { Table, Select } from 'antd';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';


const { Option } = Select;

const Voter = () => {
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [filters, setFilters] = useState({
    Mandal: '',
    Voter_ID:'',
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

  useEffect(() => {
    const filteredData = voters.filter((voter) => {
      const ageInRange =
        (filters.ageFrom === '' || voter.age >= parseInt(filters.ageFrom, 10)) &&
        (filters.ageTo === '' || voter.age <= parseInt(filters.ageTo, 10));

      return (
        (filters.Mandal === '' || voter.Mandal.includes(filters.Mandal)) &&
        (filters.Voter_ID === '' || voter.Voter_ID.includes(filters.Voter_ID)) &&
        (filters.Sachivalayam === '' || voter.Sachivalayam.includes(filters.Sachivalayam)) &&
        (filters.Part_No === '' || (typeof voter.Part_No === 'number' && voter.Part_No === parseInt(filters.Part_No, 10))) &&
        (filters.Part_Serial_No === '' || voter.Part_Serial_No === filters.Part_Serial_No) && 
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
    { title: 'House Number', dataIndex: 'House_Number', key: 'House_Number'},
    { title: 'Sachivalayam', dataIndex: 'Sachivalayam', key: 'Sachivalayam' },
    { title: 'Division', dataIndex: 'Division', key: 'Division' },
    { title: 'Mandal', dataIndex: 'Mandal', key: 'Mandal' },
    { title: 'Mobile Number', dataIndex: 'Mobile', key: 'Mobile' },
    { title: 'Survey_Pulse', dataIndex: 'Survey_Pulse', key: 'Survey_Pulse' },
    { title: 'Ticket', dataIndex: 'Ticket', key: 'Ticket' },
    { title: 'Residential_Status', dataIndex: 'Residential_Status', key: 'Residential_Status' },
  ];

  const totalVoterCount = filteredVoters.length;
  const maleCount = filteredVoters.filter((voter) => voter.Gender === 'Male').length;
  const femaleCount = filteredVoters.filter((voter) => voter.Gender === 'Female').length;

  return (
    <div className="container-fluid bg-white">
      <div className="row">

        <div className="col-md-8 mt-5">
          <div className="shadow-lg p-1 mb-5 bg-white rounded overflow-auto h-100">
            <div className="row">
              <div className="col-md-12 ">
                <div className="d-flex align-items-left">
                  <div className="h-75">
                    <div className=''
                    >
                        <button type="button" className="btn btn-primary w-75 m-5">
              Voters <span class="badge badge-light ">{totalVoterCount}</span>
            </button>  
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Table dataSource={filteredVoters} columns={columns} className=''/>
          </div>
        </div>
        <div className="shadow-lg p-3 col-md-4 mt-5 bg-white rounded">
        <div className='col-md-6 col-sm-7 font-weight-bold mb-3'>
                    <FontAwesomeIcon id="filter-icon" icon={faFilter} /><label id="ticket-list-filterby font-weight-bold">Filter by</label>
                </div>
        <label className="fs-10"></label>
              <div className="d-flex h-45 d-inline-block w-80 px-5">
                <input
                  type="string"
                  placeholder="Voter Id"
                  className="form-control me-1 p-0 col-md-1 bg-white rounded"
                  value={filters.Voter_ID}
                  onChange={(e) => handleFilterChange(e.target.value, 'Voter_ID')}
                />
              
                </div>                
          <div className="row m-5">
            <div className="col-md-6">
              <label className="fs-5">Mandal:</label>
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
              <label className="fs-5">Sachivalayam:</label>
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

          <div className="row m-5">
            <div className="col-md-6">
              <label className="fs-5">Part_No:</label>
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
              <label className="fs-5">Part_Serial_No:</label>
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
              <label className="fs-5">Age Range:</label>
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

          <div className="mb-3 row m-5 ">
            <div className="progress h-100 bg-white">
              <div>
            <button type="Male" className="btn btn-primary w-100">
              Male <span class="badge badge-light ">{maleCount}</span>
            </button>
            </div>
            <div className='btn px-4'>
            <button type="Female" className="btn btn-primary w-100">
              Female <span class="badge badge-light ">{femaleCount}</span>
            </button>
            </div>
            </div>
          </div>
          <button type="button" className="btn btn-primary w-75 m-5">
              Voters <span class="badge badge-light ">{totalVoterCount}</span>
            </button>

          <div>

          
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voter;
