import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { useState, useEffect } from "react";
import {  getEventItemsByUserId } from '../../DataServices/DataServices';
import { useContext } from 'react'
import UserContext from '../../UserContext/UserContext';
import JoinedPersonList from '../ModalComponent/JoinPersonListModal';

interface EventItem {
  id: number,
  userId: number,
  date: string,
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
              const date = new Date(item.date);
              const formattedDate = date.toLocaleDateString();
              return (
                <Card style={{marginTop: 10}}>
                <Card.Header className="d-flex justify-content-between"><span className="searchclick">{item.publishedName}</span><span>{item.eventDate} {item.time}</span></Card.Header>
                <Card.Body>
                  <Card.Title  title={item.address} >{item.academyName}</Card.Title>
                  <Card.Text>
                  {item.description}
                  </Card.Text>
                  <Col className="d-flex justify-content-between"> <JoinedPersonList id={item.id} /> <div>Posted {formattedDate}</div></Col>
                </Card.Body>
              </Card>
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
  