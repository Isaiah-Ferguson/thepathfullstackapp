import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { createAccount } from '../../DataServices/DataServices';
import { useNavigate } from 'react-router-dom';

export default function CreateAccountComponent() {
  let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        let userData = {
            id: 0,
            Username : username,
            Password: password
        }
        if(!userData.Username === null && !userData.Password === null){
          console.log(userData);
        createAccount(userData);
        navigate("/");
        }
        
    }


    return (
      <div className='loginBg'>
      <Container className='d-flex justify-content-center mobileContainer' style={{paddingTop: 150}}>
          <Row className='wrapperRegistration' >
              <Col className='form-box'>
              <h1 className='d-flex justify-content-center'>The Path</h1>
              <h4 className='d-flex justify-content-center'>New Account Registration</h4>
              <Form>
        <Form.Group className="mb-3 input-box" controlId="Userame">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" onChange={({ target: { value } }) => setUsername(value)}/>
        </Form.Group>
  
        <Form.Group className="mb-3 input-box" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Button className='Buttons' style={{marginTop: 20}} onClick={handleSubmit} >
          Confirm Submission
        </Button>
        <h5 className='BackToLogin' onClick={(e) => navigate('/')}>Back</h5>
      </Form>
      
        
              </Col>
          </Row>
      </Container>
      </div>
    )
  
}
