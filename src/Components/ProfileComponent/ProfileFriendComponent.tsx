import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

export default function ProfileFriendComponent() {
    const profile = require('../../assets/DefaultProfilePicture.png');

  return (

        <Col lg={4} md={4} xs={6}><Container className="friendDiv ensoBGFriend"><img className="friendProfile" src={profile}/><p className="friendName">Friend Name 1</p></Container></Col>
  )
}
