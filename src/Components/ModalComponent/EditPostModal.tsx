import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

 function EditPostModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const edit = require('../../assets/draw.png')

  return (
    <>
      <Button  variant="light" onClick={handleShow}>
      <img className='editPostButton' src={edit}/>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Test Post</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Delete Post
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditPostModal;