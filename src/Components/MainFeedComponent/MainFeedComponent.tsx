import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function MainFeedComponent() {
  const profileIMG = require("../../assets/DefaultProfilePicture.png");
  const locationIMG = require("../../assets/Location.png");
  const BJJWhite = require("../../assets/WhiteBeltIcon.png");


  return (
    <div>
      <br />
      <br />
<Container>
      <Row>
        <Col lg={8} xs={9}>
          <Row>
            <Col lg={2}>
            <img className="mainFeedImg" src={profileIMG} />
            </Col>
            <Col>
            <textarea
            placeholder="What are your thoughts?"
            style={{ borderRadius: 5, height: 100, width: "100%" }}
          ></textarea></Col>
          </Row>
        
         
          <Row className="d-flex justify-content-end">
            <Col lg={2} xs={2}>
              <button className="profilePostButton">Post</button>
            </Col>
          </Row>
          <Row style={{marginTop: 10, marginBottom: 10}}>
            <Col lg={12} className="mainPostDiv">

              <Row className="d-flex justify-content-center">
              <Col md={3} className=" eventDateDiv">
              <Row><img className="mainFeedImg" src={profileIMG} /></Row>
              <p>Name</p>
              <Row><img className="beltImg" src={BJJWhite}/></Row>
              <p>Date</p>
                </Col>
              <Col md={8}>
                <p>
                  Test Post
                </p>
                </Col>
            </Row>
            
            </Col>
          </Row>

          <Row style={{marginTop: 10, marginBottom: 10}}>
            <Col lg={12} className="mainPostDiv">

              <Row className="d-flex justify-content-center">
              <Col md={3} className=" eventDateDiv">
              <Row><img className="mainFeedImg" src={profileIMG} /></Row>
              <p>Name</p>
              <Row><img className="beltImg" src={BJJWhite}/></Row>
              <p>Date</p>
                </Col>
              <Col md={8}>
                <p>
                  Test Post
                </p>
                </Col>
            </Row>
            
            </Col>
          </Row>
        </Col>

        <Col lg={4} className="d-flex justify-content-end">
          <Container className="eventmainPageBg">
            <Row className="text-center"><h1>Event Calander</h1></Row>
            <Row className="eventMainPageDiv">
              <Col md={3} sm={3}  xs={3} className="text-center eventDateDiv">
                <h2>Aug</h2>
                <h2>8th</h2>
                </Col>
              <Col md={8} sm={8} xs={8}>
                <h6>Chandler Ocapan</h6>
                <h5><b><u>Sunnyvale Bjj</u></b><img className="locationPNG" src={locationIMG}/></h5>
                <h5>Time</h5>
                </Col>
            </Row>

            <Row className="eventMainPageDiv">
              <Col md={3}  sm={3}  xs={3}  className="text-center eventDateDiv">
                <h2>Aug</h2>
                <h2>8th</h2>
                </Col>
              <Col md={8} sm={8} xs={8}>
                <h6>Chandler Ocapan</h6>
                <h5><b><u>Sunnyvale Bjj</u></b><img className="locationPNG" src={locationIMG}/></h5>
                <h5>Time</h5>
                </Col>
            </Row>
            
          </Container>
        </Col>
      </Row>
      </Container>
    </div>
  );
}
