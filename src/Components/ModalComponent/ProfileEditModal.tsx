import React from 'react'
import { Modal, Row, Button, Form, Col, FloatingLabel  } from 'react-bootstrap';
// import { File } from 'react-bootstrap-icons';


import { useState } from 'react';

export default function ProfileEditModal() {
  const EditProfile = require('../../assets/EditProfile.png');
  const profile = require('../../assets/DefaultProfilePicture.png');

    const [lgShow, setLgShow] = useState(false);
    const [picture, setPicture] = useState(profile);
    const handleClose = () => setLgShow(false);

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let reader = new FileReader();
  
      const file = e.target.files?.[0]; // using optional chaining
  
      if (file) {
          reader.onload = (event) => {
              setPicture(event.target?.result);
          }
          reader.readAsDataURL(file);
      }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

  return (
    <div>

  <Button  onClick={() => setLgShow(true)}>Edit <img className="eventButton" src={EditProfile} alt="Edit Profile Icon"/></Button>
  <Modal
    size="lg"
    show={lgShow}
    onHide={() => setLgShow(false)}
    aria-labelledby="example-modal-sizes-title-lg"
  >

    <Modal.Header closeButton>
      <Modal.Title id="example-modal-sizes-title-lg">
        Edit Profile
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Row>
            <Col lg={12} sm={12} className='d-flex justify-content-center'>
            <img className='editProfileImg img-fluid' src={picture} alt="Profile Picture"/>
            </Col>
            <Col className='d-flex justify-content-center'>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="pictureUpload">
                <Form.Label className='uploadText'>Upload a picture:</Form.Label>
                <Form.Control className='hideUpload' type="file" accept='image/png, image/jpeg, image/jpg, image/jpe' placeholder="Enter Image" onChange={handlePictureChange} />
            </Form.Group>
        </Form>
            </Col>
        </Row>
        <Row>
            <Col md xs={6}> <FloatingLabel
        controlId="floatingTextarea"
        label="Enter Frist Name"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="First Name" />
      </FloatingLabel></Col>
      <Col md xs={6}> <FloatingLabel
        controlId="floatingTextarea"
        label="Enter Last Name"
        className="mb-3"
      >
        <Form.Control as="textarea" placeholder="Last Name" />
      </FloatingLabel></Col>
        </Row>
        <Row>
            <Col md xs={12}  className="mobileMargin"> <FloatingLabel
          controlId="floatingSelectGrid"
          label="Academy Name"
        >
          <Form.Select aria-label="Floating label select example">
            <option>Select Your Academy</option>
            <option value="Andre de Freitas Brazilian Jiu-Jitsu">Andre de Freitas Brazilian Jiu-Jitsu</option>
            <option value="Ares BJJ Stockton - Buffalo Black Brotherhood">Ares BJJ Stockton - Buffalo Black Brotherhood</option>
            <option value="VALOR Training Center">VALOR Training Center</option>
            <option value="Inside BJJ Academy">Inside BJJ Academy</option>
            <option value="Stockton JiuJitsu Academy">Stockton JiuJitsu Academy</option>
            <option value="Stockton Dominate MMA">Stockton Dominate MMA</option>
            <option value="Nick Diaz Academy">Nick Diaz Academy</option>
            <option value="10th Planet Stockton">10th Planet Stockton</option>
            <option value="TEAM CAMA">TEAM CAMA</option>
            <option value="Ronin Jiu Jitsu">Ronin Jiu Jitsu</option>
            <option value="Ernie Reyes West Coast Martial Arts">Ernie Reyes West Coast Martial Arts</option>
            <option value="Strive Jiu Jitsu & Fitness Academy">Strive Jiu Jitsu & Fitness Academy</option>
            <option value="JG ACADEMY - MANTECA">JG ACADEMY - MANTECA</option>
            <option value="JG ACADEMY - LODI">JG ACADEMY - LODI</option>
            <option value="Cortez Full Circle Martial Arts">Cortez Full Circle Martial Arts</option>
          </Form.Select>
        </FloatingLabel></Col>
        <Col md xs={12} className="mobileMargin"> <FloatingLabel
          controlId="floatingSelectGrid"
          label="Belt Rank"
        >
          <Form.Select aria-label="Floating label select example">
            <option>Select Your Belt Rank</option>
            <option value="1">White Belt</option>
            <option value="2">Blue Belt</option>
            <option value="3">Purple Belt</option>
            <option value="4">Brown Belt</option>
            <option value="5">Black Belt</option>

          </Form.Select>
        </FloatingLabel></Col>
        </Row>
        <br/>
        <Row><Col><textarea  style={{ width: '100%', height: '200px' }}></textarea></Col></Row>
        <Button variant="info" onClick={handleClose}>Submit</Button>
        </Modal.Body>
  </Modal>
  </div>
  )
}
