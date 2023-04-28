import React, { useEffect, useState, useContext } from 'react'
import { Row, Col, Button } from "react-bootstrap";
import { getFriendsList, getUserInfoByID, AddFriendResponse } from '../../DataServices/DataServices';
import UserContext from '../../UserContext/UserContext';
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
  const [friendlistID, setfriendlistID ] = useState(0);

  const data = useContext<any>(UserContext);

  useEffect(() => {
    const getAllUserData = async () => {
      const allUserData = await getFriendsList();
      console.log(allUserData);
      setFriendInfo(allUserData)
    }
    getAllUserData()
  }, [])


  useEffect(() => {
    async function fetchUserInfo(userId: number) {
      console.log(userId);
      const userInfo = await getUserInfoByID(userId);
      setAllUserInfo(prevUserInfo => [...prevUserInfo, userInfo]);
    }
    async function fetchfriendlistId( id: number) {

      setfriendlistID(id);
    }


 friendInfo.filter((item) => item.friendUserId === data.userId).forEach((item: FriendInfo) => {
  fetchfriendlistId(item.id);
    });
    friendInfo.filter((item) => item.friendUserId === data.userId && !item.isAccepted).forEach((item: FriendInfo) => {
      fetchUserInfo(item.userId);
    });
  }, [data.userId, friendInfo]);


  const handleAccept = async (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
    AddFriendResponse(friendlistID, value, data.userId);
  }

  const handleDenie = async (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
 AddFriendResponse(friendlistID, value, data.userId);
  }

  return (

    <>
      {allUserInfo.map((userInfo: UserInfo, key: number) => 
        (
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
      )
      )}
    </>
  )
}
