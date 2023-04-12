import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DateDropdown from '../DropdownComponent/DropdownComponent';
import TimeDropdown from '../DropdownComponent/TimeDropdownComponent';
import PrivacyComponent from '../DropdownComponent/PrivacyComponent';
import { eventBlogItem, getEventItemsByUserId  } from '../../DataServices/DataServices';
import  { useContext } from 'react';
import UserContext from '../../UserContext/UserContext';

import { Dropdown, Row, Col, FloatingLabel, Form } from 'react-bootstrap';


export default function ModalComponent() {
  const timeData = useContext(UserContext);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>('');

  const [blogTitle, setBlogTitle] = useState('');
  const [blogImage, setBlogImage] = useState('');
  const [blogDiscription, setBlogDescription] = useState('');
  const [blogItems, setBlogItems] = useState([]);
  const [blogId, setBlogId] = useState(0);
  const [blogUserId, setBlogUserId] = useState(0);
  const [blogPublisherName, setBlogPublisherName] = useState('');
  const [eventAddress, setEventAddress] = useState(0);
  const [academy, setAcademy] = useState("");


  const [show, setShow] = useState(false);
  const [editBool, setEdit] = useState(false);
  const [blogIsDeleted, setBlogIsDeleted] = useState(false);
  const [blogIsPublish, setBlogIsPublished] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Event = require("../../assets/EventIcon.png");

  const eventData = {
    Id: blogId,
    UserId: blogUserId,
    Date: new Date,
    PublisherName: blogPublisherName,
    AcademyName: academy,
    Time: selectedHour,
    EventDate: selectedDate,
    Address: eventAddress,
    Description: blogDiscription,
    isPublish: true,
    isDeleted: false,
    image: null
  }
 const handleOpenMat = () => {
  createOpenEvent(eventData);
  handleClose();
 }

    const createOpenEvent = async (event: object) => {
      let result = await eventBlogItem(event);
  
      if(result){
        let userBlogItems = await getEventItemsByUserId(blogUserId);
        console.log(userBlogItems);
        setBlogItems(userBlogItems);
      }else{
        alert(`Blog item was not not updated`)
      }
      
    
    }

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => { setBlogTitle(e.target.value); };

    const handleAcademy = (e: React.ChangeEvent<HTMLSelectElement>) => { setAcademy(e.target.value); };

    const handleDate = (e: React.ChangeEvent<HTMLSelectElement>) => { setAcademy(e.target.value); };

    const handleDecription = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setAcademy(e.target.value); };

    const handleTime = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setAcademy(e.target.value); };
    
    const handleSelectedHourChange = (hour: string) => {
      console.log(hour);
      setSelectedHour(hour);
    };
  return (

    <>
      <Button variant="warning" onClick={handleShow}><img className="eventButton" src={Event}/></Button>

      <Modal  show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className='moduleBG'>
          <Modal.Title >Create Open Mat</Modal.Title>
        </Modal.Header >
        <Modal.Body className='moduleBG'>
            <Row>
            <Col md xs={12}  className="mobileMargin">
              <FloatingLabel controlId="floatingSelectGrid" label="Select Location">
          <Form.Select aria-label="Floating label select example" value={academy} onChange={handleAcademy}>
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
            </Row>
            <Row>
                <Col lg={6}><DateDropdown setSelectedDate={setSelectedDate} /></Col>
                <Col lg={6}><TimeDropdown setSelectedHour={handleSelectedHourChange} /></Col>
            </Row>
            <Row>
                <PrivacyComponent/>
            </Row>
            <textarea style={{marginTop: '15px'}} className='textArea' placeholder='Enter Event Description' onChange={handleDecription}></textarea>
            
            </Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly moduleBG'>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOpenMat}>
            Create Open Mat
          </Button>
        
        </Modal.Footer>
      </Modal>
    </>
  );
}