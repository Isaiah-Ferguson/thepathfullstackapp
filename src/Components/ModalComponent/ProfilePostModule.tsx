
import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { loggedInData, getUserInfoByID, addBlogItem } from '../../DataServices/DataServices';
import { Form } from 'react-bootstrap';
import UserContext from '../../UserContext/UserContext';

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
  const [disableButton, setDisableButton] = useState(true)

  const handlePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDescription(e.target.value)
  }

  useEffect(() => {
    setDisableButton(true)
  },[disableButton])

  const HandleSubmit = () => {
    setDisableButton(false);
    if(postDescription === ""){
      console.log('test')
      return
    }
    async function CreatePostFunction() {
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
      await addBlogItem(blogData);
      data.setShouldReload(true);
      setDisableButton(true);
    }
    CreatePostFunction();
    setPostDescription("")
    handleClose();
  }


  return (
    <>
      <div className="postTextDiv">
        <img className="smallProfileIMGPost" src={props.picture} />
        <Form.Control onClick={handleShow} type="text" placeholder="What is on your mind?" readOnly/>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton style={{backgroundColor: '#F0D9FF'}}>
          <Modal.Title >Post</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#F0D9FF'}}><textarea placeholder="What are your thoughts?" style={{ borderRadius: 5, height: 100, width: '100%', backgroundColor: 'rgb(253, 244, 245)' }} onChange={handlePost}></textarea>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#F0D9FF'}}>
          {disableButton && <Button variant="primary" onClick={HandleSubmit}> Post </Button>}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ProfilePostModule;