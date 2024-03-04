import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetVoterComponent = () => {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedField, setSelectedField] = useState('');
  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        let apiUrl = 'http://127.0.0.1:8000/sai/';

        if (selectedField && filterValue) {
          apiUrl += `?${selectedField}=${filterValue}`;
        }

        const response = await axios.get(apiUrl);
        setVoters(response.data);
      } catch (error) {
        console.error('Error fetching voter data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedField, filterValue]);

  const handleFieldChange = (event) => {
    setSelectedField(event.target.value);
    setFilterValue(''); // Reset filter value when changing the filter field
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div>
      <h1>Voter List</h1>

      <div>
        <label>Select Filter Field:</label>
        <select value={selectedField} onChange={handleFieldChange}>
          <option value="">All</option>
          <option value="mandal">Mandal</option>
          <option value="panchayat">Panchayat</option>
          <option value="booth">Booth</option>
          <option value="voterid">Voter ID</option>
        </select>
      </div>

      {selectedField && (
        <div>
          <label>Enter {selectedField}:</label>
          <input type="text" value={filterValue} onChange={handleFilterValueChange} />
        </div>
      )}

      {loading ? <p>Loading...</p> : (
        <ul>
          {voters.map((voter) => (
            <li key={voter.id}>
              <p>Mandal: {voter.voteridid}</p>
              <p>Mandal: {voter.votername}</p>
              <p>Mandal: {voter.gender}</p>
              <p>Mandal: {voter.voterphone}</p>
              <p>Panchayat: {voter.mandal}</p>
              <p>Booth: {voter.panchayat}</p>
              <p>Voter ID: {voter.booth}</p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GetVoterComponent;
