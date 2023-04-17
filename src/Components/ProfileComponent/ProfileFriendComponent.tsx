import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'

export default function ProfileFriendComponent() {
    const profile = require('../../assets/DefaultProfilePicture.png');

  return (

        <Col><Container className="friendDiv "><img className="friendProfile" src={profile}/><p className="friendName">Friend Name 1</p></Container></Col>
  )
}
