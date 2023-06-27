import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import RemadePosts from "./RemadePosts";
import { createPost } from "../adapters/post-adapter";
import { useEffect, useState } from "react";
import { fetchHandler } from "../utils";
import CommentModal from "./CommentModal/CommentModal";

export default function IssueDropDown({
  issue,
  handleOpen,
  handleClose,
  selected,
  toggle,
  i,
  open,
  handleShow,
  id,
  userJoined,
}) {
  const [posts, setPosts] = useState([]);
  const [issueID, setIssue] = useState(id);

  console.log(issue, id, issue.issue_id);
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
  useEffect(() => {
    const fetchPostByissue = async () => {
      const result = await fetchHandler(`/api/posts/` + issue.issue_id);
      setPosts(result[0]);
      console.log(issue.issue_id);
      return result;
    };
    fetchPostByissue();
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(issue.issue_id, id);
    createPost(data, issue.issue_id, Number(id));
    handleClose();
  };

  return (
    <div
      className="item"
      style={{ backgroundColor: "white", borderRadius: "1rem" }}
      key={i}
    >
      <div className="title">
        <h2 style={{ maxWidth: "300px" }}>{issue.name}</h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            {userJoined && (
              <button
                className="btn btn-success"
                onClick={(e) => {
                  handleOpen();
                }}
              >
                Create Post
              </button>
            )}
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
          </div>
          <h1
            className="switch"
            style={{ fontSize: "4rem", marginLeft: "1rem" }}
            onClick={() => toggle(i)}
          >
            {selected === i ? "-" : "+"}
          </h1>
        </div>
      </div>
      <div className={selected === i ? "contentshow" : "content"}>
        {posts.map((elem) => (
          <RemadePosts elem={elem} handleShow={handleShow}></RemadePosts>
        ))}
      </div>
    </div>
  );
}
