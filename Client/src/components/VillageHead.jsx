import { useEffect, useState, useContext } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CurrentUserContext from "../contexts/current-user-context";
import { deleteOptions, fetchHandler, getPostOptions, serializeFormData } from "../utils";
import { createIssue } from "../adapters/issue-adapter";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function VillageHead({
  village,
  members,
  handler,
  userJoined,
  leaveHandle,
}) {
  const { id } = useParams();
  const { currentUser } = React.useContext(CurrentUserContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleIssueSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const postObject = Object.fromEntries(data.entries());
    createIssue(postObject, id);
    handleClose();
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        className="cover_img"
        style={{
          backgroundImage: `url(${village.image})`,
          width: "100%",
          borderRadius: "6px",
          height: "500px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        alt={"img"}
      ></div>
      <div
        className="Details bodyboxes"
        style={{
          backgroundColor: "white",
          padding: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1>{village.name}</h1>
          <h5>{village.location}</h5>
        </div>
        <div style={{ padding: "30px" }}>
          <button
            className="buttn"
            onClick={handleOpen}
            style={{ marginRight: "1rem" }}
          >
            New Issue
          </button>
          {!userJoined ? (
            <button className="buttn" style={{}} onClick={handler}>
              Follow
            </button>
          ) : (
            <button className="btn btn-danger" onClick={leaveHandle}>
              Unfollow
            </button>
          )}
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="ui form" onSubmit={handleIssueSubmit}>
            <div className="four fields" widths="equal">
              <div className="field ui fluid">
                <label>Issue Name</label>
                <input type="text" name="name" placeholder="Name" />
              </div>
              <div style={{ marginBottom: "1rem" }} className="field ui fluid">
                <label>Issue Desc</label>
                <input
                  type="text"
                  name="issue_desc"
                  placeholder="Description"
                />
              </div>
            </div>
            <button className="ui button" type="submit">
              Submit
            </button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
