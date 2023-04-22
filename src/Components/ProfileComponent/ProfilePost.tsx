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

type pictureprops = {
  picture: string;
}

export default function ProfilePost(props: pictureprops) {
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const profile = require('../../assets/DefaultProfilePicture.png');
  const [blogUserId, setBlogUserId] = useState<number | null>(null);
  const [blogPublisherName, setBlogPublisherName] = useState('');

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

  return (
    <>
      {blogItems.length > 0 ?
        blogItems.filter((item) => item.userid === blogUserId).map((item: BlogItem, idx: number) => {
          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString();
          return (
            <Row key={idx} style={{ marginTop: 20 }} className='d-flex  align-items-end postBG'>
              <Col lg={4} sm={3} xs={5}>
                <Row >
                  <Col sm={8} xs={6}>
                    <img className="smallProfileIMG" src={props.picture} alt="profile" />
                    <div style={{fontWeight: 600}}>{item.publishedName}</div>
                  <div>{formattedDate}</div>
                    </Col>
                    <Col lg={1} sm={2} xs={2} style={{ height: 40 }} >
                  
                <EditPostModal blogId={item.id} />
              </Col>
                </Row>
              </Col>

              <Col lg={8} sm={9} xs={7}><Row>
              <Col  lg={12} xs={12} className="d-flex justify-content-end">
                <div className="textArea ">{item.description}</div>
              </Col>
              </Row></Col>
              
              
            </Row>
          )
        }) : <div>Loading...</div>
      }


    </>
  );
}
