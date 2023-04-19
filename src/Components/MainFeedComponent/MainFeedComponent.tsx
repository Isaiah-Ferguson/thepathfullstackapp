import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MainFeedEventComponent from "./MainFeedEventComponent";
import { useNavigate } from 'react-router-dom';
import { loggedInData, getEventItemsByUserId, checkToken, GetAcademyList, getUserInfoByID, addBlogItem } from '../../DataServices/DataServices';
import NavBar from "../NavbarComponent/NavBarComponent"
import MainFeedPostComponent from "./MainFeedPostComponent";
import ProfilePostModule from "../ModalComponent/ProfilePostModule";

export default function MainFeedComponent() {
  const [selectedSection, setSelectedSection] = useState('post');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 993);
  const profileIMG = require("../../assets/DefaultProfilePicture.png");
  const locationIMG = require("../../assets/Location.png");
  const BJJWhite = require("../../assets/WhiteBeltIcon.png");

  const [academy, setAcademy ] = useState('');
  const [blogDiscription, setBlogDescription ] = useState('');
  const [blogId, setBlogImage ] = useState('')
  const [blogItems, setBlogItems ] = useState('')
  const [blogUserId, setBlogUserId ] = useState(0)



  const createPost = async (event: object) => {
    let result = await addBlogItem(event);

    if (result) {
      let userBlogItems = await getEventItemsByUserId(blogUserId);
      console.log(userBlogItems);
      setBlogItems(userBlogItems);
    } else {
      alert(`Blog item was not not updated`)
    }
  }

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 993);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleButtonClick(sectionName: string) {
    setSelectedSection(sectionName);
  }

  return (
    <div className="topProfileBG">
      <NavBar/>
      <br />
      <br />
      
      <Container>
      {(isMobile) && (
            <Row className=" justify-content-around"  style={{ flexWrap: "nowrap" }}>
        <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('post')}>- Posts -</Col>
        <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('event')}>- Events -</Col>
      </Row>
        )}
        
        <Row>
        {(!isMobile || selectedSection === 'post') && (
          <Col lg={8} xs={12}>
            {/* <ProfilePostModule picture={blogItems.image} /> */}
           <MainFeedPostComponent/>
          </Col>
        )}
          {(!isMobile || selectedSection === 'event') &&  (
          <Col lg={4} className="d-flex justify-content-end">
            <Container className="eventmainPageBg ">
              <Row className="text-center">
                <h1>Event Calander</h1>
              </Row>
              <MainFeedEventComponent/>
            </Container>
          </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
