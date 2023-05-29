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
  const data = useContext<any>(UserContext);

  let navigate = useNavigate();

  useEffect(() => {
    const getLoggedInData = async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : loggedInData();
      setBlogUserId(loggedIn.userId);
      let userBlogItems = await GetPublishedBlogItem();
      setBlogItems(userBlogItems);
    };
    if (!checkToken()) {
      navigate('/Login');
    } else {
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
            <Row key={idx} style={{ marginTop: 10, marginBottom: 10 }}>
              <Col lg={12} className="mainPostDiv">
                <Row className="d-flex justify-content-center newBgColor">
                  <Col md={12} sm={12} xs={12} style={{ marginTop: 10 }}>
                    <Row style={{paddingRight:15, paddingLeft: 15}}>
                      <Col lg={1} md={1} sm={1} xs={2}>
                        <img className="smallProfileIMGPost" src={item.image} />
                      </Col>
                      <Col lg={11} md={11} sm={11} xs={10}  className="postImgDivPadding">
                        <Row>
                          <div className="d-flex justify-content-between"><strong>{item.publishedName} </strong><EditPostModal description={item.description} blogId={item.id} />
                          </div>
                          <p className="d-flex justify-content-start">{formattedDate}</p>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12} sm={12} xs={12} className="wordbreak">
                    <p className="profileDescription">{item.description}</p>
                  </Col>
                </Row>
              </Col>
            </Row>
          )
        }) : <div className='Loading-DivPost'>
          <div className="load-wrapp2">
            <div className="load-6">
              <div className="letter-holder2">
                <div className="l-1 letter">L</div>
                <div className="l-2 letter">o</div>
                <div className="l-3 letter">a</div>
                <div className="l-4 letter">d</div>
                <div className="l-5 letter">i</div>
                <div className="l-6 letter">n</div>
                <div className="l-7 letter">g</div>
                <div className="l-8 letter">.</div>
                <div className="l-9 letter">.</div>
                <div className="l-10 letter">.</div>
              </div>
            </div>
          </div>
          <div className="clear"></div>
        </div>
      }
    </>
  );
}
