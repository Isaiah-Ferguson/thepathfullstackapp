import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ModalComponent  from '../ModalComponent/ModelComponent';
import ProfileEditModal from '../ModalComponent/ProfileEditModal';
import EditPostModal from "../ModalComponent/EditPostModal";
import ProfilePost from "../ProfileComponent/ProfilePost"
import { useContext } from 'react'
import UserContext from '../../UserContext/UserContext';
import ProfileFriendComponent from "./ProfileFriendComponent";
import ProfileEventPost from "./ProfileEventPost";
import { loggedInData } from "../../DataServices/DataServices";
import { getUserInfoByID } from "../../DataServices/DataServices";
import FriendEvent from "./FriendEvent";
import AddFriendModal from "../ModalComponent/AddFriendModal";


interface UserInfo{
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
export default function ProfileFriend() {
  const blackbelt = require('../../assets/BJJBlack.png');
  const profile = require('../../assets/DefaultProfilePicture.png');
  const blackBelt = require('../../assets/BJJBlack.png');
  const whiteBelt = require('../../assets/BJJWhite.png');
  const blueBelt = require('../../assets/BJJBlue.png');
  const purpleBelt = require('../../assets/BJJPURPLE.png');
  const brownBelt = require('../../assets/BJJBrown.png');

  const data = useContext<any>(UserContext);



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
            
          setUserNum(data.name.userId);
          setUsername(data.name.publisherName);
          let userInfoItems = await getUserInfoByID(data.name.userId);
          console.log(userInfoItems);
          setUserInfo(userInfoItems);
        };
        getLoggedInData();
      },[data.name]);
      // ----------------------------------------------------------------------------


  return (
    <div className="container-fuild">
      <Row className="topProfileBG">
        <Col lg={4}>
          <Container className="text-center ensoBG">
            <img className="profileIMG" src={userInfo.image} />
          </Container>
          <Row>
            <Col>
              <div className="text-center profileHeaderText">{userInfo.firstName} {userInfo.lastName}</div>
            </Col>
          </Row>
<Row>
    <Col className="text-center" lg={6} xs={6}><AddFriendModal/></Col>

</Row>
          <div className="text-center">
          </div>
        </Col>
        <Col lg={8}>
          <Row className="aboutMeText">
            <p>About Me</p>
          </Row>
          <Row>
  <p className="profileHeaderText">Academy - {userInfo.academyName}</p>
          </Row>
          <Row>
            <p className="profileHeaderText">
              Rank - <img style={{ height: 40 }} src={imgSrc} title="BlackBelt" alt="Belt Rank"/>
            </p>
          </Row>
          <Row>
            <Col lg={7}>
              <p className="discText">
              {userInfo.aboutMe}
              </p>
            </Col>
          </Row>
        </Col>
        <Col>
        {/* Mobile Text */}
        {(isMobile) && (
            <Row className=" justify-content-around"  style={{ flexWrap: "nowrap" }}>
        <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('post')}>- Posts -</Col>
        <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('event')}>- Events -</Col>
        <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('friends')}>- Friends -</Col>
      </Row>
        )}
        
        </Col>
      </Row>
      
      <Row className={`bottomProfileBG ${isMobile ? 'mobileDiv' : ''}`}>
        
        {/*--------------- BOTTOM HALF OF PROFILE PAGE -----------------------*/}
        {(!isMobile || selectedSection === 'post') && (
        <Col lg={4} className='post'>
          <Row className="d-flex justify-content-center profileHeaderText BottomHeaderText">- Posts -</Row>
          <Container>

          <Row style={{marginTop: 10}}>
            <Col lg={3} xs={3}> <img className="smallProfileIMG"  src={profile} /> </Col>
            <Col lg={9} xs={9}> <textarea placeholder="What are your thoughts?" style={{ borderRadius: 5, height: 100, width: '100%' }}></textarea> </Col>
          </Row>
          <Row className="d-flex justify-content-end">
            <Col lg={2} xs={2}><button className='profilePostButton'>Post</button></Col>
            </Row>
          <div className="">
            {/*------------------- Profile Post Div------------------------ */}
          <ProfilePost/>

          </div>
          </Container>
          
        </Col>)}
        {(!isMobile || selectedSection === 'event') &&  (<Col lg={4} className='event'>
          <Row className="d-flex justify-content-center profileHeaderText BottomHeaderText">- Events -</Row>
          <Container className="eventScrollDiv">

         <FriendEvent/>
          </Container>


        </Col>)}
        {
       (!isMobile || selectedSection === 'friends') &&  (<Col lg={4} className='friends'>
          <Row className="d-flex justify-content-center profileHeaderText ">- Friends -</Row>
          <Container className="eventScrollDiv"> 
          <Row className="rowFriendsDiv">
            <ProfileFriendComponent/>
            <ProfileFriendComponent/>
            <ProfileFriendComponent/>
            <ProfileFriendComponent/>
            <ProfileFriendComponent/>
            <ProfileFriendComponent/>
          </Row>
          </Container>
        </Col>)}
        
      </Row>
    </div>
  );
}