import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import UserContext from '../../UserContext/UserContext';
import { loggedInData, getEventItemsByUserId, checkToken } from '../../DataServices/DataServices';
import EditEventModal from '../ModalComponent/EditEventModal';
import JoinedPersonList from '../ModalComponent/JoinPersonListModal';
import EditPostModal from '../ModalComponent/EditPostModal';
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

  let navigate = useNavigate();

  useEffect(() => {
    const getLoggedInData = async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : loggedInData();
      setBlogUserId(loggedIn.userId);
      let userEventItems = await getEventItemsByUserId(loggedIn.userId);
      userEventItems.reverse()
      setMyEventItems(userEventItems);
    };

    if (!checkToken()) {
      navigate('/Login');
    } else {
      getLoggedInData();
    }
    data.setShouldReload(false);
  }, [data.eventReload]);


  return (
    <>
      {myEventItems.length > 0 ? (
        myEventItems.filter((item) => item.userId === blogUserId)
          .map((item: EventItem, idx: number) => {
            const date = new Date(item.date);
            const formattedDate = date.toLocaleDateString();
            return (
              <Card style={{marginTop: 10}}>
              <Card.Header className="d-flex justify-content-between"><span className="searchclick">{item.publishedName}</span><span>{item.eventDate} {item.time}  <EditEventModal blogId={item.id} /></span></Card.Header>
              <Card.Body>
                <Card.Title  title={item.address} >{item.academyName}</Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>
                <Col className="d-flex justify-content-between"> <JoinedPersonList id={item.id} /> <div>Posted {formattedDate}</div></Col>
              </Card.Body>
            </Card>
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
