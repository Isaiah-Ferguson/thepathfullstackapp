import React, { useEffect, useState, useContext } from 'react'
import { Col, Container } from 'react-bootstrap'
import { getUserInfoByID, getMyFriendsList, getFriendsList, searchUser } from '../../DataServices/DataServices';
import UserContext from '../../UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

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


export default function ProfileFriendComponent() {
  const [allUserInfo, setAllUserInfo] = useState<UserInfo[]>([]);
  const data = useContext<any>(UserContext);
  let navigate = useNavigate();


  useEffect(() => {
    const getAllUserData = async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : data;
      const allUserData = await getMyFriendsList(loggedIn.userId);
      const userInfoPromises = allUserData.map(async (item: number) => {
        const userInfo = await getUserInfoByID(item);
        return userInfo;
      });
      const allUserInfos = await Promise.all(userInfoPromises);
      setAllUserInfo(allUserInfos);
    };
    getAllUserData();
  }, [data.friendsReload]);
  

  const profileClick = async (publisherName: string) => {
    const searchName = await searchUser(publisherName);
    data.setName(searchName);
    navigate("/friends");
  }

  return (
    <>
      {allUserInfo.map((userInfo: UserInfo, key: number) => (
        <Col key={key}>
          <Container className="friendDiv">
            <img title={userInfo.firstName} onClick={() => profileClick(userInfo.username)} className="friendProfile searchclick" src={userInfo.image} />
            <p className="friendName">{userInfo.username}</p>
          </Container>
        </Col>
      ))}
    </>
  )
}
