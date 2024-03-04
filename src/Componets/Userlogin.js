import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import '../css/Userlogin.css';
import jagan from '../images/jagan.jpg';
import photo1 from '../images/photo1.png';
import mohit from '../images/mohit.jpg';




const Userlogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const navigate = useNavigate();

  const handleCaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!recaptchaValue) {
      setErrorMessage('Please complete the CAPTCHA');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/token/', {
        username,
        password,
      });

      if (response.status === 200) {
        const accessToken = response.data.access;
        // Save the access token to local storage or state for later use
        // For example, you can use a state management library like Redux
        localStorage.setItem('accessToken', accessToken);

        // Navigate to the '/nav/menu' page
        navigate('/nav/menu');
      } else {
        // Set error message for invalid credentials
        setErrorMessage('Invalid Username or Password');
      }
    } catch (error) {
      console.error(error);
      // Set error message for other errors
      setErrorMessage('Invalid Username or Password');
    }
  };

  return (
    <>
      <div className='bg'></div>

      <div className='container'>
        <div className='mohit'>
          {' '}
          <img src={mohit} className='p2' />
          <h5>CHEVIREDDY MOHITH REDDY</h5>
          <br />
          <h6 id='tuda'>(TUDA CHAIRMAN & TTD BOARD MEMBER)</h6>
        </div>

        <div className='chandragiri-map-div'>
          <img src={photo1} id='map-chandragiri' />
          <h5>CHANDRAGIRI CONSTITUENCY</h5>
        </div>

        <form className='login-form' onSubmit={handleSubmit}>
          <div className='form-group'>
            <div id='user-login-heading'>
              <h3>USER LOGIN</h3>
            </div>

            <input
              type='text'
              className='form-control'
              id='exampleInputEmail1'
              placeholder='Enter MobileNo'
              maxLength={10}
              onChange={(e) => setUsername(e.target.value)}
            />
            <small id='emailHelp' className='form-text text-muted'></small>
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='form-group form-check'>
            <input type='checkbox' className='form-check-input' id='exampleCheck1' />
            <label className='form-check-label' htmlFor='exampleCheck1'>
              <b>Forgot Password</b>
            </label>
          </div>

          {/* reCAPTCHA component */}
          <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" onChange={handleCaptchaChange}  id='capcha'/>

       
          <button type='submit' className='btn btn-success' id='btn'>
            Submit
          </button>
          {errorMessage && <p id='invaild'>{errorMessage}</p>}
        </form>
      </div>

      <div className='jagan-image-div'>
        <img src={jagan} id='jagan-image' />
      </div>
    </>
  );
};

export default Userlogin;
