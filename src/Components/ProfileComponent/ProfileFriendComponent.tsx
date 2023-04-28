import React, { useEffect, useState, useContext } from 'react'
import { Col, Container } from 'react-bootstrap'
import { getFriendsList, getUserInfoByID, getMyFriendsList } from '../../DataServices/DataServices';
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

// interface FriendInfo {
//   id: number,
//   userId: number,
//   friendUserId: number,
//   isAccepted: boolean
// }

export default function ProfileFriendComponent() {
  const [allUserInfo, setAllUserInfo] = useState<UserInfo[]>([]);
  const [friendInfo, setFriendInfo] = useState([]);

  const data = useContext<any>(UserContext);

  useEffect(() => {
    const getAllUserData = async () => {
      const allUserData = await getMyFriendsList(data.userId);
      console.log(allUserData);
      setFriendInfo(allUserData);
    }
    getAllUserData()
  }, [])

  useEffect(() => {
    async function fetchUserInfo(id: number) {
      const userInfo = await getUserInfoByID(id);
      setAllUserInfo(prevUserInfo => [...prevUserInfo, userInfo]);
    }
    friendInfo.forEach((item: number) => {
      console.log(item)
      fetchUserInfo(item);
    });
  }, [data.userId, friendInfo]);

  return (
    <>
      {allUserInfo.map((userInfo: UserInfo, key: number) => (
        <Col key={key}>
          <Container className="friendDiv">
            <img className="friendProfile" src={userInfo.image} />
            <p className="friendName">{userInfo.publishedName}</p>
          </Container>
        </Col>
      ))}
    </>
  )
}
