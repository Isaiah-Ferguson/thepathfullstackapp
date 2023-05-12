import React from "react";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { checkToken, loggedInData, getEventItemsByUserId, getUserInfoByID, updateEventItem  } from "../../DataServices/DataServices";
import { useNavigate } from 'react-router-dom';
import UserContext from "../../UserContext/UserContext";

interface EventItem {
  Id: number,
  userId: number,
  Date: string,
  publishedName: string,
  academyName: string,
  time: string,
  eventDate: string,
  address: string,
  description: string,
  type: string,
  isPublish: true,
  isDeleted: false,
  image: string
}

export default function MainFeedEventComponent() {
  const data = useContext<any>(UserContext);

  const [join, setJoin] = useState("Join");
  const [myEventItems, setMyEventItems] = useState<EventItem[]>([]);
  const profile = require('../../assets/DefaultProfilePicture.png');
  const [blogUserId, setBlogUserId] = useState<number | null>(null);
  const [blogPublisherName, setBlogPublisherName] = useState('');
  const [joined, setJoined] = useState(false);
  const [blogId, setBlogId] = useState<number | null>(null);

  let navigate = useNavigate();

  useEffect(() => {
    const getLoggedInData = async () => {
      const loggedIn = loggedInData();
      setBlogUserId(loggedIn.userId);
      setBlogPublisherName(loggedIn.publisherName);
      let userEventItems = await getEventItemsByUserId(loggedIn.userId);
      setMyEventItems(userEventItems);
    };

    if (!checkToken()) {
      navigate('/Login');
    } else {
      getLoggedInData();
    }
  }, []);

  function Joined(e: any) {
    if (e.target.value === "Joined") {
      setJoin("join");
    } else {
      setJoin("Joined");
    }
  }

  const handleClick =  async () => {
    setJoined(prevJoined => !prevJoined);

    const eventData = {
      Id: blogId,
      other: data.Id
    }
    await updateEventItem(eventData);
    data.setEventReload(true);
  }

  const myEventItemsOrder = myEventItems.reverse();
  
  return (
    <>
      {myEventItems.length > 0 ? (
        myEventItemsOrder.map((item: EventItem, idx: number) => (
          <Row className="eventMainPageDiv" key={idx}>
            <Col md={3} sm={3} xs={3} className="text-center eventDateDiv">
              <h6>{item.eventDate}</h6>
              <h6>{item.time}</h6>
            </Col>
            <Col md={9} sm={9} xs={9}>
              <h6>{item.publishedName}</h6>
              <h6>
                <b>
                  <u title={item.address}>{item.academyName}</u>
                </b>
              </h6>
            </Col>
          </Row>
        ))) : (<>
        <div className="Loading-MainFeed">
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
</>)
      }
    </>
  );
}
