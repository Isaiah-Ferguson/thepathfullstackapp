import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MainFeedEventComponent from "./MainFeedEventComponent";
import { useNavigate } from 'react-router-dom';
import { loggedInData, getEventItemsByUserId, checkToken, GetAcademyList, getUserInfoByID, addBlogItem } from '../../DataServices/DataServices';

export default function MainFeedComponent() {
  const [selectedSection, setSelectedSection] = useState('post');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 993);
  const [join, setJoin] = useState("Join");
  const profileIMG = require("../../assets/DefaultProfilePicture.png");
  const locationIMG = require("../../assets/Location.png");
  const BJJWhite = require("../../assets/WhiteBeltIcon.png");

  const [academy, setAcademy ] = useState('');
  const [blogDiscription, setBlogDescription ] = useState('');
  const [blogId, setBlogImage ] = useState('')
  const [blogItems, setBlogItems ] = useState('')
  const [blogUserId, setBlogUserId ] = useState(0)

  
  const handleCreatePost = () => {
    const testing = async () => {
      const academyQ = await GetAcademyList(academy);

  
      const userNames =  loggedInData();
      let userInfoItems = await getUserInfoByID(userNames.userId);
      const eventData = {
      Id: blogId,
      UserId: userNames.userId,
      Date: new Date,
      PublishedName: userNames.publisherName,
      Title: academyQ.name,
      Description: blogDiscription,
      isPublish: true,
      isDeleted: false,
      Image: userInfoItems.image
    }

    createPost(eventData);
  }
    testing();
 
  }

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

  

    // useEffect(() => {
    //   const fetchData = async () => {
    //     let res = await GetPublishedBlogItem();
    //     setBlogItems(res);
    //   };
    //   fetchData();
    //   console.log(blogItems)
    // }, []);


  function Joined(e: any) {
    e.target.value = "Joined";
    setJoin(e.target.value);
  }

  return (
    <div>
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
            <Row>
              <Col lg={2} md={2} xs={2}>
                <img className="mainFeedImg" src={profileIMG} />
              </Col>
              <Col>
                <textarea
                  placeholder="What are your thoughts?"
                  style={{ borderRadius: 5, height: 100, width: "100%" }}
                ></textarea>
              </Col>
            </Row>

            <Row className="d-flex justify-content-end">
              <Col lg={2} xs={2}>
                <button className="profilePostButton">Post</button>
              </Col>
            </Row>
            <Row style={{ marginTop: 10, marginBottom: 10 }}>
              <Col lg={12} className="mainPostDiv">
                <Row className="d-flex justify-content-center">
                  <Col md={3} sm={3} xs={3} className=" eventDateDiv">
                    <Row>
                      <img className="mainFeedImg" src={profileIMG} />
                    </Row>
                    <p>Name</p>
                    <Row>
                      <img className="beltImg" src={BJJWhite} />
                    </Row>
                    <p>Date</p>
                  </Col>
                  <Col md={8} sm={8} xs={8} >
                    <p>Test Post</p>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row style={{ marginTop: 10, marginBottom: 10 }}>
              <Col lg={12} className="mainPostEventDiv">
                <Row className="d-flex justify-content-center">
                  <Col md={3}  sm={3} xs={3}  className=" eventDateDiv">
                    <Row>
                      <img className="mainFeedImg" src={profileIMG} />
                    </Row>
                    <p>Name</p>
                    <Row>
                      <img className="beltImg" src={BJJWhite} />
                    </Row>
                    <p>Date</p>
                  </Col>
                  <Col md={8}  sm={8} xs={8} >
                    <p>Test Event</p>
                    <Row>
                      <Col>
                      Sunnyvale Bjj <img className="locationPNG" src={locationIMG} />
                      </Col>
                    </Row>
                    <button onClick={Joined} className="profilePostButton">{join}</button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        )}
          {(!isMobile || selectedSection === 'event') &&  (
          <Col lg={4} className="d-flex justify-content-end">
            <Container className="eventmainPageBg ">
              <Row className="text-center">
                <h1>Event Calander</h1>
              </Row>
              <MainFeedEventComponent/>

              <Row className="eventMainPageDiv">
                <Col md={3} sm={3} xs={3} className="text-center eventDateDiv">
                <h5>SUN</h5>
                <h5>8th</h5>
                <h5>Aug</h5>
                </Col>
                <Col md={8} sm={8} xs={8}>
                  <h6>Chandler Ocapan</h6>
                  <h5>
                    <b>
                      <u>Sunnyvale Bjj</u>
                    </b>
                    <img className="locationPNG" src={locationIMG} />
                  </h5>
                  <h5>Time</h5>
                </Col>
              </Row>
            </Container>
          </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
