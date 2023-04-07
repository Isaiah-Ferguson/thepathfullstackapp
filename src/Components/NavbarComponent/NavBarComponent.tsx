import React from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';


export default function NavbarComponent() {
  const logo = require("../../assets/Logo.png");
  const profile = require('../../assets/DefaultProfilePicture.png');
  const bell = require('../../assets/Bell.png');


  let navigate = useNavigate();

  function ProfileNavigate() {
    navigate("/");
  };
  function MainFeedNavigate() {
    navigate("/MainFeedComponent");
  };

  function LoginNavigate() {
    navigate("/Login");
  };

  // /Login


  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  return (
    <Navbar  expand="lg">
      <Container fluid>
        <img className="NavLogo" src={logo} />

        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 navigation"
            style={{ maxHeight: "150px" }}
            navbarScroll
          >
            <Nav.Link onClick={ProfileNavigate}>Profile</Nav.Link>
            <Nav.Link onClick={MainFeedNavigate}>Main Feed</Nav.Link>
            <Nav.Link href="" onClick={(e) => {
            setIsNotificationVisible(!isNotificationVisible);
          }}>
              Notifications{" "}
              <span className="translate-middle badge rounded-pill bg-danger NotificationBadge">
                {" "}
                99+
              </span>
              {isNotificationVisible && <div className="NotificationDiv container-fluid">
                <Row className="NotificationDiv2">
                  <Col lg={4} xs={4}>
                    <img className="NotificationImg" src={profile}/>
                  </Col>
                  <Col lg={8} xs={8}>
                    <p>Busby has sent a Friends request</p>
                    <Button style={{marginRight: 20}}>Accept</Button><Button variant="danger">Decline</Button>
                  </Col>
                </Row>
                <Row className="NotificationDiv2">
                  <Col lg={4} xs={4}>
                    <img className="NotificationImg" src={profile}/>
                  </Col>
                  <Col lg={8} xs={8}>
                    <p>Busby has sent a Friends request</p>
                    <Button style={{marginRight: 20}}>Accept</Button><Button variant="danger">Decline</Button>
                  </Col>
                </Row>
                </div>}
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2 searchbar"
              aria-label="Search"
            />
          </Form>
          <button onClick={LoginNavigate} className="btnSignOut">Logout</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
