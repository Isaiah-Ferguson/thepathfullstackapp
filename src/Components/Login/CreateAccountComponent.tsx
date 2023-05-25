import React from 'react'
import { Col, Container, Row, Form, Button, Toast } from 'react-bootstrap'
import { useState } from 'react'
import { GetAllUsers, createAccount } from '../../DataServices/DataServices';
import { useNavigate } from 'react-router-dom';


  interface UserInfo {
  aboutMe: string;
  id: number;
  image: string;
  academyName: string;
  firstName: string;
  lastName: string;
  publishedName: string;
  username: string;
  belt: string;
}

export default function CreateAccountComponent() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const backBTN = require('../../assets/Back.png')
  const [userToast, setUserToast] = useState(false);
  const [passwordTaost, setPasswordToast] = useState(false);
  const [showA, setShowA] = useState(true);
  const [disableButton, setDisableButton] = useState(true);


  const handleSubmit = () => {

    if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
      return console.log('Password must contain at least one upperCase and one Number')
    }

    async function CreateNewAccount() {

      let userData = {
        id: 0,
        username: username,
        password: password 
      };

      const isUser = await GetAllUsers();
      const isUsernameTaken = isUser.some((user: UserInfo) => user.username === userData.username);
    
      if (isUsernameTaken) {
        setUserToast(true)
      } else if (userData.password === "") {
        setPasswordToast(true);
      } else {
        await createAccount(userData);
        navigate("/");
        // account modal boolean here 
      }
    }
    
    CreateNewAccount();
  }


  const toggleShowA = () => {
    setShowA(!showA);
    setUserToast(false);
  };

  const toggleShowB = () => {
    setShowA(!showA);
    setPasswordToast(false);
  };


  return (
    <div className='loginBg'>
      <Container className='d-flex justify-content-center createPage mobileContainer' style={{ paddingTop: 200 }}>
        <Row className='wrapperRegistration' >
          <div className='backIconDiv'><img className='backIcon' onClick={(e) => navigate('/')} src={backBTN} /></div>
          <Col className='form-box'>
            <h1 className='d-flex justify-content-center'>The Path</h1>
            <h4 className='d-flex justify-content-center'>New Account Registration</h4>
            <Form>
              <Form.Group className="mb-3 input-box" controlId="Userame">
                <Form.Label className='pColor'>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter Username" onChange={({ target: { value } }) => setUsername(value)} />
              </Form.Group>

              <Form.Group className="mb-3 input-box" controlId="Password">
                <Form.Label className='pColor'>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              {userToast && (
                <Toast onClick={toggleShowA}>
                  <Toast.Body style={{ color: 'black' }}>User Name already Exists</Toast.Body>
                </Toast>
              )}
              {passwordTaost && (
                <Toast onClick={toggleShowB}>
                  <Toast.Body style={{ color: 'black' }}>Please enter a Password</Toast.Body>
                </Toast>
              )}

              {disableButton && <Button className='Buttons' style={{ marginTop: 20 }} onClick={handleSubmit} >
                Confirm Submission
              </Button>}
              <div style={{ marginTop: 45 }} className='text-center'><small>&copy; The Path. All Rights Reserved 2023.</small></div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )

}
