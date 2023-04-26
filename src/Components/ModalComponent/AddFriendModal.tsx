import UserContext from '../../UserContext/UserContext';
import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddFriend } from '../../DataServices/DataServices';

type username = {
  username: string;
  myID: number;
  theirID: number
}
type userIds = {
  myID: number;
  theirID: number
}

export default function AddFriendModal(props: username) {
  const [show, setShow] = useState(false);
  const add = require('../../assets/Add.png')
  const data = useContext<any>(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleFriendRequest  = () =>{
console.log(data.userId, data.name.userId)
   const testing = async () => {
    
      AddFriend(data.userId, data.name.userId)
      handleClose()
    }
    testing();
  } 

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <img className='addFriend' src={add}/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Would you like to add {props.username}</Modal.Title>
        </Modal.Header>
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
