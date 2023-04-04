import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import { Textarea } from 'react-bootstrap-icons'

export default function MainFeedComponent() {

    const profileIMG = require('../../assets/DefaultProfilePicture.png')

  return (
    <div>

        <br/>
        <br/>

        <Row>
            <Col lg={3} xs={3}>
                <img className='mainFeedImg' src={profileIMG}/>
            </Col>
            <Col lg={5} xs={9}>
            <textarea placeholder="What are your thoughts?" style={{ borderRadius: 5, height: 100, width: '100%' }}></textarea>
            <Row className="d-flex justify-content-end"><Col lg={2} xs={2}><button className='profilePostButton'>Post</button></Col></Row>
            </Col>
            
            <Col lg={3} ><Container className='eventMainPageDiv'>
                <Row>
                <Col md={3}>
Date
            </Col>
            <Col md={8}>
Test
            </Col>
            </Row>
                </Container></Col>
        </Row>

    
    </div>
  )
}
