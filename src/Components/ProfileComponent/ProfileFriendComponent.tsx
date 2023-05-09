import React, { useEffect, useState, useContext } from 'react'
import { Col, Container } from 'react-bootstrap'
import { getUserInfoByID, getMyFriendsList, getFriendsList } from '../../DataServices/DataServices';
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

interface FriendList{
  friendUserId: number,
  id: number,
  isAccepted: boolean,
  isDenied: false,
  userId: number
}

export default function ProfileFriendComponent() {
  const [allUserInfo, setAllUserInfo] = useState<UserInfo[]>([]);
  const [friendInfo, setFriendInfo] = useState([]);
  const data = useContext<any>(UserContext);


  useEffect(() => {
    async function fetchUserInfo(id: number) {
      const userInfo = await getUserInfoByID(id);
      setAllUserInfo(prevUserInfo => [...prevUserInfo, userInfo]);
    }
    friendInfo.forEach((item: number) => {
      fetchUserInfo(item);
    });
  }, [data.name, friendInfo]);

  useEffect(() => {
    const getAllUserData = async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : data;
      const allUserData = await getMyFriendsList(loggedIn.userId);
      setFriendInfo(allUserData);
      console.log(allUserData)
    }
    getAllUserData();
  }, [data.name])
  


  return (
    <>
      {allUserInfo.map((userInfo: UserInfo, key: number) => (
        <Col key={key}>
          <Container className="friendDiv">
            <img className="friendProfile" src={userInfo.image} />
            <p className="friendName">{userInfo.username}</p>
          </Container>
        </Col>
      ))}
    </>
  )
}
