import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import ModalComponent  from '../ModalComponent/ModelComponent';
import ProfileEditModal from '../ModalComponent/ProfileEditModal';
import EditPostModal from "../ModalComponent/EditPostModal";
import ProfilePost from "../ProfileComponent/ProfilePost"
import { useContext } from 'react'
import UserContext from '../../UserContext/UserContext';

export default function ProfileComponent() {
  const blackbelt = require('../../assets/BJJBlack.png');
  const profile = require('../../assets/DefaultProfilePicture.png');
  let userData = useContext(UserContext);

    const [selectedSection, setSelectedSection] = useState('post');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 993);

    function handleButtonClick(sectionName: string) {
      setSelectedSection(sectionName);
    }

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 993);
        window.addEventListener('resize', handleResize);
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);


  return (
    <div className="container-fuild">
      <Row className="topProfileBG">
        <Col lg={4}>
          <Container className="text-center ensoBG">
            <img className="profileIMG" src={profile} />
          </Container>
          <Row>
            <Col>
              <div className="text-center profileHeaderText">Isaiah Ferguson</div>
            </Col>
          </Row>
<Row>
    <Col className="text-center" lg={6} xs={6}><ProfileEditModal/></Col>
    <Col className="text-center" lg={6} xs={6}><ModalComponent></ModalComponent></Col>

</Row>
          <div className="text-center">
          </div>
        </Col>
        <Col lg={8}>
          <Row className="aboutMeText">
            <p>About Me</p>
          </Row>
          <Row>
            <p className="profileHeaderText">Academy - Team Cama</p>
          </Row>

          <Row>
            <p className="profileHeaderText">
              Rank - <img style={{ height: 40 }} src={blackbelt} title="BlackBelt" alt="Belt Rank"/>
            </p>
          </Row>
          <Row>
            <Col lg={7}>
              <p className="discText">
                Hello! I am Isaiah I've been training Brazilian Jiu-Jitsu for
                the better part of 13 years. i received my black belt in 2022
                under Louie Concepcion. I train and Teach at Team Cama in
                Stockton CA.
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
          <Row className="d-flex justify-content-end"><Col lg={2} xs={2}><button className='profilePostButton'>Post</button></Col></Row>
          <div className="scrollDiv">
            {/*------------------- Profile Post Div------------------------ */}
          <ProfilePost/>

          </div>
          </Container>
          
        </Col>)}
        {(!isMobile || selectedSection === 'event') &&  (<Col lg={4} className='event'>
          <Row className="d-flex justify-content-center profileHeaderText BottomHeaderText">- Events -</Row>
          <Container className="eventScrollDiv">

          <Row style={{marginTop: 10}}>
            <Col lg={3} xs={3}> <img className="smallProfileIMG"  src={profile} /> </Col>
            <Col lg={9} xs={9}> 
            <div className="eventTextArea">

                <Row >
                <Col lg={12} className="d-flex justify-content-start"> <p  className="profileFontPadding">Created an Open mat</p> </Col>
                    <Col className="d-flex justify-content-start"> <p  className="profileFontPadding">3/4/2023 at 6PM</p></Col>
                </Row>

                <Row className="text-center"> <p>Concepcion Academy of Martial Arts</p> </Row>
              </div>
            </Col>
          </Row>

          <Row style={{marginTop: 10}}>
            <Col lg={3} xs={3}> <img className="smallProfileIMG"  src={profile} /> </Col>
            <Col lg={9} xs={9}>
              <div className="eventTextArea">
                <Row >
                <Col lg={12} className="d-flex justify-content-start"> <p className="profileFontPadding">Created an Open mat</p> </Col>
                    <Col className="d-flex justify-content-start"> <p className="profileFontPadding">3/4/2023 at 6PM</p></Col>
                </Row>
                <Row className="text-center"> <p>Concepcion Academy of Martial Arts</p></Row>
              </div>
            </Col>
          </Row>
          <Row style={{marginTop: 10}}>
            <Col lg={3} xs={3}> <img  className="smallProfileIMG"  src={profile} /> </Col>
            <Col lg={9} xs={9}>
              <div className="eventTextArea">
                <Row >
                <Col lg={12} className="d-flex justify-content-start"> <p className="profileFontPadding">Created an Open mat</p> </Col>
                    <Col className="d-flex justify-content-start"> <p className="profileFontPadding">3/4/2023 at 6PM</p></Col>
                </Row>
                <Row className="text-center">
                    <p>Concepcion Academy of Martial Arts</p>
                </Row>
              </div>
            </Col>
          </Row>
          <Row style={{marginTop: 10}}>
            <Col lg={3} xs={3}> <img className="smallProfileIMG"  src={profile} /> </Col>
            <Col lg={9} xs={9}>
              <div className="eventTextArea">
                <Row >
                <Col lg={12} className="d-flex justify-content-start"> <p className="profileFontPadding">Created an Open mat</p> </Col>
                    <Col className="d-flex justify-content-start"> <p className="profileFontPadding" >3/4/2023 at 6PM</p></Col>
                </Row>
                <Row className="text-center">
                    <p>Concepcion Academy of Martial Arts</p>
                </Row>
              </div>
            </Col>
          </Row>
          </Container>


        </Col>)}
        {
       (!isMobile || selectedSection === 'friends') &&  (<Col lg={4} className='friends'>
          <Row className="d-flex justify-content-center profileHeaderText ">- Friends -</Row>
          <Container className="eventScrollDiv"> 
          <Row>
            <Col lg={4} md={4} xs={6}><Container className="friendDiv ensoBGFriend"><img className="friendProfile img-fluid" src={profile}/><p className="friendName">Friend Name 1</p></Container></Col>
            <Col lg={4} md={4} xs={6}><Container className="friendDiv ensoBGFriend"><img className="friendProfile" src={profile}/><p className="friendName">Friend Name 1</p></Container></Col>
            <Col lg={4} md={4} xs={6}><Container className="friendDiv ensoBGFriend"><img className="friendProfile" src={profile}/><p className="friendName">Friend Name 1</p></Container></Col>
            <Col lg={4} md={4} xs={6}><Container className="friendDiv ensoBGFriend"><img className="friendProfile" src={profile}/><p className="friendName">Friend Name 1</p></Container></Col>
            <Col lg={4} md={4} xs={6}><Container className="friendDiv ensoBGFriend"><img className="friendProfile" src={profile}/><p className="friendName">Friend Name 1</p></Container></Col>
            <Col lg={4} md={4} xs={6}><Container className="friendDiv ensoBGFriend"><img className="friendProfile" src={profile}/><p className="friendName">Friend Name 1</p></Container></Col>
          </Row>
          </Container>
        </Col>)}
        
      </Row>
    </div>
  );
}
