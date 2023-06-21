import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useEffect, useState } from "react";
import { fetchHandler } from "../utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { deleteOptions } from "../utils";
import { getPostOptions } from "../utils";
import CommentModal from "./CommentModal/CommentModal";
export default function HomeCard({ props, openModal }) {
  const [hasliked, setHasLiked] = useState(false);
  const [like, setLikes] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchHandler("/api/like/" + props.post_id);
      const hasLiked = await fetchHandler("/api/hasliked/" + props.post_id);
      setLikes(result);
      setHasLiked(hasLiked[0]);
    };
    fetch();
  }, [hasliked]);

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

  const handleClick = async () => {
    const result = await fetchHandler(
      "/api/like/" + props.post_id,
      getPostOptions()
    );
    setHasLiked(!hasliked);
    return result;
  };
  const handleDelete = async () => {
    const result = await fetchHandler(
      "/api/destroylike/" + props.post_id,
      deleteOptions
    );
    setHasLiked(!hasliked);
    return result;
  };

  return (
    <div
      className="card"
      style={{
        borderRadius: "8px",
        height: "480px",
        width: "500px",
        marginTop: "5em",
        boxShadow: "0px 12px 24px rgba(34, 34, 34, 0.12)",
        padding: "13px",
        display: "flex",
      }}
    >
      <img
        src={props.image ? props.image : "https://via.placeholder.com/350x150"}
        style={{ width: "100%", height: "50%" }}
        className="card-img-top"
        alt="..."
      />
      <div
        className="card-body"
        style={{ padding: "0", paddingTop: "10px", height: "100%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              listStyle: "none",
              padding: "0",
              height: "fit-content",
            }}
          >
            <li
              style={{
                margin: "0 10px",
                borderRadius: "90px",
                backgroundColor: "#D11036",
                width: "fit-content",
                display: "flex",
                justifyContent: "center",
                color: "white",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Issue
            </li>
            {/* <li
              style={{
                margin: "0 10px",
                borderRadius: "90px",
                backgroundColor: "#808080",
                width: "fit-content",
                display: "flex",
                justifyContent: "center",
                color: "white",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Infrastructure
            </li> */}
          </ul>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <img
              className="profilePic"
              style={{ width: "40px", height: "40px", marginBottom: "3px" }}
              src={
                props.profile_pciture
                  ? props.profile_pciture
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              }
            ></img>
            <h5>{props.username ? props.username : "undefined"}</h5>
            <p>
              {props.created_at
                ? getTimeDifferenceString(props.created_at)
                : "undefined"}
            </p>
          </div>
        </div>
        <h5 className="card-title"> {props.name ? props.name : "undefined"}</h5>
        <p className="card-text">
          {props.message ? props.message : "undefined"}
        </p>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "12px" }}>
            {hasliked ? (
              <FavoriteIcon onClick={handleDelete} />
            ) : (
              <FavoriteBorderIcon
                onClick={handleClick}
                sx={{ marginRight: "5px" }}
              />
            )}
            {like}
          </div>
          <div>
            <ChatBubbleOutlineIcon
              type="button"
              onClick={openModal}
              style={{ marginRight: "3px" }}
            />
            {0}
          </div>
        </div>
      </div>
    </div>
  );
}
