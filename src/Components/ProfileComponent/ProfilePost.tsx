import React from "react";
import { Col, Row, Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import  {GetPublishedBlogItem, checkToken, loggedInData, addBlogItem, getBlogItemsByUserId, updateBlogItem} from "../../DataServices/DataServices";
import EditPostModal from "../ModalComponent/EditPostModal";
import { useNavigate } from 'react-router-dom';


interface BlogItem {
  date: string;
  id: number;
  image: string;
  isDeleted: false;
  isPublished: false;
  publishedName: string;
  description: string;
  title: string;
  userid: number;
  // Other properties of a BlogItem
}

interface LoggedIn {
  userId: string;
  publisherName: string;
  // Add any other properties from the loggedIn object if necessary
}


export default function ProfilePost() {
    const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
    const profile = require('../../assets/DefaultProfilePicture.png');

    const [blogTitle, setBlogTitle] = useState('');
    const [blogImage, setBlogImage] = useState('');
    const [blogDiscription, setBlogDescription] = useState('');
    const [blogCategory, setBlogCategory] = useState('');
    const [blogTags, setBlogTags] = useState('');
    // const [blogItems, setBlogItems] = useState([]);
    const [blogId, setBlogId] = useState(0);
    const [blogUserId, setBlogUserId] = useState<number | null>(null);
    const [blogPublisherName, setBlogPublisherName] = useState('');

    let navigate = useNavigate();


    // useEffect(() => {
    //   const fetchData = async () => {
    //     let res = await GetPublishedBlogItem();
    //     setBlogItems(res);
    //   };
    //   fetchData();
    //   console.log(blogItems)
    // }, []);

    useEffect(() => {

      const getLoggedInData = async () => {
        const loggedIn = loggedInData();
        console.log(loggedIn);
        // setBlogUserId(loggedIn.userId);
        // setBlogPublisherName(loggedIn.publisherName);
        // let userBlogItems = await getBlogItemsByUserId(loggedIn.userId);
        setBlogUserId(2);
        setBlogPublisherName('test1');
        let userBlogItems = await getBlogItemsByUserId(2);
        console.log(userBlogItems);
        setBlogItems(userBlogItems);
      };
  
      if (!checkToken()) {
        navigate('/Login');
      } else {
        // Get user Data and blog Items
        getLoggedInData();
      }
    }, []);

      



  return (
    <>
    {blogItems.length > 0 ?
      blogItems.map((item: BlogItem, idx: number) => (
        <Row key={idx} style={{marginTop: 10}}>
          <Col lg={3} xs={3}>
            <img className="smallProfileIMG" src={profile} alt="profile" />
            {item.publishedName}
          </Col>
          <Col lg={1} xs={1} style={{height: 40}} className='d-flex justify-content-evenly'>
            <EditPostModal/>
          </Col>
          <Col lg={8} xs={8}>
            <div className="textArea">{item.description}</div>
          </Col>
        </Row>
      )) : <div>Loading...</div>
    }
  </>
  )
}
