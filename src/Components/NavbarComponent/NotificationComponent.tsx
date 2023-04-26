import React, { useEffect, useState, useContext } from 'react'
import { Row, Col, Button } from "react-bootstrap";
import { getFriendsList, getUserInfoByID } from '../../DataServices/DataServices';
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
  friendUserId: number
}

export default function NotificationComponent() {

  const [allUserInfo, setAllUserInfo] = useState<UserInfo[]>([]);
  const [friendInfo, setFriendInfo] = useState<FriendInfo[]>([]);

  const data = useContext<any>(UserContext);

  useEffect(() => {
    const getAllUserData = async () => {
      const allUserData = await getFriendsList();
      setFriendInfo(allUserData)
    }
    getAllUserData()
  }, [])

  useEffect(() => {
    async function fetchUserInfo(id: number) {
      const userInfo = await getUserInfoByID(id);
      setAllUserInfo(prevUserInfo => [...prevUserInfo, userInfo]);
    }
    friendInfo.filter((item) => item.friendUserId === data.userId).forEach((item: FriendInfo) => {
      fetchUserInfo(item.userId);
    });
    
  }, [data.userId, friendInfo]);

  return (

    <>
      {allUserInfo.map((userInfo: UserInfo, key: number) => (
        <Row key={key} className="NotificationDiv2">
          <Col lg={4} xs={4}>
            <img className="NotificationImg" src={userInfo.image} />
          </Col>
          <Col lg={8} xs={8}>
            <p>{userInfo.publishedName} has sent a Friends request</p>
            <Button style={{ marginRight: 20 }}>Accept</Button><Button variant="danger">Decline</Button>
          </Col>
        </Row>
      ))}
    </>
  )
}
