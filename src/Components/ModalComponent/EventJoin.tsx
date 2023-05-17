import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import { useState, useContext} from 'react';
import UserContext from "../../UserContext/UserContext";
import {
  checkToken,
  getMyFriendsList,
  getEventItemsByUserId,
  updateEventItem,
  
} from "../../DataServices/DataServices";

interface EventItem {
 
  eventId : number;
}



export default function EventJoin(props : EventItem) {

    // const [show, setShow] = useState(false);
    // const [showModal, setShowModal] = useState(false);
    const data = useContext<any>(UserContext);
    const [friendInfo, setFriendInfo] = useState<number[]>([]);
    const [prevJoinedUsers, setJoinedUsers] = useState("Join");
    const [myEventItems, setMyEventItems] = useState<EventItem[]>([]);
    const profile = require("../../assets/DefaultProfilePicture.png");
    const [blogUserId, setBlogUserId] = useState<number | null>(null);
    const [blogPublisherName, setBlogPublisherName] = useState("");
    const [joined, setJoined] = useState(false);
    const [blogId, setBlogId] = useState<number | null>(null);
    const [userId, setUserId] = useState(1);
    const [show, setShow] = useState(false);
    const [smShow, setSmShow] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



    const toggleModal = () => {
        setShowModal(!showModal);
      };

      const handleJoin = async (eventId: number, otherUserId: number) => {
        try {
          // Make a fetch request to join the event
          const response = await fetch(`https://thepathapi.azurewebsites.net/joinevent/joinevent/${eventId}/${otherUserId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: data.userId }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to join the event.');
          }
    
          // Add the joined user IDs to the array of joinedUsers
          const joinedUserIds: any = [data.userId, otherUserId];
    
          setJoinedUsers(prevJoinedUsers => prevJoinedUsers.concat(joinedUserIds));
    
          // Close the modal popup
          handleClose();
          // joinEvent(userId, eventId );
        } catch (error) {
          console.error('Error joining event:', error);
          // Handle the error case, display an error message, etc.
        }
      };

      function onPress() {
        console.log(props.eventId);


      }


  return (
    <>
    <Button variant="primary" onClick={handleShow}>
        +
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onPress}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
