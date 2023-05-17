import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { GetAllJoinedEvents, getUserInfoByID } from '../../DataServices/DataServices';

interface UserInfo {
  aboutMe: string;
  id: number;
  image: string;
  academyName: string;
  firstName: string;
  lastName: string;
  publishedName: string;
  username: string;
  belt: string;
}

interface EventJoin {
  eventId: number;
  id: number;
  isJoined: boolean;
  userId: number;
}
type eventID = {
  id: number
}
export default function JoinedPersonList(props: eventID) {
  const [allUserInfo, setAllUserInfo] = useState<UserInfo[]>([]);
  const [show, setShow] = useState(false);
  const [allJoinedEvents, setAllJoinedEvents] = useState<EventJoin[]>([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getjoinedData = async () => {
      let joinedEventvar = await GetAllJoinedEvents();
      setAllJoinedEvents(joinedEventvar);
    }
    getjoinedData()
  }, []);

  useEffect(() => {
    async function fetchUserInfo(userId: number) {
      const userInfo = await getUserInfoByID(userId);
      setAllUserInfo(prevUserInfo => {
        // Check if the user info already exists in the array
        if (prevUserInfo.some(info => info.id === userInfo.id)) {
          return prevUserInfo;
        }
        const newUserInfo = [...prevUserInfo, userInfo];
        return newUserInfo;
      });
    }

    allJoinedEvents
      .filter(item => item.eventId === props.id)
      .forEach(item => {
        fetchUserInfo(item.userId);
      });
  }, [allJoinedEvents, props.id]);

  return (
    <>
      <div onClick={handleShow} className='postEditDev d-flex align-items-end'>See joined...</div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>People Attending</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {allUserInfo.map(userInfo => (
            <ul key={userInfo.firstName}><li>{userInfo.firstName}</li></ul>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

