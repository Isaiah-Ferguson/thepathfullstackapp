import React, { useState, useContext } from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';
import { joinEventItem } from '../../DataServices/DataServices';
import UserContext from '../../UserContext/UserContext';

type eventID = {
  id: number;
  publishedName: string;
  academyName: string;
  address: string;
  description: string;
}


export default function JoinEventModal(props: eventID) {
  const [show, setShow] = useState(false);
  const data = useContext<any>(UserContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showToast, setShowToast] = useState(false);

  const handleJoin = async () => {
    const storedValue = sessionStorage.getItem('loggedIn');
    const loggedIn = storedValue ? JSON.parse(storedValue) : data;
    if (props.publishedName === loggedIn.publisherName){
      handleClose();
    }else{
      // const eventUserInfo = await searchUser(props.publishedName)
      // await joinEventNotification(props.id, loggedIn.userId, eventUserInfo.userId)
      await joinEventItem(props.id, loggedIn.userId);
      setShowToast(true);
      data.setEventReload(true);
      handleClose();
    }

  }

 

  return (
    <>
      <Button  onClick={handleShow}><span style={{ backgroundColor: 'transparent'}} > Join event </span></Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.publishedName}'s event at {props.academyName}</Modal.Title>
        </Modal.Header>
        <Modal.Body><p>Would you like to join this Open Mat?</p>
          <br/>
          <p>{props.description}</p>
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <p>{props.address}</p>
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

