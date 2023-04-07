import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import  {GetPublishedBlogItem} from "../../DataServices/DataServices";
import EditPostModal from "../ModalComponent/EditPostModal";


export default function ProfilePost() {
    const [blogItems, setBlogItems] = useState([]);
    const profile = require('../../assets/DefaultProfilePicture.png');


    useEffect(() => {
        const fetchData = async () => {
          let res = await GetPublishedBlogItem();
          setBlogItems(res);
        };
        fetchData();
        console.log(blogItems)
      }, []);

  return (

    <Row style={{marginTop: 10}}>
    <Col lg={3} xs={3}> <img className="smallProfileIMG"  src={profile} /> </Col>
    <Col lg={1} xs={1} style={{height: 40}} className='d-flex justify-content-evenly'><EditPostModal/></Col>
    <Col lg={8} xs={8}> <div className="textArea">Test</div> </Col>
  </Row>

  )
}
