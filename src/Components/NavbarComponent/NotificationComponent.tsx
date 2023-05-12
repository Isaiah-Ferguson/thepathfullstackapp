import React, { useEffect, useState, useContext } from 'react'
import { Row, Col,ToastContainer} from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import './NavBarComponent.css';
import { getFriendsList, getUserInfoByID, AddFriendResponse } from '../../DataServices/DataServices';
import UserContext from '../../UserContext/UserContext';
import { Badge } from 'react-bootstrap';
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
  id: number,
  userId: number,
  friendUserId: number,
  isAccepted: boolean
}


export default function NotificationComponent() {
  const [allUserInfo, setAllUserInfo] = useState<UserInfo[]>([]);
  const [friendInfo, setFriendInfo] = useState<FriendInfo[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [friendlistID, setfriendlistID ] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  const data = useContext<any>(UserContext);

  useEffect(() => {
    const getAllUserData = async () => {
      const allUserData = await getFriendsList();
      setFriendInfo(allUserData)
    }
    getAllUserData();
  }, [])


  useEffect(() => {
    async function fetchUserInfo(userId: number) {
      const userInfo = await getUserInfoByID(userId);
      setAllUserInfo(prevUserInfo => [...prevUserInfo, userInfo]);
      // setNotificationCount(prevCount => prevCount + 1);
    }
    async function fetchfriendlistId( id: number) {
      setfriendlistID(id);
    }

    const pendingFriendRequests = friendInfo.filter((item) => item.friendUserId === data.userId && !item.isAccepted);
    setNotificationCount(pendingFriendRequests.length);

    pendingFriendRequests.forEach((item: FriendInfo) => {
      fetchfriendlistId(item.id);
      fetchUserInfo(item.userId);
    });

  }, [data.userId, friendInfo]);

  const handleDenie = async (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
    const updatedUserInfo = allUserInfo.filter((userInfo) => userInfo.id !== value);
    setAllUserInfo(updatedUserInfo);
    setShowToast(true);
    setToastMessage('Friend request declined!');
    setNotificationCount(prevCount => prevCount - 1);
  }
  
  const handleAccept = async (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
    AddFriendResponse(friendlistID, value, data.userId);
    const updatedUserInfo = allUserInfo.filter((userInfo) => userInfo.id !== value);
    setAllUserInfo(updatedUserInfo);

    setShowToast(true);
    setToastMessage('Friend request accepted!');
    data.setFriendsReload(true);
    setNotificationCount(prevCount => prevCount - 1);
  }

  
  return (
    <>
      {/* <span className="translate-middle badge rounded-pill bg-danger NotificationBadge iconPosition">  */}
              {/* {data.notificationCount} */}
          {/* {data.NotificationCount}
         </span>  */}

        <Badge> {notificationCount}</Badge>
      {allUserInfo.map((userInfo: UserInfo, key: number) => (
        <Row key={key} className="NotificationDiv2">
          <Col lg={4} xs={4}>
            <img className="NotificationImg" src={userInfo.image} />
          </Col>
          <Col lg={8} xs={8}>
            <p>{userInfo.firstName} has sent a Friends request</p>
            <Button onClick={(e) => handleAccept(e, userInfo.id)} style={{ marginRight: 20 }}>Accept</Button>
            <Button onClick={(e) => handleDenie(e, userInfo.id)} variant="danger">Decline</Button>
          </Col>
        </Row>
      ))}
      <ToastContainer>
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
          <Toast.Body style={{ justifyContent: 'center'}}>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );

}
