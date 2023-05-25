import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { eventBlogItem } from '../../DataServices/DataServices';
import { useContext } from 'react';
import UserContext from '../../UserContext/UserContext';
import { GetAcademyList, loggedInData, getUserInfoByID } from '../../DataServices/DataServices';
import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';

interface UserInfo {
  aboutMe: string;
  id: number;
  image: string;
  academyName: string;
  firstName: string;
  lastName: string;
  publishedName: string;
  username: string;
  belt: string;
}

export default function ModalComponent() {
  const data = useContext<any>(UserContext);
  const [selectedHour, setSelectedHour] = useState<string>('12:00 AM');
  const [selectedDay, setSelectedDay] = useState("1");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [blogDiscription, setBlogDescription] = useState('');
  const [blogId, setBlogId] = useState(0);
  const [viewable, setViewable] = useState("Private");
  const [disableButton, setDisableButton] = useState(true)
  const [show, setShow] = useState(false);

  const [userInfo, setUserInfo] = useState<UserInfo>({
    aboutMe: "",
    id: 0,
    image: "",
    academyName: "",
    firstName: "",
    lastName: "",
    publishedName: "",
    username: "",
    belt: ""
  });
  const [academy, setAcademy] = useState(userInfo.academyName);

  // ---------------DATE and TIME Variables AND FUNCTIONS-------------------------
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const Event = require("../../assets/EventIcon.png");

  useEffect(() => {
    const getAcademy =async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : loggedInData();
      let userInfoItems = await getUserInfoByID(loggedIn.userId);
      setUserInfo(userInfoItems);
    }
    getAcademy();
  }, [data.shouldReload]);

  const handleSubmit = async () => {
    async function handleOpenMat() {
      const academyQ = await GetAcademyList(academy);
      const userNames = loggedInData();
      let userInfoItems = await getUserInfoByID(userNames.userId);
      const eventdate = selectedDay + ", " + selectedMonth;
      const eventData = {
        Id: blogId,
        UserId: userNames.userId,
        Date: new Date,
        publishedName: userNames.publisherName,
        academyName: academyQ.name,
        time: selectedHour,
        eventDate: eventdate,
        address: academyQ.address,
        description: blogDiscription,
        type: viewable,
        isPublish: true,
        isDeleted: false,
        image: userInfoItems.image
      }
      await eventBlogItem(eventData);
      data.setEventReload(true);
      setDisableButton(true);

    }
    handleOpenMat();
    handleClose();
  }


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setViewable(event.target.value) };
  const handleAcademy = (event: React.ChangeEvent<HTMLSelectElement>) => { setAcademy(event.target.value); };
  const handleDecription = (event: React.ChangeEvent<HTMLTextAreaElement>) => { setBlogDescription(event.target.value); };
  const handleMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedMonth(event.target.value); };
  const handleDaySelect = (event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedDay(event.target.value); };
  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedHour(event.target.value); };

  return (

    <>
      <Button variant="warning" onClick={handleShow}><img className="eventButton" src={Event} /></Button>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className='moduleBG'>
          <Modal.Title >Create Open Mat</Modal.Title>
        </Modal.Header >
        <Modal.Body className='moduleBG'>
          <Row>
            <Col md xs={12} className="mobileMargin">
              <FloatingLabel controlId="floatingSelectGrid" label="Select Location">
                <Form.Select aria-label="Floating label select example" value={academy} onChange={handleAcademy}>
                  <option value={userInfo.academyName}>{userInfo.academyName}</option>
                </Form.Select>
              </FloatingLabel></Col>
          </Row>
          <Row>
            {/*--------------------- MONTH /  DATE DROPDOWN----------- */}
            <Col lg={7}><Form.Group>
              <Form.Label>Select a date:</Form.Label>
              <div className="d-flex">
                <Form.Select className="px-2" value={selectedMonth} onChange={handleMonthSelect}>
                  {months.map((month) => (<option key={month} value={month}>{month}</option>))}
                </Form.Select>
                <Form.Select value={selectedDay} onChange={handleDaySelect}>
                  {days.map((day) => (<option key={day} value={day.toString()}>{day}</option>))}
                </Form.Select>
              </div>
            </Form.Group></Col>

            {/*------------------ TIME DROPDOWN-------------- */}

            <Col lg={5}><Form.Label>Select Time:</Form.Label>
              <Form.Select value={selectedHour} onChange={handleHourChange}>
                {hours.map((hour) => (
                  <option key={hour} value={(hour % 12 || 12) + ':00 ' + (hour < 12 ? 'AM' : 'PM')} >
                    {(hour % 12 || 12)}:00 {hour < 12 ? 'AM' : 'PM'}
                  </option>
                ))}
              </Form.Select></Col>
          </Row>
          <Row>
            <Form>
              <Form.Label>Select Privacy</Form.Label>
              <Form.Select value={viewable} onChange={handleChange}>
                <option value="Private">Private Open Mat (Friends Only)</option>
                <option value="Public">Public Open Mat</option>
              </Form.Select>
            </Form>
          </Row>
          <textarea style={{ marginTop: '15px' }} className='textArea' placeholder='Enter Event Description' onChange={handleDecription}></textarea>

        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly moduleBG'>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          {disableButton &&<Button variant="primary" onClick={handleSubmit}>
            Create Open Mat
          </Button>}

        </Modal.Footer>
      </Modal>
    </>
  );
}