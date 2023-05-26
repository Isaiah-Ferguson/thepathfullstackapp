import React, { useEffect, useState, useContext } from 'react'
import { Col, Container } from 'react-bootstrap'
import { getUserInfoByID, getMyFriendsList, searchUser } from '../../DataServices/DataServices';
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



export default function SearchUserFriend() {
  const [allUserInfo, setAllUserInfo] = useState<UserInfo[]>([]);
  const [friendInfo, setFriendInfo] = useState([]);
  const data = useContext<any>(UserContext);
  let navigate = useNavigate();



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

  const profileClick = async (publisherName: string) => {
    if(publisherName === data.myName){
      navigate("/profile");
    }else{
      const searchName = await searchUser(publisherName);
      data.setName(searchName);
      navigate("/friends");
    }
  }

  return (
    <>
      {allUserInfo.map((userInfo: UserInfo, key: number) => (
        <Col key={key}>
          <Container className="friendDiv">
            <img onClick={() => profileClick(userInfo.username)} className="friendProfile searchclick" src={userInfo.image} />
            <p className="friendName">{userInfo.username}</p>
          </Container>
        </Col>
      ))}
    </>
  )
}
