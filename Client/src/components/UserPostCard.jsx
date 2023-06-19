import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useEffect, useState } from "react";
import { fetchHandler } from "../utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { deleteOptions, getPostOptions } from "../utils";
export default function UserPostCard({ props, isCurrentUserProfile, handlePostDestroy }) {
  const [hasliked, setHasLiked] = useState(false);
  const [like, setLikes] = useState(0);

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

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchHandler("/api/like/" + props.post_id);
      const hasLiked = await fetchHandler("/api/hasliked/" + props.post_id);
      setLikes(result);
      setHasLiked(hasLiked[0]);
    };
    fetch();
  }, [hasliked]);

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
      style={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        borderBottom: "0.7px solid rgba(3, 2, 41, 0.4)",
        paddingBottom: "18px",
        marginTop:'100px'
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex" }}>
          <img
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              marginRight: "20px",
            }}
            src={
              props && props.profile_picture
                ? props.profile_picture
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            }
          />
          <div>
            <h5>{props && props.username ? props.username : "null"}</h5>
            <p>
              {props && props.created_at
                ? getTimeDifferenceString(props.created_at)
                : "undefined"}
            </p>
          </div>
        </div>
        {isCurrentUserProfile && (
          <div className="dropdown">
            <MoreHorizIcon
              className="dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            />
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li>
                <a className="dropdown-item" href="#">
                  Edit
                </a>
              </li>
              <li>
                <a className="dropdown-item" onClick={props && handlePostDestroy(props.post_id)}>
                  Delete
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div style={{ width: "100%" }}>
        <img
          style={{ width: "100%", borderRadius: "10px" }}
          src={
            props && props.image ? props.image : "https://via.placeholder.com/350x150"
          }
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          paddingTop: "10px",
        }}
      >
        <h5 style={{ marginRight: "15px" }}>{props && props.name}</h5>
        <p>{props && props.message}</p>
      </div>
      <div style={{ display: "flex" }}>
        {hasliked ? (
          <FavoriteIcon onClick={handleDelete} sx={{ marginRight: "5px" }} />
        ) : (
          <FavoriteBorderIcon
            onClick={handleClick}
            sx={{ marginRight: "5px" }}
          />
        )}
        {like}
        <ChatBubbleOutlineIcon sx={{ margin: "0 10px" }} />
        {0}
      </div>
    </div>
  );
}
