import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';
import { getEventItemsByUserId, joinEventItem } from '../../DataServices/DataServices';
import UserContext from '../../UserContext/UserContext';

type eventID = {
  id: number;
  publishedName: string;
  academyName: string
}


export default function JoinEventModal(props: eventID) {
  const [show, setShow] = useState(false);
  const data = useContext<any>(UserContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showToast, setShowToast] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [position] = useState('top-start');


  const handleJoin = async () => {
    const storedValue = sessionStorage.getItem('loggedIn');
    const loggedIn = storedValue ? JSON.parse(storedValue) : data;
    await joinEventItem(props.id, loggedIn.userId);
    setShowToast(true);
    data.setEventReload(true);
    handleClose();
  }


  return (
    <>
      <Button variant="primary" onClick={handleShow}>+</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.publishedName}'s event at {props.academyName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to join this Open Mat?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleJoin}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
      <Toast className="joinToast" show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
        <Toast.Body style={{ color: 'black' }}>You've joined an event!</Toast.Body>
      </Toast>
    </>
  );
}

