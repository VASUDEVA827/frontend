import React from 'react'
import '../css/Heading.css';
import map from '../images/map.jpg';
//import img from '../images/lead1.jpg';
//import cm from '../images/lead2.jpg';
//import img2 from '../images/lead3.jpg';
import { Link } from 'react-router-dom';
const Head = () => {
  return (
 <>
        <div>
            <div>
                <div className='header-color'></div>
            </div>
            <div>
               <div className='main-heading'><h2>Political Parties</h2></div> 
            </div>

            <div>
                <div className='tag'><p><a href=''><Link to='/'>Welcome</Link></a>&nbsp;
            
                <a href=''>change password/</a>&nbsp;
                <a href=''>view site/</a>&nbsp;
                <a href=''><Link to='/nav/logout'>Logout</Link></a></p></div>
        
            </div>

            <div>
                <img src= {map} className='govt-logo'/>
            </div>


             {/* 
            <div style={{position:"relative",float:"right"}}>
                <div><img src={img} className='bs-reddy'/></div>
            </div>

            <div>
                <div><img src={cm} className='cm'/></div>
            </div>

            <div>
                <div><img src={img2} className='cv-reddy'/></div>
            </div>

  */}


            <div>
             
            </div>

            <div>
                
            </div>
            <div><p className='map-name'>Chandragiri Constituency</p></div>

            <div>
                
            </div>
        </div>
        <div>
            
        </div>

      

    </>
  )
}

export default Head;
