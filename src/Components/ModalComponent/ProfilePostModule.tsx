
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { loggedInData, getUserInfoByID, updateBlogItem, addBlogItem } from '../../DataServices/DataServices';
import { Form } from 'react-bootstrap';
import UserContext from '../../UserContext/UserContext';



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

  type pictureprops = {
  picture: string;
}
 function ProfilePostModule(props: pictureprops) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [blogId, setBlogId] = useState(0);
  const [postDescription, setPostDescription] = useState("");
  const data = useContext<any>(UserContext);

  const handlePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDescription(e.target.value)
  }



  const createPost = () => {
    const testing = async () => {

      const userNames = loggedInData();
      let userInfoItems = await getUserInfoByID(userNames.userId);
      const blogData = {
        Id: blogId,
        UserId: userNames.userId,
        Date: new Date,
        title: userNames.publisherName,
        publishedName: userNames.publisherName,
        description: postDescription,
        isPublish: true,
        isDeleted: false,
        image: userInfoItems.image
      }
      addBlogItem(blogData);
    }
    testing();
    data.setShouldReload(true);
    handleClose();
  }


  return (
    <>

<div className="postTextDiv">
      <img className="smallProfileIMGPost" src={props.picture} />
      <Form.Control onClick={handleShow} type="text" placeholder="What is on your mind?" />
    </div>
  
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post</Modal.Title>
        </Modal.Header>
        <Modal.Body><textarea placeholder="What are your thoughts?" style={{ borderRadius: 5, height: 100, width: '100%' }} onChange={handlePost}></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={createPost}> Post </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfilePostModule;