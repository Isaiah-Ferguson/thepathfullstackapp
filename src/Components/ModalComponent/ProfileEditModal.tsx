import React from 'react'
import { Modal, Row, Button, Form, Col, FloatingLabel, Toast } from 'react-bootstrap';
import { updateUserInfo, getUserInfoByID, loggedInData } from '../../DataServices/DataServices';
import { useState, useContext, useEffect } from 'react';
import UserContext from '../../UserContext/UserContext';

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

export default function ProfileEditModal(props: any) {
  const EditProfile = require('../../assets/draw.png');
  const profile = require('../../assets/DefaultProfilePicture.png');
  const [academy, setAcademy] = useState<string>("");
  const [belt, setBelt] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const data = useContext<any>(UserContext);
  const [toast, setToast] = useState(false);


  const [lgShow, setLgShow] = useState(props.newuser);
  const [picture, setPicture] = useState(profile);

  const handleClose = () => {
    setLgShow(false);
    data.setNewUser(false);
  }

  //----------------HANDLE FUNCTIONS-------------------------//

  const handleFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  }

  const handleAcademy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAcademy(e.target.value);
  };

  const handleBelt = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBelt(e.target.value);
  };

  function handleDecription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setDescription(e.target.value)
  }

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
  //---------------------------------------------------------------//

  const toggleShowA = () => {
    setToast(false);
  };

  const handleEditProfile = async () => {
    const loggedIn = loggedInData();
    const testID = loggedIn.userId;
    const testName = loggedIn.publisherName;

    if (firstName === null || lastName === null || description === null || academy === null || belt === null || picture === null) {
      setToast(true);
      return;
    }
    const item = {
      username: testName,
      FirstName: firstName,
      LastName: lastName,
      AboutMe: description,
      image: picture,
      AcademyName: academy,
      belt: belt
    };
    if(item.image === ""){
      item.image = profile;
    }

    await updateUserInfo(item, testID);
    data.setShouldReload(true);
    handleClose();
  }


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  useEffect(() => {

      const getLoggedInData = async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : loggedInData();
      let userInfoItems = await getUserInfoByID(loggedIn.userId);
      setFirstName(userInfoItems.firstName);
      setLastName(userInfoItems.lastName);
      setBelt(userInfoItems.belt);
      setDescription(userInfoItems.aboutMe);
      setAcademy(userInfoItems.academyName);
      if(userInfoItems.image === null){
        setPicture(picture);
      }else{
        setPicture(userInfoItems.image);
      }
    };
    getLoggedInData();

  },[]);

  return (

    <div>
      <Button variant="light" className='editProfileText centered-button' onClick={() => setLgShow(true)}>Edit Profile <img className="editProfileButton" src={EditProfile} alt="Edit Profile Icon" /></Button>
      <Modal
        size="lg"
        show={lgShow}
        backdrop="static"
        keyboard={false}
        onHide={() => {
          setLgShow(false);
          handleClose();
        }}
        aria-labelledby="example-modal-sizes-title-lg"
      >

        <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-lg">
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col lg={12} sm={12} className='d-flex justify-content-center'>
              <img className='editProfileImg img-fluid' src={picture} alt="Profile Picture" />
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
            {/* -----------------FIRST NAME LABEL--------------------------- */}
            <Col md xs={6}> <FloatingLabel controlId="floatingTextarea" label="Enter First Name" className="mb-3" onChange={handleFirstname}>
              <Form.Control as="textarea" placeholder="First Name" minLength={0} maxLength={15} value={firstName} />
            </FloatingLabel></Col>
            {/* ----------------------------------------------------------------------- */}

            {/* -----------------LAST NAME LABEL--------------------------- */}

            <Col md xs={6}> <FloatingLabel controlId="floatingTextarea" label="Enter Last Name" className="mb-3" onChange={handleLastname} >
              <Form.Control as="textarea" placeholder="Last Name" minLength={0} maxLength={15} value={lastName}  />
            </FloatingLabel></Col>
            {/* ----------------------------------------------------------------------- */}

          </Row>
          <Row>
            <Col md xs={12} className="mobileMargin">
              <FloatingLabel controlId="floatingSelectGrid" label="Academy Name">

                <Form.Select aria-label="Floating label select example" onChange={handleAcademy} value={academy}>
                  <option value="">Select Your Academy</option>
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
            <Col md xs={12} className="mobileMargin"> <FloatingLabel controlId="floatingSelectGrid" label="Belt Rank">

              <Form.Select aria-label="Floating label select example" value={belt} onChange={handleBelt}>
                <option value="White Belt">Select Your Belt Rank</option>
                <option value="White Belt">White Belt</option>
                <option value="Blue Belt">Blue Belt</option>
                <option value="Purple Belt">Purple Belt</option>
                <option value="Brown Belt">Brown Belt</option>
                <option value="Black Belt">Black Belt</option>
              </Form.Select>

            </FloatingLabel></Col>
          </Row>
          <br />
          <Row><Col><textarea minLength={0} maxLength={500} placeholder='Enter a Description' style={{ width: '100%', height: '200px' }} onChange={handleDecription} value={description}/></Col></Row>
          <Button variant="info" onClick={handleEditProfile}>Submit</Button>
        </Modal.Body>
        {toast && (
          <Toast onClick={toggleShowA}>
            <Toast.Body style={{ color: 'black' }}>Please fill out all information</Toast.Body>
          </Toast>
        )}
      </Modal>
    </div>
  )
}
