import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { GetAllUsers } from '../../DataServices/DataServices';

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
  const [allUserInfo, setAllUserInfo] = useState<UserInfo[]>([])
    const profile = require('../../assets/DefaultProfilePicture.png');
useEffect( () => {
  const getAllUserData =async () => {
    const allUserData = await GetAllUsers();
    setAllUserInfo(allUserData)
  }
  getAllUserData()
},[])
  return (
    <>
    {allUserInfo.map((item: UserInfo, key: number) => {
      return(
        <Col><Container className="friendDiv "><img className="friendProfile" src={item.image}/><p className="friendName">{item.publishedName}</p></Container></Col>

      )
    })}
    </>
  )
}
