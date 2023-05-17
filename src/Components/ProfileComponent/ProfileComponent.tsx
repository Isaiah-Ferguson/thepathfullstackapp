import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ModalComponent from '../ModalComponent/ModelComponent';
import ProfileEditModal from '../ModalComponent/ProfileEditModal';
import ProfilePost from "../ProfileComponent/ProfilePost"
import { useContext } from 'react'
import UserContext from '../../UserContext/UserContext';
import ProfileFriendComponent from "./ProfileFriendComponent";
import ProfileEventPost from "./ProfileEventPost";
import { getUserInfoByID, loggedInData } from "../../DataServices/DataServices";
import ProfilePostModule from "../ModalComponent/ProfilePostModule";
import NavBar from "../NavbarComponent/NavBarComponent"


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

export default function ProfileComponent() {
  const blackBelt = require('../../assets/BlackBeltIcon.png');
  const whiteBelt = require('../../assets/WhiteBeltIcon.png');
  const blueBelt = require('../../assets/BlueBeltIcon.png');
  const purpleBelt = require('../../assets/PurpleBeltIcon.png');
  const brownBelt = require('../../assets/BrownBeltIcon.png');


  const [selectedSection, setSelectedSection] = useState('post');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 993);
  const data = useContext<any>(UserContext);
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
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : loggedInData();
      let userInfoItems = await getUserInfoByID(loggedIn.userId);
      setUserInfo(userInfoItems);
    };
    getLoggedInData();
    data.setShouldReload(false);
  }, [data.shouldReload]);


  return (
    <div className="container-fluid topProfileBG">
      <NavBar/>
      <Row className="  d-flex justify-content-center">
        <Col lg={3} md={12} sm={12} className="profileCard">
          <Container className="text-center ensoBG">
            <img className="profileIMG" src={userInfo.image} />
          </Container>
          <Row>
            <Col>
              <div className="text-center profileHeaderText">{userInfo.firstName} {userInfo.lastName}</div>
              <p style={{padding: 10}} className="profileHeaderText text-center">Academy - {userInfo.academyName}</p>
            </Col>
            <div className="d-flex justify-content-center"><img style={{ height: 40 }} src={imgSrc} title="BlackBelt" alt="Belt Rank" /></div>
            <p className="discText">About Me</p>
            <p> {userInfo.aboutMe} </p>
          </Row>
          <Row style={{marginBottom: 25}}>
            <Col className="text-center" lg={6} xs={7}><ProfileEditModal newuser={data.newUser}/></Col>
            <Col className="text-center" lg={6} xs={5}><ModalComponent></ModalComponent></Col>
          </Row>
        </Col>
       
          {/*------------------------------------- Mobile Text---------------------------------------------- */}
          {(isMobile) && (
             <Col lg={12}>
            <Row className=" justify-content-around" style={{ flexWrap: "nowrap", marginTop: 30 }}>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('post')}><Button variant="info">Post</Button></Col>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('event')}><Button variant="warning">Events</Button></Col>
            </Row>  </Col>
          )}

      
        {(!isMobile || selectedSection === 'post') && (
        <Col lg={4} className='post'>
          <Row className="d-flex justify-content-center profileHeaderText BottomHeaderText">- Posts -</Row>
          <Container>

              <Row style={{ marginTop: 10, marginBottom: 30 }}>
                <Col lg={12} xs={12} style={{ display: "inline-block" }}><ProfilePostModule picture={userInfo.image}/> </Col>
              </Row>

              {/*--------------------------------- Profile Post Div--------------------------------------------- */}
              <div className="scrollDiv">  <ProfilePost picture={userInfo.image}/> </div>

            </Container>
          </Col>)}

          {(!isMobile || selectedSection === 'event') && (<Col lg={4} md={4} sm={12} className='event'>
          <Row className="d-flex justify-content-center profileHeaderText BottomHeaderText">- Events -</Row>
          <Container className="eventScrollDiv">
            <ProfileEventPost  picture={userInfo.image}/>
          </Container>
        </Col>)}

      </Row>

      <Col lg={12} xs={12} className='friends'>
            <Row className="d-flex justify-content-center profileHeaderText ">- Friends -</Row>
            <div style={{marginTop: -55}}>
              <div className="friendScrollDiv d-flex">
                <ProfileFriendComponent />
              </div>
            </div>
          </Col>
    </div>
  );
}
