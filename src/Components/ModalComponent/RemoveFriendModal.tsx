import UserContext from '../../UserContext/UserContext';
import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RemoveFriend, denyFriendResponse, getFriendsList } from '../../DataServices/DataServices';

type username = {
  username: string;
  myID: number;
  theirID: number
}

interface friendlist {
    friendUserId: number;
    id: number;
    isAccepted: boolean;
    isDenied: false;
    userId: number;
}

export default function RemoveFriendModal(props: username) {
  const [show, setShow] = useState(false);
  const remove = require('../../assets/removefriend.png')
  const data = useContext<any>(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleFriendRequest = async () => {
    const friendslist = await getFriendsList()
    const filteredlist = friendslist.filter((item : friendlist) => item.userId === data.userId && item.friendUserId === data.name.userId)
    if(filteredlist.length > 1){
        const friendId = filteredlist[0].id
        RemoveFriend(data.userId, data.name.userId);
        denyFriendResponse(friendId, data.userId, data.name.userId)
    }else{
        const filteredlist = friendslist.filter((item : friendlist) => item.userId === data.name.userId && item.friendUserId === data.userId)
        const friendId = filteredlist[0].id
        RemoveFriend(data.name.userId, data.userId);
        denyFriendResponse(friendId, data.name.userId, data.userId)
    }
    handleClose();
  };


  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <img className='addFriend' src={remove}/>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Would you like to Remove {props.username} from your friends list?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFriendRequest}>
            Remove Friend
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
