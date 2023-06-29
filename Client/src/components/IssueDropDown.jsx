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



  return (
    <div
      className="item"
      style={{ backgroundColor: "white", borderRadius: "1rem", width:'100%' }}
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
                  handleOpen(issue);
                }}
              >
                Create Post
              </button>
            )}
           
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
      <div className={selected === i ? "contentshow" : "content"} style={{display:'flex', alignItems:'center', flexDirection:'column'}}>
        {posts.length > 0 ? (
          posts.map((elem) => (
            <RemadePosts elem={elem} handleShow={handleShow}></RemadePosts>
          ))
        ) : (
          <div style={{width:'100%', textAlign:'center'}}>
            <h5>Sorry, there are no posts underneath this issue</h5>
            <h5>Be the first to post!</h5>
          </div>
        )}
      </div>
    </div>
  );
}
