import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DateDropdown from '../DropdownComponent/DropdownComponent';
import TimeDropdown from '../DropdownComponent/TimeDropdownComponent';
import PrivacyComponent from '../DropdownComponent/PrivacyComponent';

import { Dropdown, Row, Col } from 'react-bootstrap';


export default function ModalComponent() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Event = require("../../assets/EventIcon.png");

  return (
    <>

      <Button variant="warning" onClick={handleShow}><img className="eventButton" src={Event}/></Button>

      <Modal  show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className='moduleBG'>
          <Modal.Title >Create Open Mat</Modal.Title>
        </Modal.Header >
        <Modal.Body className='moduleBG'>
            <Row>
                <h3>Location: Team Cama</h3>
            </Row>
            <Row>
                <Col lg={6}><DateDropdown/></Col>
                <Col lg={6}><TimeDropdown/></Col>
            </Row>
            <Row>
                <PrivacyComponent/>
            </Row>
            <textarea style={{marginTop: '15px'}} className='textArea' placeholder='Enter Event Description' ></textarea>
            
            </Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly moduleBG'>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Create Open Mat
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}