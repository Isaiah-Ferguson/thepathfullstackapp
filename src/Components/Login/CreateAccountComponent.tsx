import React from 'react'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { createAccount } from '../../DataServices/DataServices';


export default function CreateAccountComponent() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        let userData = {
            id: 0,
            Username : username,
            Password: password
        }
        console.log(userData);
        createAccount(userData);
        
    }


  return (
    <Container>
        <Row>
            <Col className='mt-5' style={{backgroundColor: 'grey', borderRadius: 5, padding:50}}>
            <h1>Create Account :3</h1>
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
        Submit
      </Button>
    </Form>
            </Col>
        </Row>
    </Container>
  )
  
}
