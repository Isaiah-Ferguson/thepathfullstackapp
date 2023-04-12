import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import  { checkToken, loggedInData, getBlogItemsByUserId} from "../../DataServices/DataServices";
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
        setBlogUserId(loggedIn.userId);
        setBlogPublisherName(loggedIn.publishName);
        let userBlogItems = await getBlogItemsByUserId(loggedIn.userId);
        console.log(userBlogItems);
        setBlogItems(userBlogItems);
      };
  
      if (!checkToken()) {
        navigate('/Login');
      } else {
        // Get user Data and blog Items
        getLoggedInData();
      }
    }, []);

    return (
      <>
      {blogItems.length > 0 ?
        blogItems.map((item: BlogItem, idx: number) => (
          <Row key={idx} style={{marginTop: 10}}>
            <Col lg={3} xs={3}>
              <img className="smallProfileIMG" src={profile} alt="profile" />
              {item.publishedName}
            </Col>
            <Col lg={1} xs={1} style={{height: 40}} className='d-flex justify-content-evenly'>
              <EditPostModal/>
            </Col>
            <Col lg={8} xs={8}>
              <div className="textArea">{item.description}</div>
            </Col>
          </Row>
        )) : <div>Loading...</div>
      }
    </>
  );
}
