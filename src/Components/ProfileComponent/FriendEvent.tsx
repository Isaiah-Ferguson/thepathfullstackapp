import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useState, useEffect } from "react";
import {  getEventItemsByUserId } from '../../DataServices/DataServices';
import { useContext } from 'react'
import UserContext from '../../UserContext/UserContext';
import JoinedPersonList from '../ModalComponent/JoinPersonListModal';

interface EventItem {
  id: number,
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
    const [blogUserId, setBlogUserId] = useState<number | null>(null);
    const data = useContext<any>(UserContext);
  
    useEffect(() => {
      const getLoggedInData = async () => {
        const loggedIn = data;
        setBlogUserId(loggedIn.name.userId);
        let userEventItems = await getEventItemsByUserId(loggedIn.userId);
        setMyEventItems(userEventItems);
      };
        getLoggedInData();
    }, [data.name]);

    return (
      <>
        {myEventItems.length > 0 ? (
          myEventItems.filter((item) => item.userId === blogUserId && item.type === 'Public')
            .map((item: EventItem, idx: number) =>{
              return (
                <Row style={{ marginTop: 10 }} key={idx}>
                  <Col lg={3} xs={3}>
                    <img className="smallProfileIMG" src={props.picture} alt={item.publishedName} />
                    <p>{item.publishedName}</p>
                  </Col>
                  <Col lg={9} xs={9}>
                    <div className="eventTextArea">
                      <Row>
                        <Col lg={12} className="d-flex justify-content-start">
                          <p className="profileFontPadding">
                          Open mat {item.eventDate} at {item.time}
                          </p>
                        </Col>
                      </Row>
                      <Row className="text-center">
                        <p>{item.academyName}</p>
                        <p>{item.address}</p>
                      </Row>
                      <JoinedPersonList id={item.id} />
                    </div>
                  </Col>
                </Row>
              )
               } ) 
            ): (
              <div className='Loading-DivPost'>
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
        )}
      </>
    );
    
    
  }
  