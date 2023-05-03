import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { loggedInData, getEventItemsByUserId, checkToken } from '../../DataServices/DataServices';
import EditEventModal from '../ModalComponent/EditEventModal';
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

export default function ProfileEventPost(props: pictureprops) {

  const [myEventItems, setMyEventItems] = useState<EventItem[]>([]);
  const [blogUserId, setBlogUserId] = useState<number | null>(null);
  const [blogPublisherName, setBlogPublisherName] = useState('');
  const [joined, setJoined] = useState(false);

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
      // Get user Data and blog Items
      getLoggedInData();

    }
  }, []);

  function handleClick() {
    setJoined(prevJoined => !prevJoined);
  }

  const myEventItemsOrder = myEventItems.reverse();

  return (
    <>
      {myEventItems.length > 0 ? (
        myEventItemsOrder.filter((item) => item.userId === blogUserId)
          .map((item: EventItem, idx: number) => {
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString();
            return (
              <Row style={{ marginTop: 10 }} key={idx}>
                <Col lg={3} xs={3}>
                <div className='d-flex justify-content-end'>
                  <EditEventModal blogId={item.id}/>
                  </div>
                  <img className="smallProfileIMG" src={props.picture} alt={item.publishedName} />
                  {formattedDate}
                </Col>
               
                <Col lg={9} xs={9}>
                  <div className="eventTextArea">
                    <Row>
                      <Col lg={12} className="d-flex justify-content-start">
                        <p className="profileFontPadding">{item.publishedName} Created an Open mat {item.eventDate} at {item.time}</p>
                      </Col>
                      <Col className="d-flex justify-content-start">
                        <p className="profileFontPadding">  </p>
                      </Col>
                    </Row>
                    <Row className="text-center">
                      <p title={item.address}>{item.academyName}</p>
                      <p></p>
                    </Row>
                  </div>
                </Col>
              </Row>
            )
          })
      ) : (
        <div>Loading...</div>
      )}
    </>
  );


}
