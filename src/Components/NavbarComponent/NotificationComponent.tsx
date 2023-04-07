import React from 'react';
import { Row, Col, Button } from "react-bootstrap";
const profile= require("../assets/DefaultProfilePage");

export default function NotificationComponent() {
  return (
    <Row className="NotificationDiv2">
                  <Col lg={4} xs={4}>
                    <img className="NotificationImg" src={profile}/>
                  </Col>
                  <Col lg={8} xs={8}>
                    <p>Busby has sent a Friends request</p>
                    <Button style={{marginRight: 20}}>Accept</Button><Button variant="danger">Decline</Button>
                  </Col>
                </Row>
  )
}
