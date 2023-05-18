import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useContext } from 'react'
import UserContext from '../../UserContext/UserContext';
import { getUserInfoByID } from "../../DataServices/DataServices";
import AddFriendModal from "../ModalComponent/AddFriendModal";
import FriendPost from './FriendPost';
import NavbarComponent from "../NavbarComponent/NavBarComponent";
import SearchUserFriend from "./SearchUserFriend";
import FriendEvent from "./FriendEvent";


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

export default function ProfileFriend() {
  const blackBelt = require('../../assets/BJJBlack.png');
  const whiteBelt = require('../../assets/BJJWhite.png');
  const blueBelt = require('../../assets/BJJBlue.png');
  const purpleBelt = require('../../assets/BJJPurple.png');
  const brownBelt = require('../../assets/BJJBrown.png');

  const data = useContext<any>(UserContext);

  const [selectedSection, setSelectedSection] = useState('post');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 993);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    aboutMe: "",
    id: 0,
    image: "",
    academyName: "",
    firstName: "",
    lastName: "",
    publishedName: "",
    username: "",
    belt: ""
  });
  const imgSrc = userInfo.belt === "White Belt" ? whiteBelt :
    userInfo.belt === "Blue Belt" ? blueBelt :
      userInfo.belt === "Purple Belt" ? purpleBelt :
        userInfo.belt === "Brown Belt" ? brownBelt :
          userInfo.belt === "Black Belt" ? blackBelt :
            "";

  function handleButtonClick(sectionName: string) {
    setSelectedSection(sectionName);
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 993);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // -------------------GETS USER INFO FOR PROFILE PAGE--------------------------

  useEffect(() => {
    const getLoggedInData = async () => {
      let userInfoItems = await getUserInfoByID(data.name.userId);
      setUserInfo(userInfoItems);
    };
    getLoggedInData();
  }, [data.name]);
  // ----------------------------------------------------------------------------


  return (
    <div className="container-fluid topProfileBG">
      <NavbarComponent />
      <Row className="  d-flex justify-content-center">
        <Col lg={3} md={12} sm={12} className="profileCard">
          <Container className="text-center ensoBG">
            <img className="profileIMG" src={userInfo.image} />
          </Container>
          <Row>
            <Col>
              <div className="text-center profileHeaderText">{userInfo.firstName} {userInfo.lastName}</div>
              <p style={{ padding: 10 }} className="profileHeaderText text-center">Academy - {userInfo.academyName}</p>

            </Col>
            <div className="d-flex justify-content-center"><img style={{ height: 40 }} src={imgSrc} title="BlackBelt" alt="Belt Rank" /></div>
            <p className="discText">About Me</p>
            <p> {userInfo.aboutMe} </p>
          </Row>


          <AddFriendModal username={userInfo.firstName} myID={1} theirID={data.name.userId} />

        </Col>

        {/*------------------------------------- Mobile Text---------------------------------------------- */}
        {(isMobile) && (
          <Col lg={12}>
            <Row className=" justify-content-around" style={{ flexWrap: "nowrap", marginTop: 30 }}>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('post')}><Button variant="info">View Post</Button></Col>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('event')}><Button variant="warning">View Events</Button></Col>
            </Row>  </Col>
        )}


        {(!isMobile || selectedSection === 'post') && (
          <Col lg={4} md={12} sm={12} className='post'>
            <Row className="d-flex justify-content-center profileHeaderText BottomHeaderText">- Posts -</Row>
            <div>

              {/*--------------------------------- Profile Post Div--------------------------------------------- */}
              <div className="scrollDiv">  <FriendPost picture={userInfo.image} /> </div>

            </div>
          </Col>)}

        {(!isMobile || selectedSection === 'event') && (<Col lg={4} md={4} sm={12} className='event'>
          <Row className="d-flex justify-content-center profileHeaderText BottomHeaderText">- Events -</Row>
          <Container className="eventScrollDiv">

            <FriendEvent picture={userInfo.image} />
          </Container>


        </Col>)}

      </Row>

      <Row className={`bottomProfileBG ${isMobile ? 'mobileDiv' : ''}`}>

        {/*--------------- BOTTOM HALF OF PROFILE PAGE -----------------------*/}


      </Row>
      <Col lg={12} xs={12} className='friends'>
        <Row className="d-flex justify-content-center profileHeaderText ">- Friends -</Row>
        <div style={{ marginTop: -55 }}>
          <div className="friendScrollDiv d-flex">
            <SearchUserFriend />
          </div>
        </div>
      </Col>
    </div>
  );
}