import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Example({ handleClose, show, tab, fetch, issues }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          {tab === "Posts" ? (
            <Form>
              <Form.Label htmlFor="Input">Issue</Form.Label>
              <Form.Select>
                {issues.map(elem => {
                  return <option>{elem.name}</option>
                })}
              </Form.Select>
              <Form.Label htmlFor="Input">Description</Form.Label>
              <Form.Control name="message" type="text" />
              <br />
              <Button type="submit">Post</Button>
            </Form>
          ) : (
            <Form onSubmit={fetch}>
              <Form.Label htmlFor="Input">Name</Form.Label>
              <Form.Control name="name" type="text" />
              <br />
              <Button type="submit">Create</Button>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
