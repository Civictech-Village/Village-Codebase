import PostCards from "./PostCards";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchHandler } from "../utils";
import { getPostOptions } from "../utils";
import { useEffect, useState } from "react";
import { deleteOptions } from "../utils";
export default function RemadePosts({ elem }) {
  const [like, setLikes] = useState(0);
  const [hasliked, setHasLiked] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      const result = await fetchHandler("/api/like/" + elem.post_id);
      const hasLiked = await fetchHandler("/api/hasliked/" + elem.post_id);
      setLikes(result);
      setHasLiked(hasLiked[0]);
    };
    fetch();
  }, [hasliked]);
  const handleClick = async () => {
    const result = await fetchHandler(
      "/api/like/" + elem.post_id,
      getPostOptions()
    );
    setHasLiked(!hasliked);
    return result;
  };
  const handleDelete = async () => {
    const result = await fetchHandler(
      "/api/destroylike/" + elem.post_id,
      deleteOptions
    );
    setHasLiked(!hasliked);
    return result;
  };

  function getTimeDifferenceString(givenTime) {
    const givenTimestamp = new Date(givenTime).getTime();
    const currentTimestamp = Date.now();
    const timeDifference = Math.floor(
      (currentTimestamp - givenTimestamp) / 1000 / 60
    ); // Convert to minutes
    if (timeDifference < 60) {
      return timeDifference + " minutes ago";
    } else {
      const hoursDifference = Math.floor(timeDifference / 60);
      return hoursDifference + " hours ago";
    }
  }

  return (
    <div
      id="single-post"
      style={{
        padding: "2rem",
        border: "0.1rem solid black",
        borderRadius: "1rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div id="userinfo" style={{ display: "flex" }}>
          <img
            src="https://res.cloudinary.com/ddj0t5srx/image/upload/v1687093019/Screenshot_2023-04-24_205656_qojx4t.png"
            alt="Pfp"
            style={{ width: "8rem", height: "8rem", borderRadius: "50%" }}
          />
          <div>
            <h1>{elem.username}</h1>
            <h5>
              {" "}
              {elem.created_at
                ? getTimeDifferenceString(elem.created_at)
                : "undefined"}
            </h5>
          </div>
        </div>
        <div id="options" style={{ padding: "2rem" }}>
          <i className="material-icons">more_horiz</i>
        </div>
      </div>
      <div id="post-body">
        <div style={{ margin: "1rem 0px" }}>
          <img
            style={{ width: "100%" }}
            src="https://res.cloudinary.com/ddj0t5srx/image/upload/v1686773178/samples/landscapes/architecture-signs.jpg"
            alt=""
          />
        </div>
        <div id="caption">
          <p>
            <strong>{elem.username}</strong>: {elem.message}{" "}
          </p>
        </div>
        <div id="heartsandcomments" style={{ display: "flex" }}>
          {hasliked ? (
            <FavoriteIcon onClick={handleDelete} />
          ) : (
            <FavoriteBorderIcon
              onClick={handleClick}
              sx={{ marginRight: "5px" }}
            />
          )}
          <p style={{ marginRight: "1rem" }}>{like}</p>
          <i className="material-icons">add_comment</i>
          <p style={{ marginRight: "1rem" }}>{0}</p>
        </div>
      </div>
    </div>
  );
}
