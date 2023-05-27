import React from "react";
import { Col, Row, Card } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { checkToken, getMyFriendsList, getEventItemsByUserId, searchUser, eventBlogItem, getUserInfoByID } from "../../DataServices/DataServices";
import { useNavigate } from 'react-router-dom';
import UserContext from "../../UserContext/UserContext";
import JoinEventModal from "../ModalComponent/JoinEventModal";
import JoinedPersonList from "../ModalComponent/JoinPersonListModal";
import FriendEventIcon from "./FriendEventIcon";


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

export default function MainFeedEventComponent() {
  const data = useContext<any>(UserContext);
  const [friendInfo, setFriendInfo] = useState<number[]>([]);
  const [myEventItems, setMyEventItems] = useState<EventItem[]>([]);
  const [academyName, setAcademyName] = useState("")

  let navigate = useNavigate();


  useEffect(() => {
    const getLoggedInData = async () => {
      const storedValue = sessionStorage.getItem("loggedIn");
      const loggedIn = storedValue ? JSON.parse(storedValue) : data;
      const allUserData = await getMyFriendsList(loggedIn.userId);
      setFriendInfo(allUserData);
      const info = await getUserInfoByID(loggedIn.userId)
      let userEventItems = await getEventItemsByUserId(loggedIn.userId);
      setAcademyName(info.academyName)
      setMyEventItems(userEventItems.reverse());
    };

    if (!checkToken()) {
      navigate("/Login");
    } else {
      getLoggedInData();
    }
  }, []);

  const profileClick = async (publisherName: string) => {
    const searchName = await searchUser(publisherName);
    data.setName(searchName);
    navigate("/friends");
  }


  return (
    <>
      {myEventItems.length > 0 ? (
        myEventItems.filter((item: EventItem) => item.type === 'Public' || (item.type === 'Private' && friendInfo.includes(item.userId) || item.userId === data.userId || item.academyName === academyName)).map((item: EventItem, idx: number) => (

              <Card style={{marginTop: 10}}>
              <Card.Header className="d-flex justify-content-between"><span className="searchclick" onClick={() => profileClick(item.publishedName)}>{item.publishedName} <FriendEventIcon userId={item.userId}/></span><span>{item.eventDate} {item.time}</span></Card.Header>
              <Card.Body>
                <Card.Title  title={item.address} >{item.academyName}</Card.Title>
                <Card.Text>
                {item.description}
                </Card.Text>

                <Col className="d-flex justify-content-between"><JoinEventModal description={item.description} id={item.id} publishedName={item.publishedName} academyName={item.academyName} address={item.address}/> <JoinedPersonList id={item.id} /></Col>
              </Card.Body>
            </Card>
        
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
