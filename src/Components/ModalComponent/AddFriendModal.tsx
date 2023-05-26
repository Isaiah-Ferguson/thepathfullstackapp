import UserContext from '../../UserContext/UserContext';
import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddFriend, getFriendsList } from '../../DataServices/DataServices';
import { Toast } from 'react-bootstrap';

type username = {
  username: string;
  myID: number;
  theirID: number
}

export default function AddFriendModal(props: username) {
  const [show, setShow] = useState(false);
  const add = require('../../assets/Add.png')
  const data = useContext<any>(UserContext);
  const [toastMessage, setToastMessage] = useState(false)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleFriendRequest = async () => {
  
    const friendRequests = await getFriendsList();
    const isRequestSent = friendRequests.some(
      (request: any) =>
        request.userId === data.userId && request.friendUserId === data.name.userId
    );
    if (isRequestSent) {
      setToastMessage(true)
      return;
    }

    const friends = await getFriendsList();
    const areFriends = friends.some(
      (friend: any) =>
        (friend.userId === data.userId && friend.friendUserId === data.name.userId && friend.isAccepted === true) ||
        (friend.userId === data.name.userId && friend.friendUserId === data.userId && friend.isAccepted === true)
    );
    const areNotFriends = friends.some(
      (friend: any) =>
        (friend.userId === data.userId && friend.friendUserId === data.name.userId && friend.isDenied === true) ||
        (friend.userId === data.name.userId && friend.friendUserId === data.userId && friend.isDenied === true)
    );

    // const alreadyFriends = friends.filter((friend : any ) => 
    
    
    
    // );


    if (areFriends) {
      setToastMessage(true)
      return;
    } else if (areFriends && areNotFriends){
      // AddFriendResponse(data.name.userId, value, data.userId);
    }
  
    AddFriend(data.userId, data.name.userId);
    handleClose();
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <img className='addFriend' src={add}/>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Would you like to add {props.username}</Modal.Title>
        </Modal.Header>
        {toastMessage && <Modal.Body>
    You are already Friends
      </Modal.Body>}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFriendRequest}>
            Confirm Friend Request
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
