import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHandler } from "../utils";
import RemadePosts from "./RemadePosts";
import { createPost } from "../adapters/post-adapter";
import IssueDropDown from "./IssueDropDown";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
export default function VillageBody({handleShow, userJoined}) {
  const [issues, setIssues] = useState([]);
  const [open, setOpen] = useState(false);
  const [issueID, setIssue] = useState(null);

  const handleOpen = (issue) => {
    console.log(issue)
    setOpen(true);
    setIssue(issue)
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [selected, setSelected] = useState(null);
  const { id } = useParams();

  const fetchIssues = async () => {
    const result = await fetchHandler(`/api/issues/${id}`);
    setIssues(result[0]);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(issueID.issue_id, id);
    createPost(data, Number(id), issueID.issue_id);
    handleClose();
  };
  return (
    <div
      id="body"
      className="bodyboxes"
      style={{ flex: "2"}}
    >
       <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form className="ui form" onSubmit={handleSubmit}>
                  <div className="" widths="equal">
                    <div className="field ui fluid">
                      <label></label>
                      <input type="file" name="image" placeholder="Name" />
                    </div>
                    <div
                      style={{ marginBottom: "1rem" }}
                      className="field ui fluid"
                    >
                      <label>Message</label>
                      <input type="text" name="message" placeholder="Name" />
                    </div>
                  </div>
                  <button className="ui button" type="submit">
                    Submit
                  </button>
                </form>
              </Box>
            </Modal>
      <div id="Issue" style={{}}>
        {issues.map((issue, i) => {
          console.log(issue.issue_id)

          return (
            <IssueDropDown
              key={i}
              open={open}
              issue={issue}
              id={id}
              handleOpen={handleOpen}
              handleClose={handleClose}
              selected={selected}
              toggle={toggle}
              i={i}
              handleShow={handleShow}
              userJoined={userJoined}
            ></IssueDropDown>
          );
        })}
      </div>
    </div>
  );
}
