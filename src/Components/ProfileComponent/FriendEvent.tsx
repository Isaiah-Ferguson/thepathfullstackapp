import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useState, useEffect } from "react";
import {  getEventItemsByUserId } from '../../DataServices/DataServices';
import { useContext } from 'react'
import UserContext from '../../UserContext/UserContext';

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
type pictureprops = {
  picture: string;
}

export default function FriendEvent(props: pictureprops) {
    const [myEventItems, setMyEventItems] = useState<EventItem[]>([]);
    const profile = require('../../assets/DefaultProfilePicture.png');
    const [blogUserId, setBlogUserId] = useState<number | null>(null);
    const [blogPublisherName, setBlogPublisherName] = useState('');
    const data = useContext<any>(UserContext);

  
    useEffect(() => {
      const getLoggedInData = async () => {
        const loggedIn = data;
        setBlogUserId(loggedIn.name.userId);
        setBlogPublisherName(loggedIn.publisherName);
        let userEventItems = await getEventItemsByUserId(loggedIn.userId);
        setMyEventItems(userEventItems);
      };
        getLoggedInData();
    }, [data.name]);

    return (
      <>
        {myEventItems.length > 0 ? (
          myEventItems.filter((item) => item.userId === blogUserId)
            .map((item: EventItem, idx: number) => (
              <Row style={{ marginTop: 10 }} key={idx}>
                <Col lg={3} xs={3}>
                  <img className="smallProfileIMG" src={props.picture} alt={item.publishedName} />
                </Col>
                <Col lg={9} xs={9}>
                  <div className="eventTextArea">
                    <Row>
                      <Col lg={12} className="d-flex justify-content-start">
                        <p className="profileFontPadding">{item.publishedName} Created an Open mat</p>
                      </Col>
                      <Col className="d-flex justify-content-start">
                        <p className="profileFontPadding">
                          {item.eventDate} at {item.time}
                        </p>
                      </Col>
                    </Row>
                    <Row className="text-center">
                      <p>{item.academyName}</p>
                      <p>{item.address}</p>
                    </Row>
                  </div>
                </Col>
              </Row>
            ))
        ) : (
          <div>Loading...</div>
        )}
      </>
    );
    
    
  }
  