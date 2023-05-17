import React from "react";
import { Button, Col, Row, Modal, Dropdown, NavLink, NavItem, NavDropdown } from "react-bootstrap";
import { useState, useEffect, useContext, } from "react";
import {
  checkToken,
  getMyFriendsList,
  getEventItemsByUserId,
  updateEventItem,
  joinEvent,
} from "../../DataServices/DataServices";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserContext/UserContext";
import JoinEvent from '../ModalComponent/EventJoin'


interface EventItem {
  participants: any;
  id: number;
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

export default function MainFeedEventComponent( ) {
  const data = useContext<any>(UserContext);
  const [friendInfo, setFriendInfo] = useState<number[]>([]);
  const [prevJoinedUsers, setJoinedUsers] = useState("Join");
  const [myEventItems, setMyEventItems] = useState<EventItem[]>([]);
  const profile = require("../../assets/DefaultProfilePicture.png");
  const [blogUserId, setBlogUserId] = useState<number | null>(null);
  const [blogPublisherName, setBlogPublisherName] = useState("");
  const [joined, setJoined] = useState(false);
  const [blogId, setBlogId] = useState<number | null>(null);
  const [userId, setUserId] = useState(1);
  const [show, setShow] = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let navigate = useNavigate();

  // const [isOpen, setIsOpen] = useState(false);

  // function toggleModal() {
  //     setIsOpen(!isOpen);
  //   }

  const handleJoin = async (eventId: number, otherUserId: number) => {
    try {
      // Make a fetch request to join the event
      const response = await fetch(`https://thepathapi.azurewebsites.net/joinevent/joinevent/${eventId}/${otherUserId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: data.userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to join the event.');
      }

      // Add the joined user IDs to the array of joinedUsers
      const joinedUserIds: any = [data.userId, otherUserId];

      setJoinedUsers(prevJoinedUsers => prevJoinedUsers.concat(joinedUserIds));

      // Close the modal popup
      handleClose();
      joinEvent(userId, eventId );
    } catch (error) {
      console.error('Error joining event:', error);
      // Handle the error case, display an error message, etc.
    }
  };




  useEffect(() => {
    const getLoggedInData = async () => {
      const storedValue = sessionStorage.getItem("loggedIn");
      const loggedIn = storedValue ? JSON.parse(storedValue) : data;
      setUserId(loggedIn.userId);
      const allUserData = await getMyFriendsList(loggedIn.userId);
      setFriendInfo(allUserData);
      setBlogUserId(loggedIn.userId);
      setBlogPublisherName(loggedIn.publisherName);
      let userEventItems = await getEventItemsByUserId(loggedIn.userId);
      console.log(userEventItems);
      setMyEventItems(userEventItems.reverse());
    };

    if (!checkToken()) {
      navigate("/Login");
    } else {
      getLoggedInData();
    }
  }, []);





  return (
    <>
      {myEventItems.length > 0 ? (
        myEventItems
          .filter(
            (item: EventItem) =>
              item.type === "Public" ||
              (item.type === "Private" &&
                (friendInfo.includes(item.userId) ||
                  item.userId === data.userId))
          )
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
              <JoinEvent eventId = {item.id}/>

                <div style={{ float: 'right', border: 'none' }}>
                  <button
                    onClick={toggleModal}
                    style={{ outline: 'none', border: 'none', backgroundColor: 'bisque', textDecorationLine: 'underline' }}
                  >
                    Joined Users
                  </button>

                  <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Joined Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
                {/* <Button onClick={()=>console.log(item[""])}>{join}</Button> */}
              </Col>

            </Row>
          ))
      ) : (
        <>
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
        </>
      )}
    </>
  );

}
