import React from "react";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { checkToken, GetPublishedBlogItem, searchUser, getMyFriendsList } from "../../DataServices/DataServices";
import { useNavigate, } from 'react-router-dom';
import UserContext from "../../UserContext/UserContext";
interface BlogItem {
  date: string;
  id: number;
  image: string;
  isDeleted: boolean;
  isPublish: boolean;
  publishedName: string;
  description: string;
  title: string;
  userid: number;
}

export default function MainFeedPostComponent() {
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const [friendInfo, setFriendInfo] = useState<number[]>([]);
  const data = useContext<any>(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    const getLoggedInData = async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : data;
      const allUserData = await getMyFriendsList(loggedIn.userId);
      setFriendInfo(allUserData);
      let userBlogItems = await GetPublishedBlogItem();
      const blogItemsOrder = userBlogItems.reverse();
      setBlogItems(blogItemsOrder);
    };
    if (!checkToken()) {
      navigate('/Login');
    } else {
      getLoggedInData();
    }
  }, [data.shouldReload]);


    const profileClick = async (publisherName: string) => {
    const searchName = await searchUser(publisherName);
    if(data.myName === publisherName){
      navigate("/profile")
    }else{
    data.setName(searchName);
    navigate("/friends");
    }
  }

  return (
    <>
      {blogItems.length > 0 ?
      
      blogItems.filter((item: BlogItem) => item.isPublish && friendInfo.includes(item.userid)  || item.isPublish && item.userid === data.userId).map((item: BlogItem, idx: number) => {
          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString();

          return (
            <Row key={idx} style={{ marginTop: 10, marginBottom: 10 }}>
              <Col lg={12} className="mainPostDiv">
                <Row className="d-flex justify-content-center newBgColor">
                  <Col md={12} sm={12} xs={12} style={{marginTop: 10}}>
                    <Row>
                      <Col  md={1} sm={1} xs={2}>
                      <img onClick={() => profileClick(item.publishedName)} className="smallProfileIMGPost searchclick" src={item.image} />
                      </Col>
                      <Col>
                      <Row>
                      <div>{item.publishedName}</div>
                      <p>{formattedDate}</p>
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
        }) :<div className="Loading-MainFeed">
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
