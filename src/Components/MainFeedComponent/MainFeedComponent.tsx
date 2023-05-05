import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MainFeedEventComponent from "./MainFeedEventComponent";
import { getEventItemsByUserId, addBlogItem } from '../../DataServices/DataServices';
import NavBar from "../NavbarComponent/NavBarComponent"
import MainFeedPostComponent from "./MainFeedPostComponent";


export default function MainFeedComponent() {
  const [selectedSection, setSelectedSection] = useState('post');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 993);



  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 993);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleButtonClick(sectionName: string) {
    setSelectedSection(sectionName);
  }

  return (
    <div className="container-fluid topProfileBG">
      <NavBar/>
      <br />
      <br />
      
      <Container>
      {(isMobile) && (
             <Col lg={12}>
            <Row className=" justify-content-around" style={{ flexWrap: "nowrap", marginTop: 30 }}>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('post')}><Button variant="info">Post</Button></Col>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('event')}><Button variant="warning">Events</Button></Col>
            </Row>  </Col>
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
