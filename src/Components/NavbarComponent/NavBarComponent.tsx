import React from "react";
import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import { searchUser } from "../../DataServices/DataServices";
import { useContext } from "react";
import UserContext from "../../UserContext/UserContext";




export default function NavbarComponent() {
  const logo = require("../../assets/Logo.png");
  const profile = require('../../assets/DefaultProfilePicture.png');
  const [search, setSearch] = useState('');
  const data = useContext<any>(UserContext);

  let navigate = useNavigate();

  

  function ProfileNavigate() { navigate("/profileme"); };
  function MainFeedNavigate() { navigate("/MainFeedComponent"); };

  function LoginNavigate() {
    localStorage.removeItem('Token');
    navigate("/");
  };


  const handleSearch = async () => {
    const searchName = await searchUser(search);
    data.setName(searchName);
    navigate("/friends");
  }

  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  return (
    <>
    <span className="translate-middle badge rounded-pill bg-danger NotificationBadge iconPosition">
          {" "}
          99+
        </span>
    <Navbar expand="lg" className="navBarTest">
      
      <Container fluid>
        <img className="NavLogo" onClick={(e) => { setIsNotificationVisible(!isNotificationVisible); }} src={logo} />
        
          
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

        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 navigation"
            style={{ maxHeight: "150px" }}
            navbarScroll
          >
            <Nav.Link onClick={ProfileNavigate}>Profile</Nav.Link>
            <Nav.Link onClick={MainFeedNavigate}>Main Feed</Nav.Link>
          
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search..."
              className="me-2 searchbar"
              aria-label="Search"
              onChange={({ target: { value } }) =>  setSearch(value)}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Form>
          <button onClick={LoginNavigate} className="btnSignOut">Logout</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}
