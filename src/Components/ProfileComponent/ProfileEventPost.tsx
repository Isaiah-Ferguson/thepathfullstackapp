import React from 'react'
import { Row, Col } from 'react-bootstrap'

export default function ProfileEventPost() {
  const profile = require('../../assets/DefaultProfilePicture.png');

  return (
    <Row style={{marginTop: 10}}>
    <Col lg={3} xs={3}> <img className="smallProfileIMG"  src={profile} /> </Col>
    <Col lg={9} xs={9}> 
    <div className="eventTextArea">

        <Row >
        <Col lg={12} className="d-flex justify-content-start"> <p  className="profileFontPadding">Created an Open mat</p> </Col>
            <Col className="d-flex justify-content-start"> <p  className="profileFontPadding">3/4/2023 at 6PM</p></Col>
        </Row>

        <Row className="text-center"> <p>Concepcion Academy of Martial Arts</p> </Row>
      </div>
    </Col>
  </Row>
  )
}
