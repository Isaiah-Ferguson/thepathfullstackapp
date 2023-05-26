import React, { useState, useEffect, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import UserContext from '../../UserContext/UserContext';
import { GetAcademyList, loggedInData, getUserInfoByID, updateEventItem } from '../../DataServices/DataServices';
import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';

type ChildProps = {
    blogId: number;
  }

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

export default function EditEventModal(props: ChildProps) {
  const data = useContext<any>(UserContext);
  const [selectedHour, setSelectedHour] = useState<string>('12:00 AM');
  const [selectedDay, setSelectedDay] = useState("1");
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [blogDiscription, setBlogDescription] = useState('');
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
  const [viewable, setViewable] = useState("Private");
  const [show, setShow] = useState(false);


  // ---------------DATE and TIME Variables AND FUNCTIONS-------------------------
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  useEffect(() => {
    const getAcademy =async () => {
      const storedValue = sessionStorage.getItem('loggedIn');
      const loggedIn = storedValue ? JSON.parse(storedValue) : loggedInData();
      let userInfoItems = await getUserInfoByID(loggedIn.userId);
      setUserInfo(userInfoItems);
      setAcademy(userInfoItems.academyName)
    }
    getAcademy()
  }, []);

 
    const handleOpenMat = async () => {
      const academyQ = await GetAcademyList(academy);

      const userNames = loggedInData();
      let userInfoItems = await getUserInfoByID(userNames.userId);
      const eventdate = selectedDay + ", " + selectedMonth;
      const eventData = {
        Id: props.blogId,
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
      await updateEventItem(eventData);
      data.setEventReload(true);
      handleClose();
    }

    const handleDelete = async () => {
      const academyQ = await GetAcademyList(academy);

      const userNames = loggedInData();
      let userInfoItems = await getUserInfoByID(userNames.userId);
      const eventdate = selectedDay + ", " + selectedMonth;
      const eventData = {
        Id: props.blogId,
        UserId: userNames.userId,
        Date: new Date,
        publishedName: userNames.publisherName,
        academyName: academyQ.name,
        time: selectedHour,
        eventDate: eventdate,
        address: academyQ.address,
        description: blogDiscription,
        type: viewable,
        isPublish: false,
        isDeleted: true,
        image: userInfoItems.image
      }
      await updateEventItem(eventData);
      data.setEventReload(true);
      handleClose();
    }


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setViewable(event.target.value) };
  const handleDecription = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setBlogDescription(e.target.value); };
  const handleMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedMonth(event.target.value); };
  const handleDaySelect = (event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedDay(event.target.value); };
  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedHour(event.target.value); };

  return (

    <>
      <div className='postEditDev' onClick={handleShow}>...</div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className='moduleBG'>
          <Modal.Title >Edit Open Mat</Modal.Title>
        </Modal.Header >
        <Modal.Body className='moduleBG'>
          <Row>
            <Col md xs={12} className="mobileMargin">
              <FloatingLabel controlId="floatingSelectGrid" label="Select Location">
                <Form.Select aria-label="Floating label select example" value={academy}>
                <option value={userInfo.academyName}>{userInfo.academyName}</option>
                </Form.Select>
              </FloatingLabel></Col>
          </Row>
          <Row>
            {/*--------------------- MONTH /  DATE DROPDOWN----------- */}
            <Col lg={6}><Form.Group>
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

            <Col lg={6}><Form.Label>Select Time:</Form.Label>
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
                <option value="Private">In House Open Mat</option>
                <option value="Public">Public Open Mat</option>
              </Form.Select>
            </Form>
          </Row>
          <textarea style={{ marginTop: '15px' }} className='textArea' placeholder='Enter Event Description' onChange={handleDecription}></textarea>

        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly moduleBG'>
          <Button variant="secondary" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleOpenMat}>
            Save Changes
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}