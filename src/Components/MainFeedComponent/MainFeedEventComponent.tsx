import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { checkToken, getMyFriendsList, getEventItemsByUserId, updateEventItem  } from "../../DataServices/DataServices";
import { useNavigate } from 'react-router-dom';
import UserContext from "../../UserContext/UserContext";

interface EventItem {
  participants: any;
  Id: number;
  userId: number;
  Date: string;
  publishedName: string;
  academyName: string;
  time: string;
  eventDate: string;
  address: string;
  description: string;
  type: string;
  isPublish: true;
  isDeleted: false;
  image: string;
}

export default function MainFeedEventComponent() {
  const data = useContext<any>(UserContext);
  const [friendInfo, setFriendInfo] = useState<number[]>([]);
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
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : data;
      const allUserData = await getMyFriendsList(loggedIn.userId);
      setFriendInfo(allUserData);
      setBlogUserId(loggedIn.userId);
      setBlogPublisherName(loggedIn.publisherName);
      let userEventItems = await getEventItemsByUserId(loggedIn.userId);
      console.log(userEventItems)
      setMyEventItems(userEventItems.reverse());
    };

    if (!checkToken()) {
      navigate('/Login');
    } else {
      getLoggedInData();
    }
  }, []);

  function handleClick(e: any) {
    if (join === "Join") {
      setJoin("Joined");
      // Add both the current user's ID and the event owner's ID to the event's participants list
      const updatedEventItems = myEventItems.map((item) => {
        if (item.Id === blogId) {
          return {
            ...item,
            participants: [item.userId, data.userId],
          };
        }
        return item;
      });
      setMyEventItems(updatedEventItems);
    } else {
      setJoin("Join");
      // Remove both the current user's ID and the event owner's ID from the event's participants list
      const updatedEventItems = myEventItems.map((item) => {
        if (item.Id === blogId) {
          return {
            ...item,
            participants: item.participants.filter((participantId: number) => participantId !== item.userId && participantId !== data.userId),
          };
        }
        return item;
      });
      setMyEventItems(updatedEventItems);
    }
  }

  return (
    <>
      {myEventItems.length > 0 ? (
        myEventItems
          .filter((item: EventItem) => item.type === 'Public' || (item.type === 'Private' && (friendInfo.includes(item.userId) || item.userId === data.userId)))
          .map((item: EventItem, idx: number) => (
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
              <Button onClick={handleClick}>{join}</Button>
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
