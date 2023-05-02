import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useState, useContext } from 'react'
import { login, GetLoggedInUserData, loggedInData } from '../../DataServices/DataServices';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext/UserContext';

export default function LoginComponent() {
  let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
      const data = useContext<any>(UserContext);


    const handleSubmit = async () => {
        let userData = {
            Username : username,
            Password: password
        }
        let token = await login(userData);

        if(token.token != null){
          localStorage.setItem("Token", token.token);
          await GetLoggedInUserData(username);
          const loggedIn = loggedInData();
          data.setUserId(loggedIn.userId);
          navigate("/profile");
        }
    }


  return (
    <div className='loginBg'>
    <Container className='d-flex justify-content-center mobileContainer' style={{paddingTop: 200}}>
        <Row className='wrapper' >
            <Col className='form-box'>
            <h1 className='d-flex justify-content-center'>The Path</h1>
            <h4 className='text-center'>A Community Driven Brazilian Jiu-Jitsu App</h4>
            <Form>
      <Form.Group className="mb-3 input-box" controlId="Userame">
        <Form.Label className='pColor'>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" onChange={({ target: { value } }) => setUsername(value)}/>
      </Form.Group>

      <Form.Group className="mb-3 input-box" controlId="Password">
        <Form.Label className='pColor'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      <p className='pColor' >Forgot <span className='register' onClick={() => navigate("/ForgotPasswordComponent")} >Password?</span></p>
     
      <Button className='Buttons' onClick={handleSubmit} >
        Login
      </Button>
      <p style={{ display: "inline-block", marginTop: 20 }}>Not a member? <span className='register' onClick={() => navigate("/Create")} >Register</span></p>
      <div className='text-center'><small>&copy; The Path. All Rights Reserved 2023.</small></div>
      
    </Form>
    
      
            </Col>
        </Row>
    </Container>
    </div>
  )
}