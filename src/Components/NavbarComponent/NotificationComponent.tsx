import React, { useEffect, useState, useContext } from 'react';
import { Row, Col, Button, ToastContainer, Toast } from 'react-bootstrap';
import { getFriendsList, getUserInfoByID, AddFriendResponse, denyFriendResponse, searchUser } from '../../DataServices/DataServices';
import UserContext from '../../UserContext/UserContext';
import { useNavigate } from 'react-router';

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

interface FriendInfo {
  id: number;
  userId: number;
  friendUserId: number;
  isAccepted: boolean;
  isDenied: boolean;
}

export default function NotificationComponent() {
  const [allUserInfo, setAllUserInfo] = useState<UserInfo[]>([]);
  const [friendInfo, setFriendInfo] = useState<FriendInfo[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [friendlistID, setfriendlistID] = useState(0);
  let navigate = useNavigate();

  const data = useContext<any>(UserContext);

  useEffect(() => {
    const getAllUserData = async () => {
      const allUserData = await getFriendsList();
      setFriendInfo(allUserData);
    };
    getAllUserData();
  }, []);

  useEffect(() => {
    async function fetchUserInfo(userId: number) {
      const userInfo = await getUserInfoByID(userId);
      setAllUserInfo(prevUserInfo => {
        const newUserInfo = [...prevUserInfo, userInfo];
        data.setCount(newUserInfo.length);
        return newUserInfo;
      });
    }

    async function fetchfriendlistId(id: number) {
      setfriendlistID(id);
    }
    friendInfo.filter((item) => item.friendUserId === data.userId).forEach((item: FriendInfo) => {
      fetchfriendlistId(item.id);
    });
    friendInfo.filter((item) => item.friendUserId === data.userId && !item.isAccepted && item.isDenied === false).forEach((item: FriendInfo) => {
      fetchUserInfo(item.userId);
    });

  }, [data.userId, friendInfo]);

  const handleDenie = async (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
    const updatedUserInfo = allUserInfo.filter((userInfo) => userInfo.id !== value);
    denyFriendResponse(friendlistID, value, data.userId); // Assuming this function rejects the friend request
    setAllUserInfo(updatedUserInfo);
    setShowToast(true);
    setToastMessage('Friend request declined!');
    data.setCount(data.count - 1);
  };

  const handleAccept = async (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
    AddFriendResponse(friendlistID, value, data.userId);
    const updatedUserInfo = allUserInfo.filter((userInfo) => userInfo.id !== value);
    setAllUserInfo(updatedUserInfo);
    data.setFriendsReload(true);
    setShowToast(true);
    setToastMessage('Friend request accepted!');
    data.setCount(data.count - 1);
  };

  const profileClick = async (publisherName: string) => {
    const searchName = await searchUser(publisherName);
    data.setName(searchName);
    navigate('/friends');
  };


  return (
    <>

      {allUserInfo.map((userInfo: UserInfo, key: number) => (
        <Row key={key} className="NotificationDiv2">
          <Col lg={4} xs={4}>
            <img
              className="NotificationImg"
              onClick={() => profileClick(userInfo.username)}
              src={userInfo.image}
            />
          </Col>
          <Col lg={8} xs={8}>
            <p>{userInfo.firstName} has sent a Friends request</p>
            <Button onClick={(e) => handleAccept(e, userInfo.id)} style={{ marginRight: 20 }}>
              Accept
            </Button>
            <Button onClick={(e) => handleDenie(e, userInfo.id)} variant="danger">
              Decline
            </Button>
          </Col>
        </Row>
      ))}
      <ToastContainer style={{ width: '90%' }}>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body style={{ justifyContent: 'center' }}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}






