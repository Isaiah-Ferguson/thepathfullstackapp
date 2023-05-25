import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from 'react-router-dom';
import { searchUser } from "../../DataServices/DataServices";
import { useContext } from "react";
import UserContext from "../../UserContext/UserContext";
import NotificationComponent from "./NotificationComponent";

export default function NavbarComponent() {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const logo = require("../../assets/Logo.png");
  const [search, setSearch] = useState('');
  const data = useContext<any>(UserContext);
  let navigate = useNavigate();


  function ProfileNavigate() { navigate("/profile"); };
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



  return (
    <>
      <span className="translate-middle badge rounded-pill bg-danger NotificationBadge iconPosition"> {data.count} </span>
      <Navbar expand="lg" className="navBarTest">
        <Container fluid>
          <img className="NavLogo" onClick={(e) => { setIsNotificationVisible(!isNotificationVisible); }} src={logo} />

          <div className={`${isNotificationVisible ? `NotificationDiv` : 'NotificationDivX'} container-fluid`}> <NotificationComponent /> </div>
          
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
                placeholder="Search Users..."
                className="me-2 searchbar"
                aria-label="Search"
                onChange={({ target: { value } }) => setSearch(value)}
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
