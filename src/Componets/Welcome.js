import React from 'react'
//import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';
import ysr from '../images/ysr.jpg';
import cm from '../images/cm.jpg';
import lead3 from '../images/bsreddy.jpg';
//import '../css/Welcome.css';
//import lead1 from '../images/lead1.jpg';
//import gr from '../images/grn.jpg';
import back from '../images/bgphoto.jpg';
const Welcome = () => {
  return (
    <>
    <div className='back'>
        <img src={back} width={1350} height={670}/>
        <Link to='/nav'><button className="btn btn-outline-light" style={{width:"250px",
        position:"relative",left:"400px",top:"-250px",
        boxShadow:"0 4px 12px 0 #87CEFA, 0 6px 20px 0 #87CEFA", color:"#00572E",
        color:"black"}}>Login</button></Link>
    </div>




    </>
  )
}

export default Welcome;
