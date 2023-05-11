import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import UserContext from '../../UserContext/UserContext';
import { loggedInData, getEventItemsByUserId, checkToken} from '../../DataServices/DataServices';
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
  const data = useContext<any>(UserContext);
  const [blogUserId, setBlogUserId] = useState<number | null>(null);
  const [myEventItems, setMyEventItems] = useState<EventItem[]>([]);
  const [blogPublisherName, setBlogPublisherName] = useState('');

  let navigate = useNavigate();

  useEffect(() => {
    const getLoggedInData = async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : loggedInData();
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
    data.setShouldReload(false);
  }, [data.eventReload]);

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
