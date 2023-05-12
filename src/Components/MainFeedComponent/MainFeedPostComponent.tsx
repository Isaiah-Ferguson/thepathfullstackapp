import React from "react";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { checkToken, loggedInData, GetPublishedBlogItem, searchUser, getMyFriendsList } from "../../DataServices/DataServices";
import { useNavigate, } from 'react-router-dom';
import UserContext from "../../UserContext/UserContext";
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

export default function MainFeedPostComponent() {
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const [blogUserId, setBlogUserId] = useState<number | null>(null);
  const [blogPublisherName, setBlogPublisherName] = useState('');
  const [friendInfo, setFriendInfo] = useState<number[]>([]);
  let navigate = useNavigate();
  const data = useContext<any>(UserContext);


  const blackBelt = require('../../assets/BJJBlack.png');
  const whiteBelt = require('../../assets/BJJWhite.png');
  const blueBelt = require('../../assets/BJJBlue.png');
  const purpleBelt = require('../../assets/BJJPURPLE.png');
  const brownBelt = require('../../assets/BJJBrown.png');

  useEffect(() => {
    const getLoggedInData = async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : data;
      const allUserData = await getMyFriendsList(loggedIn.userId);
      setFriendInfo(allUserData);
      setBlogUserId(loggedIn.userId);
      setBlogPublisherName(loggedIn.publisherName);
      let userBlogItems = await GetPublishedBlogItem();
      const blogItemsOrder = userBlogItems.reverse();
      console.log(blogItemsOrder);
      console.log(data.userId)
      setBlogItems(blogItemsOrder);
    };
    if (!checkToken()) {
      navigate('/Login');
    } else {
      getLoggedInData();
    }
  }, []);


    const profileClick = async (publisherName: string) => {
    const searchName = await searchUser(publisherName);
    console.log(data.myName, publisherName)
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
      
      blogItems.filter((item: BlogItem) => item.isPublish && friendInfo.includes(item.userid)  || item.userid === data.userId).map((item: BlogItem, idx: number) => {
          const date = new Date(item.date);
          const formattedDate = date.toLocaleDateString();

          return (
            <Row key={idx} style={{ marginTop: 10, marginBottom: 10 }}>
              <Col lg={12} className="mainPostDiv">
                <Row className="d-flex justify-content-center newBgColor" style={{border: '2mm ridge #dec0f1'}}>
                  <Col md={3} sm={3} xs={3} className=" eventDateDiv">
                    <Row>
                      <img onClick={() => profileClick(item.publishedName)} className="mainFeedImg searchclick" src={item.image} />
                    </Row>
                    <p className="text-center" style={{ marginLeft:'25px 0 2px',}}>{item.publishedName}</p>
                    <p>Posted {formattedDate}</p>
                  </Col>
                  <Col md={8} sm={8} xs={8} style={{ backgroundColor: '#b79ced'}}>
                    <p>{item.description}</p>
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
