import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function Example({ fetchPosts, handleClose, show, tab, fetch, issues }) {
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {tab === "Posts" ? <Modal.Title>Create A Post</Modal.Title> :<Modal.Title>Create A Issue</Modal.Title> }
        </Modal.Header>
        <Modal.Body>
          {" "}
          {tab === "Posts" ? (
            <Form onSubmit={fetchPosts}>
              <Form.Label htmlFor="Input">Posts</Form.Label>
              <Form.Select name="issue" onChange={(e) => {console.log(e.target.value)}}>
                {issues.map(elem => {
                  return <option key={elem.issue_id} value={elem.issue_id}>{elem.name}</option>
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
