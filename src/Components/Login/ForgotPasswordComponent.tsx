import React, { useState } from 'react';
import { Col, Container, Row, Form, Button, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../../DataServices/DataServices';



export default function ChangePasswordComponent() {
  let navigate = useNavigate();
  const [passwordTaost, setPasswordToast] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setNewPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const backBTN = require('../../assets/Back.png');
  const [showA, setShowA] = useState(true);

  const handleSubmit = () => {

    if (!/[A-Z]/.test(password) || !/\d/.test(password)) {
      setPasswordToast(true);
      setTimeout(() => {
        setPasswordToast(false);
      }, 4000);
       return
    }

    const userData = {
      Username: username,
      Password: password
    };

    forgotPassword(userData);
    setShowToast(true);
    setToastMessage("Password Changed!")
  }

  const toggleShowB = () => {
    setShowA(!showA);
    setPasswordToast(false);
  };

  return (
    <div className='loginBg'>
      <Container className='d-flex justify-content-center mobileContainer' style={{ paddingTop: 200 }}>
        <Row className='wrapperRegistration'>
          <div className='backIconDiv'>
            <img className='backIcon' onClick={(e) => navigate('/')} src={backBTN} alt="Back" />
          </div>

          <Col className='form-box'>
            <h1 className='d-flex justify-content-center'>The Path</h1>
            <h4 className='d-flex justify-content-center'>Change Password</h4>
            <Form>
              <Form.Group className='mb-3 input-box' controlId='Username'>
                <Form.Label className='pColor'>Username</Form.Label>
                <Form.Control type='text' placeholder='Enter Username' minLength={5} maxLength={20} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group className='mb-3 input-box' controlId='NewPassword'>
                <Form.Label className='pColor'>New Password</Form.Label>
                <Form.Control type='password' placeholder='New Password' minLength={5} maxLength={20} onChange={(e) => setNewPassword(e.target.value)} />
              </Form.Group>
              <p>Password Must Contain 
                <span style={{ color: /[0-9]/.test(password) ? 'blue' : 'red' }}> Number</span>,{' '}
                <span style={{ color: /[A-Z]/.test(password) ? 'blue' : 'red' }}>UpperCase</span></p>

              <Button className='Buttons' style={{ marginTop: 20 }} onClick={handleSubmit}>
                Change Password
              </Button>
              <div style={{ marginTop: 45 }} className='text-center'>
                <small>&copy; The Path. All Rights Reserved 2023.</small>
              </div>
            </Form>
          </Col>
        </Row>

          <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
            <Toast.Body style={{ justifyContent: 'center' }}>{toastMessage}</Toast.Body>
          </Toast>

        {passwordTaost && (
                <Toast onClick={toggleShowB}>
                  <Toast.Body style={{ color: 'black' }}>Password must contain at least one upperCase and one Number</Toast.Body>
                </Toast>
              )}
      </Container>

    </div>
  );
}
