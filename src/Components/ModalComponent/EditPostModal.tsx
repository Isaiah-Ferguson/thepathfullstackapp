import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { loggedInData, getUserInfoByID, updateBlogItem } from '../../DataServices/DataServices';
import UserContext from '../../UserContext/UserContext';

type ChildProps = {
  blogId: number;
}
 function EditPostModal(props: ChildProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [postDescription, setPostDescription] = useState("");
  const data = useContext<any>(UserContext);

  const handlePost = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDescription(e.target.value)
  }


    const EditPost = async () => {

      const userNames = loggedInData();
      let userInfoItems = await getUserInfoByID(userNames.userId);
      const blogData = {
        Id: props.blogId,
        UserId: userNames.userId,
        Date: new Date,
        title: userNames.publisherName,
        publishedName: userNames.publisherName,
        description: postDescription,
        isPublish: true,
        isDeleted: false,
        image: userInfoItems.image
      }
      await updateBlogItem(blogData);
      data.setShouldReload(true);
      handleClose();
    }


    const handleDelete = async () => {
      const userNames = loggedInData();
      let userInfoItems = await getUserInfoByID(userNames.userId);
      const blogData = {
        Id: props.blogId,
        UserId: userNames.userId,
        Date: new Date,
        title: userNames.publisherName,
        publishedName: userNames.publisherName,
        description: postDescription,
        isPublish: false,
        isDeleted: true,
        image: userInfoItems.image
      }
      const deletePost = async (item: object) => {
         updateBlogItem(item);
      }
      await deletePost(blogData);
      data.setShouldReload(true);
      handleClose();
    }




  return (
    <>
      <div className='postEditDev' onClick={handleShow}>
      ...
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body><textarea placeholder="Regret what you posted? Lets change it!" style={{ borderRadius: 5, height: 100, width: '100%' }} onChange={handlePost}></textarea></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDelete}>
            Delete Post
          </Button>
          <Button variant="primary" onClick={EditPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPostModal;