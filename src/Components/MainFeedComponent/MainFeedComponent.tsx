import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button } from "react-bootstrap";
import MainFeedEventComponent from "./MainFeedEventComponent";
import NavBar from "../NavbarComponent/NavBarComponent"
import MainFeedPostComponent from "./MainFeedPostComponent";
import ProfilePostModule from "../ModalComponent/ProfilePostModule";
import { getUserInfoByID, loggedInData } from "../../DataServices/DataServices";
import UserContext from "../../UserContext/UserContext";

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

export default function MainFeedComponent() {
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
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 993);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  function handleButtonClick(sectionName: string) {
    setSelectedSection(sectionName);
  }

  return (
    <div className="container-fluid topProfileBG">
      <NavBar />
      <br />
      <br />

      <div className="custom-container">
        {(isMobile) && (
          <Col lg={12}>
            <Row className=" justify-content-around" style={{ flexWrap: "nowrap", marginTop: 30, marginBottom: 15 }}>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('post')}><Button variant="info">View Post</Button></Col>
              <Col className="d-flex justify-content-center " xsm={1} onClick={() => handleButtonClick('event')}><Button variant="warning">View Events</Button></Col>
            </Row>  </Col>
        )}

        <Row>
          {(!isMobile || selectedSection === 'post') && (
            <Col lg={7} xs={12} style={{ height: '88vh' }}>
              <ProfilePostModule picture={userInfo.image} />
              <MainFeedPostComponent />
            </Col>
          )}
          {(!isMobile || selectedSection === 'event') && (
            <Col lg={5} className="d-flex justify-content-end">
              <div className="eventmainPageBg custom-container">
                <Row className="text-center">
                  <h1 className="pColor">Event Calendar</h1>
                </Row><div>
                  <MainFeedEventComponent />

                </div>
              </div>
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
}
