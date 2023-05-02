import React from "react";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { checkToken, loggedInData, getEventItemsByUserId } from "../../DataServices/DataServices";
import { useNavigate } from 'react-router-dom';

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
  const locationIMG = require("../../assets/Location.png");

  const [join, setJoin] = useState("Join");
  const [myEventItems, setMyEventItems] = useState<EventItem[]>([]);
  const profile = require('../../assets/DefaultProfilePicture.png');
  const [blogUserId, setBlogUserId] = useState<number | null>(null);
  const [blogPublisherName, setBlogPublisherName] = useState('');

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
        ))) : (<div>Loading...</div>)
      }
    </>
  );
}
