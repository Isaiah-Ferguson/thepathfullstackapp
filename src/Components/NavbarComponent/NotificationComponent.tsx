import React, { useEffect, useState, useContext } from 'react'
import { Row, Col, Button } from "react-bootstrap";
import { AddFriend, getFriendsList, getUserInfoByID, AddFriendResponse } from '../../DataServices/DataServices';
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

  const data = useContext<any>(UserContext);

  useEffect(() => {
    const getAllUserData = async () => {
      const allUserData = await getFriendsList();
      setFriendInfo(allUserData)
    }
    getAllUserData()
  }, [])



  // useEffect(() => {
  //   async function fetchUserInfo(id: number) {
  //     const userInfo = await getUserInfoByID(id);
  //     setAllUserInfo(prevUserInfo => [...prevUserInfo, userInfo]);
  //   }
  //   const friendInfoFiltered = friendInfo.filter((item) => item.userId === data.userId && item.isAccepted === true);
  //   const friendIds = friendInfoFiltered.map((item) => ({ id: item.id, userId: item.friendUserId }));
  //   friendIds.forEach((friend: { id: number, userId: number }) => {
  //     fetchUserInfo(friend.userId);
  //   });
  // }, [data.userId, friendInfo]);

  useEffect(() => {
    async function fetchUserInfo(id: number) {
      const userInfo = await getUserInfoByID(id);
      setAllUserInfo(prevUserInfo => [...prevUserInfo, userInfo]);
    }
    friendInfo.filter((item) => item.friendUserId === data.userId).forEach((item: FriendInfo) => {
      fetchUserInfo(item.userId);
    });
  }, [data.userId, friendInfo]);


  // const handleAccept = async (e: React.MouseEvent<HTMLButtonElement>, friendId: any, userId: number, id: number) => {
  //   const isAccepted = true;
  //   const isDeleted = false;
  //   AddFriend(userId, friendId);
  //   AddFriendResponse(id, userId, friendId, isAccepted, isDeleted);
  // }

  const handleDenie = async (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
    const isAccepted = false;
    const isDeleted = true;

  // AddFriendResponse(value, data.userId, isAccepted, isDeleted);
  }

  
  const handleAccept = async (e: React.MouseEvent<HTMLButtonElement>, value: number) => {
    AddFriend(value, data.userId);
  }

  return (

    <>
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
    </>
  )
}
