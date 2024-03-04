import React, { useState } from 'react'
import Slide from './Slide'
import Head from './Heading'
import '../css/Home.css';
import navrat from '../images/navrat.jpg';

import ReCAPTCHA from "react-google-recaptcha";



const Home = () => {
  const [isVerified, setVerified] = useState(false);

  const handleVerification = () => {
    // This function will be called when the user is verified
    setVerified(true);
  };
  return (
    <>
    <div>
        <Head /><br/>
       <Slide />
    </div>
    <div className='screen'>

        <h1>Home</h1>

        <img src={navrat} />
        <form>
      {/* Your other form fields go here */}
      <ReCAPTCHA
        sitekey="YOUR_RECAPTCHA_API_KEY"
        onChange={handleVerification}
      />
      <button type="submit" disabled={!isVerified}>
        Submit
      </button>
    </form>

    


    </div>


    


    </>
  )
}

export default Home



