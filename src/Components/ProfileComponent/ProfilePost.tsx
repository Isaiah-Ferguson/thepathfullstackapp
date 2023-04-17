import React from "react";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { checkToken, loggedInData, GetPublishedBlogItem } from "../../DataServices/DataServices";
import EditPostModal from "../ModalComponent/EditPostModal";
import { useNavigate } from 'react-router-dom';

interface BlogItem {
  date: string;
  id: number;
  image: string;
  isDeleted: false;
  isPublished: false;
  publishedName: string;
  description: string;
  title: string;
  userid: number;
  // Other properties of a BlogItem
}


export default function ProfilePost() {
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const profile = require('../../assets/DefaultProfilePicture.png');
  const [blogUserId, setBlogUserId] = useState<number | null>(null);
  const [blogPublisherName, setBlogPublisherName] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const getLoggedInData = async () => {
      const loggedIn = loggedInData();
      console.log(loggedIn)
      setBlogUserId(loggedIn.userId);
      setBlogPublisherName(loggedIn.publisherName);
      let userBlogItems = await GetPublishedBlogItem();
      console.log(userBlogItems)
      setBlogItems(userBlogItems);
    };
    if (!checkToken()) {
      navigate('/Login');
    } else {
      // Get user Data and blog Items
      getLoggedInData();
    }
  }, []);
  const numbertest = 0;


  return (
    <>
      {blogItems.length > 0 ?
        blogItems.map((item: BlogItem, idx: number) => {
          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString();
          return (
            <Row key={idx} style={{ marginTop: 20 }} className='d-flex justify-content-between align-items-end postBG'>
              <Col lg={3} sm={3} xs={7}>
                <img className="smallProfileIMG" src={profile} alt="profile" />
                <div style={{ display: 'inline-block', marginLeft: '10px' }}>
                  <div>{item.publishedName}</div>
                  <div>{formattedDate}</div>
                </div>
              </Col>

              <Col lg={1} xs={2} style={{ height: 40 }} >
                <EditPostModal blogId={item.id} />
              </Col>
              <Col className="d-flex justify-content-end" lg={11} xs={11}>
                <div className="textArea ">{item.description}</div>
              </Col>
            </Row>
          )
        }) : <div>Loading...</div>
      }


    </>
  );
}
