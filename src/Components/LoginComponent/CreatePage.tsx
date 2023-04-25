import React from 'react'
import { useState } from 'react';
import { Container, Row } from 'react-bootstrap'

import { createAccount } from '../../DataServices/DataServices';




import { Form, NavLink } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const background = require("../../assets/jiujitsu.png");

export default function CreatePage2() {
  // let userData = {};


// interface User {
//     name: string;
//     email: string;
//     password: string;
//   }

  // interface userData {
  //   userId: number;
  //   publishName: string;
  // }

  let navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Make function for button
  interface UserData {
    Id: number;
    username: string;
    password: string;
  }
  
  const handleSubmit = (): void => {
    // We want our function to gather the username and password and use that data to make an API call.
    // First, we'll create an object with the user data and log it to the console.
    let userData: UserData = {
      Id: 0,
      username,
      password,
    };

    console.log(userData);

    createAccount(userData);
    navigate("/CreateAccount");

  };


  return (



    
    <Container> 

      <Row className='easy'>


       
       <div
        className='blue-border'
        style={{ 
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minWidth: "1145px",
          minHeight: "700px",
          borderTop: "10px solid rgba(220, 219, 252, 0.99)",
          borderLeft: "10px solid rgba(220, 219, 252, 0.99)",
          borderRight: "10px solid rgba(220, 219, 252, 0.99)",
          
        }}>

          


    
        <Form style={{ position: 'relative',width: '503px', height:'579px', background: "rgba(255, 255, 255, 0.4)", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", margin: "54px auto 68px"}}>
          <h1 style={{ fontWeight: "700", fontSize: "96px", lineHeight: "116px", margin: "0"}}> The Path </h1>
      <p style={{ fontWeight: "700", fontSize: "32px", lineHeight: "39px"}}>A community driven Brazilian Jiu-Jitsu App</p>
        
        <Form.Control id='input' type="text" placeholder="Username"  onChange={({target: {value}}) => setUsername(value)} />

        <Form.Control type="password" placeholder="Password" onChange={({target : {value}}) => setPassword(value)} />
        {/* <Form.Control type="password" placeholder="Confirm Password" /> */}
          
        {/* <div className='form-group form-buttons'>
          <NavLink href="#">Forgot <span> password?</span></NavLink>
          <NavLink href="#">Signup <span>here</span></NavLink>
          <Link path "/Signup"/>
        </div> */}

        <div className='form-group'>
          <button onClick={handleSubmit}  className='btn-pri'> Submit </button>
          
      
          {/* <Route path="/Route.tsx" element={<Route />} /> */}
          {/* <Route path="/" element={<Home />} /> */}


      
          {/* <li><Link to="/components/Signup">React</Link></li> */}
        </div>
        </Form>
      
    </div>
          </Row>
      
    </Container>
  )
}
