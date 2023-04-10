import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { login, GetLoggedInUserData } from '../../DataServices/DataServices';
import { useNavigate } from 'react-router-dom';

export default function LoginComponent() {
  let navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        let userData = {
            Username : username,
            Password: password
        }
        console.log(userData);
        let token = await login(userData);
        if(token.token != null){
          localStorage.setItem("Token", token.token);
          await GetLoggedInUserData(username);
          navigate("/");
        }
    }


  return (
    <Container>
        <Row>
            <Col className='mt-5' style={{backgroundColor: 'grey', borderRadius: 5, padding:50}}>
            <h1>Login :3</h1>
            <Form>
      <Form.Group className="mb-3" controlId="Userame">
        <Form.Label>Username</Form.Label>
        <Form.Control 
            type="text" 
            placeholder="Enter Username"
            onChange={({ target: { value } }) =>  setUsername(value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="Password">
        <Form.Label>Password</Form.Label>
        <Form.Control
         type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
           />
      </Form.Group>
      <Button
       variant="primary"
        // type="submit"
        onClick={handleSubmit}
        >
        Login
      </Button>
      
    </Form>
    <h4>Don't have an account?</h4>
    <Button
       variant="primary"
        onClick={() => navigate("/CreateAccount")}
        >
        Create Account
      </Button>
            </Col>
        </Row>
    </Container>
  )
}