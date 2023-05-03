import React from "react";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { checkToken, loggedInData, GetPublishedBlogItem } from "../../DataServices/DataServices";
import EditPostModal from "../ModalComponent/EditPostModal";
import { useNavigate, } from 'react-router-dom';

interface BlogItem {
  date: string;
  id: number;
  image: string;
  isDeleted: false;
  isPublish: false;
  publishedName: string;
  description: string;
  title: string;
  userid: number;
  // Other properties of a BlogItem
}

type pictureprops = {
  picture: string;
}

export default function MainFeedPostComponent() {
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const profile = require('../../assets/DefaultProfilePicture.png');
  const [blogUserId, setBlogUserId] = useState<number | null>(null);
  const [blogPublisherName, setBlogPublisherName] = useState('');
  const profileIMG = require("../../assets/DefaultProfilePicture.png");
  const locationIMG = require("../../assets/Location.png");
  const BJJWhite = require("../../assets/WhiteBeltIcon.png");
  let navigate = useNavigate();

  useEffect(() => {
    const getLoggedInData = async () => {
      const loggedIn = loggedInData();
      setBlogUserId(loggedIn.userId);
      setBlogPublisherName(loggedIn.publisherName);
      let userBlogItems = await GetPublishedBlogItem();
      setBlogItems(userBlogItems);
    };
    if (!checkToken()) {
      navigate('/Login');
    } else {
      // Get user Data and blog Items
      getLoggedInData();
    }
  }, []);

  const blogItemsOrder = blogItems.reverse();
  return (
    <>
      {blogItems.length > 0 ?
      
      blogItemsOrder.filter((item) => item.isPublish).map((item: BlogItem, idx: number) => {
          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString();
          return (
            <Row key={idx} style={{ marginTop: 10, marginBottom: 10 }}>
              <Col lg={12} className="mainPostDiv">
                <Row className="d-flex justify-content-center newBgColor" style={{border: '2mm ridge #dec0f1'}}>
                  <Col md={3} sm={3} xs={3} className=" eventDateDiv">
                    <Row>
                      <img className="mainFeedImg" src={item.image} />
                    </Row>
                    <p style={{ marginLeft:'25px 0 2px',}}>{item.publishedName}</p>
                    <Row>
                      <img className="beltImg" src={BJJWhite} />
                    </Row>
                    <p>{formattedDate}</p>
                  </Col>
                  <Col md={8} sm={8} xs={8} style={{ backgroundColor: '#b79ced'}}>
                    <p>{item.description}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          )
        }) : <div>Loading...</div>
      }

    </>
  );
}
