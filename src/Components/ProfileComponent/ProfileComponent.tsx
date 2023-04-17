import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ModalComponent from '../ModalComponent/ModelComponent';
import ProfileEditModal from '../ModalComponent/ProfileEditModal';
import EditPostModal from "../ModalComponent/EditPostModal";
import ProfilePost from "../ProfileComponent/ProfilePost"
import { useContext } from 'react'
import UserContext from '../../UserContext/UserContext';
import ProfileFriendComponent from "./ProfileFriendComponent";
import ProfileEventPost from "./ProfileEventPost";
import { getUserInfoByID, addBlogItem, loggedInData } from "../../DataServices/DataServices";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProfilePostModule from "../ModalComponent/ProfilePostModule";


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

interface PicProps {
  picture: string,
}
export default function ProfileComponent() {
  const blackbelt = require('../../assets/BJJBlack.png');
  const profile = require('../../assets/DefaultProfilePicture.png');
  const blackBelt = require('../../assets/BJJBlack.png');
  const whiteBelt = require('../../assets/BJJWhite.png');
  const blueBelt = require('../../assets/BJJBlue.png')
  const purpleBelt = require('../../assets/BJJPURPLE.png')
  const brownBelt = require('../../assets/BJJBrown.png')
  const [blogId, setBlogId] = useState(0);
  const [postDescription, setPostDescription] = useState("");
  const [selectedSection, setSelectedSection] = useState('post');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 993);
  const [userNum, setUserNum] = useState(0);
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
  const [username, setUsername] = useState('');
  


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
      const loggedIn = loggedInData();
      setUserNum(loggedIn.userId);
      setUsername(loggedIn.publisherName);
      let userInfoItems = await getUserInfoByID(loggedIn.userId);
      setUserInfo(userInfoItems);
    };
    getLoggedInData();
  }, []);
  // ----------------------------------------------------------------------------
  const handlePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDescription(e.target.value)
  }

  const createPost = () => {
    const testing = async () => {

      const userNames = loggedInData();
      let userInfoItems = await getUserInfoByID(userNames.userId);
      const blogData = {
        Id: blogId,
        UserId: userNames.userId,
        Date: new Date,
        title: userNames.publisherName,
        publishedName: userNames.publisherName,
        description: postDescription,
        isPublish: true,
        isDeleted: false,
        image: userInfoItems.image
      }
      addBlogItem(blogData);
    }
    testing();
  }

  return (
    <div className="container-fluid topProfileBG">
      
      <Row className="  d-flex justify-content-center">
        <Col lg={3} sm={12} className="profileCard">
          <Container className="text-center ensoBG">
            <img className="profileIMG" src={userInfo.image} />
          </Container>
          <Row>
            <Col>
              <div className="text-center profileHeaderText">{userInfo.firstName} {userInfo.lastName}</div>
              <p style={{padding: 10}} className="profileHeaderText">Academy - {userInfo.academyName}</p>
              
            </Col>
            <div className="d-flex justify-content-center"><img style={{ height: 40 }} src={imgSrc} title="BlackBelt" alt="Belt Rank" /></div>
            <p className="discText">About Me</p>
            <p> {userInfo.aboutMe} </p>
          </Row>
          
          <Row style={{marginBottom: 25}}>
            <Col className="text-center" lg={6} xs={6}><ProfileEditModal /></Col>
            <Col className="text-center" lg={6} xs={6}><ModalComponent></ModalComponent></Col>
          </Row>
        </Col>
       
          {/* Mobile Text */}
          {(isMobile) && (
             <Col lg={12}>
            <Row className=" justify-content-around" style={{ flexWrap: "nowrap" }}>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('post')}>- Posts -</Col>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('event')}>- Events -</Col>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('friends')}>- Friends -</Col>
            </Row>  </Col>
          )}

      
        {(!isMobile || selectedSection === 'post') && (
          <Col lg={5} sm={12} className='post'>
            <Row className="d-flex justify-content-center profileHeaderText BottomHeaderText">- Posts -</Row>
            <Container>

              <Row style={{ marginTop: 10, marginBottom: 30 }}>
                <Col lg={12} xs={12} style={{ display: "inline-block" }}>  <img className="smallProfileIMGPost" src={userInfo.image} /><ProfilePostModule/> </Col>
              </Row>
              
              <div className="scrollDiv">
                {/*------------------- Profile Post Div------------------------ */}
                <ProfilePost />

              </div>
            </Container>

          </Col>)}

          {(!isMobile || selectedSection === 'event') && (<Col lg={4} sm={12} className='event'>
          <Row className="d-flex justify-content-center profileHeaderText BottomHeaderText">- Events -</Row>
          <Container className="eventScrollDiv">

            <ProfileEventPost />
          </Container>


        </Col>)}

      </Row>

      <Row className={`bottomProfileBG ${isMobile ? 'mobileDiv' : ''}`}>

        {/*--------------- BOTTOM HALF OF PROFILE PAGE -----------------------*/}

        

      </Row>
      <Col lg={12} xs={12} className='friends'>
            <Row className="d-flex justify-content-center profileHeaderText ">- Friends -</Row>
            <div style={{marginTop: -55}}>
              <div className="friendScrollDiv d-flex">
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
                <ProfileFriendComponent />
              </div>
            </div>
          </Col>
    </div>
  );
}
