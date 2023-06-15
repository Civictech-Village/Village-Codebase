import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';


export default function Example({ handleShow, handleClose, show }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <Form>
            <Form.Label htmlFor="Input">
            Name
            </Form.Label>
            <Form.Control type="text" />
            <Form.Label htmlFor="Input">Issue</Form.Label>
            <Form.Select>
                <option>*Put Issue*</option>
            </Form.Select>
            <Form.Label htmlFor="Input">Description</Form.Label>
            <Form.Control type="text" />
            <br />
            <Button type="submit">Post</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
