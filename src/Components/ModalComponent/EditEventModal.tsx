import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useContext } from 'react';
import UserContext from '../../UserContext/UserContext';
import { GetAcademyList, loggedInData, getUserInfoByID, updateEventItem } from '../../DataServices/DataServices';
import { Row, Col, FloatingLabel, Form } from 'react-bootstrap';

type ChildProps = {
    blogId: number;
  }

export default function EditEventModal(props: ChildProps) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const data = useContext<any>(UserContext);

  const [blogTitle, setBlogTitle] = useState('');;
  const [blogDiscription, setBlogDescription] = useState('');
  const [academy, setAcademy] = useState("");
  const [viewable, setViewable] = useState("Select Privacy");

  const [show, setShow] = useState(false);

  // ---------------DATE and TIME Variables AND FUNCTIONS-------------------------
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

 
    const handleOpenMat = async () => {
      const academyQ = await GetAcademyList(academy);

      const userNames = loggedInData();
      let userInfoItems = await getUserInfoByID(userNames.userId);
      setSelectedDate(selectedDay + ", " + selectedMonth);
      console.log(selectedDay, selectedMonth);
      const eventData = {
        Id: props.blogId,
        UserId: userNames.userId,
        Date: new Date,
        publishedName: userNames.publisherName,
        academyName: academyQ.name,
        time: selectedHour,
        eventDate: selectedDate,
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


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setViewable(event.target.value) };
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => { setBlogTitle(e.target.value); };
  const handleAcademy = (e: React.ChangeEvent<HTMLSelectElement>) => { setAcademy(e.target.value); };
  const handleDate = (e: React.ChangeEvent<HTMLSelectElement>) => { setSelectedDate(e.target.value); };
  const handleDecription = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setBlogDescription(e.target.value); };
  const handleMonthSelect = (event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedMonth(event.target.value); };
  const handleDaySelect = (event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedDay(event.target.value); };
  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => { setSelectedHour(event.target.value); };

  return (

    <>
      <div className='postEditDev' onClick={handleShow}>...</div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton className='moduleBG'>
          <Modal.Title >Create Open Mat</Modal.Title>
        </Modal.Header >
        <Modal.Body className='moduleBG'>
          <Row>
            <Col md xs={12} className="mobileMargin">
              <FloatingLabel controlId="floatingSelectGrid" label="Select Location">
                <Form.Select aria-label="Floating label select example" value={academy} onChange={handleAcademy}>
                  <option value="">Select Your Academy</option>
                  <option value="Andre de Freitas Brazilian Jiu-Jitsu">Andre de Freitas Brazilian Jiu-Jitsu</option>
                  <option value="Ares BJJ Stockton - Buffalo Black Brotherhood">Ares BJJ Stockton - Buffalo Black Brotherhood</option>
                  <option value="VALOR Training Center">VALOR Training Center</option>
                  <option value="Inside BJJ Academy">Inside BJJ Academy</option>
                  <option value="Stockton JiuJitsu Academy">Stockton JiuJitsu Academy</option>
                  <option value="Stockton Dominate MMA">Stockton Dominate MMA</option>
                  <option value="Nick Diaz Academy">Nick Diaz Academy</option>
                  <option value="10th Planet Stockton">10th Planet Stockton</option>
                  <option value="TEAM CAMA">TEAM CAMA</option>
                  <option value="Ronin Jiu Jitsu">Ronin Jiu Jitsu</option>
                  <option value="Ernie Reyes West Coast Martial Arts">Ernie Reyes West Coast Martial Arts</option>
                  <option value="Strive Jiu Jitsu & Fitness Academy">Strive Jiu Jitsu & Fitness Academy</option>
                  <option value="JG ACADEMY - MANTECA">JG ACADEMY - MANTECA</option>
                  <option value="JG ACADEMY - LODI">JG ACADEMY - LODI</option>
                  <option value="Cortez Full Circle Martial Arts">Cortez Full Circle Martial Arts</option>
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
                <option value="In House Open Mat">In House Open Mat</option>
                <option value="public">Public Open Mat</option>
              </Form.Select>
            </Form>
          </Row>
          <textarea style={{ marginTop: '15px' }} className='textArea' placeholder='Enter Event Description' onChange={handleDecription}></textarea>

        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-evenly moduleBG'>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleOpenMat}>
            Create Open Mat
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  );
}