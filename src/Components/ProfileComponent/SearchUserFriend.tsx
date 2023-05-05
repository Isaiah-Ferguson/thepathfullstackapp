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



export default function SearchUserFriend() {
  const [allUserInfo, setAllUserInfo] = useState<UserInfo[]>([]);
  const [friendInfo, setFriendInfo] = useState([]);
  const data = useContext<any>(UserContext);



  useEffect(() => {
    const fetchData = async () => {

      // Get the list of friends
      const allUserData = await getMyFriendsList(data.name.userId);
      setFriendInfo(allUserData);
      // Fetch the user info for each friend
      const promises = allUserData.map((item: number) => getUserInfoByID(item));
      const allUserInfo = await Promise.all(promises);
      setAllUserInfo(allUserInfo);
    };
    fetchData();
  }, [data.name.userId]);


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
