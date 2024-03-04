import React, { useState } from 'react'
import '../css/Slide.css';
import { Link } from 'react-router-dom';
const Slide = () => {
  
  const [selectedValue, setSelectedValue] = useState(''); // State to manage the selected value

  const handleDropdownChange = (event) => {
    // Handle the change locally
    setSelectedValue(event.target.value);
  };
  return (
    <>
    <div className='slide'>
     
      <Link to="/"><h1 style={{color:"white",position:"relative",top:100}}>Menu</h1></Link>
      <Link to="/nav/voterlist"><h4 style={{color:"white",position:"relative",top:100}}>Voter</h4></Link>
      <Link to="/nav/servey"><h4 style={{color:"white",position:"relative",top:100}}>Servey</h4></Link>
      <Link to="/nav/voterservey"><h4 style={{color:"white",position:"relative",top:100}}>Votersurvey Report</h4></Link>
      <div className='reg'>
      <label htmlFor="myDropdown" id="label"></label>
      <select id="myDropdown"  value={selectedValue} onChange={handleDropdownChange} >
        <option value="Registraions">Registraions</option>
        <option value="option1">User Registraion</option>
        <option value="option2">Voter Registraion</option>

        <option value="option3"><button><Link to="/nav/volunteer">Volunteer Registraion</Link></button></option>
      </select>
      <Link to="/nav/admin"><h4 style={{color:"white",position:"relative",top:100,left:5}}>Admin</h4></Link>
      <Link to="/nav/Users"><h4 style={{color:"white",position:"relative",top:100,left:5}}>UserLIST</h4></Link>
      <Link to="/nav/data"><h4 style={{color:"white",position:"relative",top:100,left:5}}>Data</h4></Link>
      <Link to="/nav/voterreport"><h4 style={{color:"white",position:"relative",left:50}}>Votrs</h4></Link>
      <Link to="/nav/report"><h4 style={{color:"white",position:"relative",top:100,left:5}}>Report</h4></Link>
      <Link to="/nav/dashboard"><h4 style={{color:"white",position:"relative",top:100,left:5}}>DashBoard</h4></Link>
      <Link to="/nav/new"><h4 style={{color:"white",position:"relative",top:100,left:5}}>new</h4></Link>
      <Link to="/nav/Sachivalayam"><h4 style={{color:"white",position:"relative",top:100,left:5}}>Sachivalayam</h4></Link>
      <Link to="/nav/mandals"><h4 style={{color:"white",position:"relative",top:100,left:5}}>Mandals</h4></Link>
      <Link to="/nav/Politicalparty"><h4 style={{color:"white",position:"relative",top:100,left:5}}>Politicalparty</h4></Link>
      <Link to="/nav/SachivalayamNew"><h4 style={{color:"white",position:"relative",top:100,left:5}}>SachivalayamNew</h4></Link>
      <Link to="/nav/revanth"><h4 style={{color:"white",position:"relative",top:100,left:5}}>Revanth</h4></Link>
      <Link to="/nav/revanthupdate"><h4 style={{color:"white",position:"relative",top:100,left:5}}>Revanth Update</h4></Link>
      <Link to="/nav/sachi"><h4 style={{color:"white",position:"relative",top:100,left:5}}>Sachi</h4></Link>
      <Link to="/nav/mandalnew"><h4 style={{color:"white",position:"relative",top:100,left:5}}>mandal new</h4></Link>
      <Link to="/nav/demo"><h4 style={{color:"white",position:"relative",top:100,left:5}}>Demo</h4></Link>
      
      
      
  
      </div>
  
    </div>
    </>

  )
}

export default Slide;
