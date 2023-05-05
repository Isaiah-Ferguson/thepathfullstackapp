import React from "react";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { checkToken, loggedInData, GetPublishedBlogItem } from "../../DataServices/DataServices";
import EditPostModal from "../ModalComponent/EditPostModal";
import { useNavigate } from 'react-router-dom';
import UserContext from '../../UserContext/UserContext';


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

export default function ProfilePost(props: pictureprops) {
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const [blogUserId, setBlogUserId] = useState<number | null>(null);
  const [blogPublisherName, setBlogPublisherName] = useState('');
  const data = useContext<any>(UserContext);

  let navigate = useNavigate();

  useEffect(() => {
    const getLoggedInData = async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : loggedInData();
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
    data.setShouldReload(false);
  }, [data.shouldReload]);

  return (
    <>
      {blogItems.length > 0 ?
        blogItems.filter((item) => item.userid === blogUserId).filter((item) => item.isPublish).reverse().map((item: BlogItem, idx: number) => {
          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString();
          return (
            <Row key={idx} style={{ marginTop: 20 }} className='d-flex  align-items-end postBG'>
              <Col lg={3} sm={3} xs={5}>
                <div className="d-flex justify-content-end"><EditPostModal blogId={item.id} /></div>
                <Row >
                  <Col sm={12} xs={6}>
                    <img className="smallProfileIMG" src={props.picture} alt="profile" />
                    <div style={{fontWeight: 600}}>{item.publishedName}</div>
                  <div>{formattedDate}</div>
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
