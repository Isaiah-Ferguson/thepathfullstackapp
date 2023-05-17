import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { joinEventItem } from '../../DataServices/DataServices';
import UserContext from '../../UserContext/UserContext';

type eventID = {
  id: number
}

export default function JoinEventModal(props: eventID) {
  const [show, setShow] = useState(false);
  const data = useContext(UserContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleJoin = async () => {
    const storedValue = sessionStorage.getItem('loggedIn');
    const loggedIn = storedValue ? JSON.parse(storedValue) : data;
    await joinEventItem(props.id, loggedIn.userId);
    handleClose();
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>+</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Would you like to join this event?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleJoin}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

