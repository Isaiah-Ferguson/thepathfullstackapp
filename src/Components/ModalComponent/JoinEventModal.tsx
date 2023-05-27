import React, { useState, useContext, useEffect } from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';
import { joinEventItem, GetAllJoinedEvents } from '../../DataServices/DataServices';
import UserContext from '../../UserContext/UserContext';

type eventID = {
  id: number;
  publishedName: string;
  academyName: string;
  address: string;
  description: string;
}

interface EventJoin {
  eventId: number;
  id: number;
  isJoined: boolean;
  userId: number;
}

export default function JoinEventModal(props: eventID) {
  const [show, setShow] = useState(false);
  const data = useContext<any>(UserContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [joined, setJoined] = useState(false)
  const [showToast, setShowToast] = useState(false);
  const check = require('../../assets/check.png')
  const plus = require('../../assets/plus.png')

  useEffect(()=> {
    async function joined() {
    const storedValue = sessionStorage.getItem('loggedIn');
    const loggedIn = storedValue ? JSON.parse(storedValue) : data;
    let joinedEventvar = await GetAllJoinedEvents();
    const eventJoined = joinedEventvar.some((item: EventJoin) => item.eventId === props.id && item.userId === loggedIn.userId)
    if(props.publishedName === loggedIn.publisherName || eventJoined){
      setJoined(true)
    }
    }
   joined() 
  }, [data.eventReload])

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
      <button className='circle-button' onClick={handleShow}>{joined ? <img src={check}/> : <img src={plus}/>}</button >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.publishedName}'s event at {props.academyName}</Modal.Title>
        </Modal.Header>
        <Modal.Body className='wordbreak'><p>Would you like to join this Open Mat?</p>
          <br/>
          <p className='word-break'>{props.description}</p>
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

