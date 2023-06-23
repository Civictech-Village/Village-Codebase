import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchHandler } from "../utils";
import RemadePosts from "./RemadePosts";
import { createPost } from "../adapters/post-adapter";
import IssueDropDown from "./IssueDropDown";

export default function VillageBody({handleShow}) {
  const [issues, setIssues] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
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
  return (
    <div
      id="body"
      className="bodyboxes"
      style={{ flex: "2", margin: "0px 2rem", padding: "0.5rem" }}
    >
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
            ></IssueDropDown>
          );
        })}
      </div>
    </div>
  );
}
