import { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { fetchHandler, getPostOptions } from "../../utils";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { deleteOptions } from "../../utils";
export default function CommentModal({ isOpen, closeModal, post }) {
  console.log(post);
  const [comments, setComments] = useState([]);
  const [justFetched, setjustFetched] = useState(false);
  const inputRef = useRef(null);
  const [hasliked, setHasLiked] = useState(false);
  const [like, setLikes] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const result = await fetchHandler("/api/like/" + post.post_id);
      const hasLiked = await fetchHandler("/api/hasliked/" + post.post_id);
      setLikes(result);
      setHasLiked(hasLiked[0]);
    };
    fetch();
  }, [hasliked]);

  const handleClick = async () => {
    const result = await fetchHandler(
      "/api/like/" + post.post_id,
      getPostOptions()
    );
    setHasLiked(!hasliked);
    return result;
  };
  const handleDelete = async () => {
    const result = await fetchHandler(
      "/api/destroylike/" + post.post_id,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (text.length > 1) {
      const result = await fetchHandler(
        "/api/comments/" + post.post_id,
        getPostOptions({ text })
      );
      setjustFetched(!justFetched);
    }
  };

  useEffect(() => {
    const doFetch = async () => {
      const result = await fetchHandler("/api/comments/" + post.post_id);
      if (result[0]) {
        setComments(result[0]);
      }
    };
    doFetch();
  }, [isOpen, justFetched]);

  const Comment = ({ name, message, profile, date }) => {
    return (
      <div
        style={{
          display: "flex",
          padding: "16px 16px 0 16px",
          marginBottom: "10px",
        }}
      >
        <img
          style={{
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            marginRight: "10px",
          }}
          src={
            profile
              ? profile
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          }
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <h5 style={{ marginBottom: "0", marginRight: "6px" }}>{name}</h5>
            <p style={{ marginBottom: "5px" }}>
              <small>{message}</small>
            </p>
          </div>
          <div>
            <p style={{ opacity: "0.5" }}>
              <small>{getTimeDifferenceString(date)}</small>
            </p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      {post && (
        <Modal
          show={isOpen}
          onHide={closeModal}
          centered
          contentClassName="commentsModal"
          size="xl"
        >
          <Modal.Header style={{ width: "50%", height: "100%", border: "0" }}>
            <Modal.Title
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100%",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: 0,
                  bottom: "5em",
                  left: 0,
                  height: "600px",
                  backgroundImage: `url(${post.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              >
                {/* <img
                  style={{ height: "100%", width: "100%" }}
                  src={post.image}
                /> */}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              width: "50%",
              padding: "0",
              overflow: "hidden",
              borderLeft: "1px solid black",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100%",
                borderBottom: "1px solid black",
                padding: "16px 16px 0 16px",
              }}
            >
              <img
                style={{
                  borderRadius: "50%",
                  width: "30px",
                  height: "30px",
                  marginRight: "10px",
                }}
                src={
                  post && post.profile_picture
                    ? post.profile_picture
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                }
              />
              <div>
                <h5 style={{ marginBottom: "0" }}>{post.username}</h5>
                <p style={{ marginBottom: "5px" }}>
                  <small>{post.name}</small>
                </p>
              </div>
            </div>
            <div
              id="scrollablediv"
              style={{
                maxHeight: "400px",
                minHeight: "400px",
                overflowY: "scroll",
              }}
            >
              <Comment
                name={post.username}
                message={post.message}
                profile={post.profile_picture}
                date={post.created_at}
              />
              {comments.map((elem) => {
                console.log(elem);
                return (
                  <Comment
                    name={elem.username}
                    message={elem.text}
                    profile={elem.profile_picture}
                    date={elem.created_at}
                  />
                );
              })}
            </div>
            <div
              style={{ borderTop: "1px solid black", height: "fit-content" }}
            >
              <div
                id="Iconsection"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px",
                }}
              >
                <div style={{ display: "flex" }}>
                  {hasliked ? (
                    <FavoriteIcon
                      type="button"
                      onClick={handleDelete}
                      sx={{ marginRight: "5px" }}
                    />
                  ) : (
                    <FavoriteBorderIcon
                      type="button"
                      onClick={handleClick}
                      sx={{ marginRight: "5px" }}
                    />
                  )}
                  <ChatBubbleOutlineIcon
                    onClick={() => inputRef.current.focus()}
                    type="button"
                  />
                </div>
                <div>
                  <BookmarkBorderIcon />
                </div>
              </div>
              <div id="likesSection" style={{ paddingLeft: "5px" }}>
                <p>
                  {post.likecount && like == 1
                    ? `${parseInt(like)} like`
                    : `${parseInt(like)} likes`}
                </p>
              </div>
              <div id="timeSection" style={{ paddingLeft: "5px" }}>
                <p>
                  <small>{getTimeDifferenceString(post.created_at)}</small>
                </p>
              </div>
              <div id="formSection">
                <form
                  onSubmit={handleSubmit}
                  style={{
                    marginBottom: "5px",
                    width: "100%",
                    height: "100%",
                    border: "0",
                    borderTop: "1px solid black",
                    display: "flex",
                    padding: "5px 5px 0px 5px",
                    paddingTop: "0.6em",
                    alignItems: "center",
                  }}
                >
                  <input
                    name="text"
                    ref={inputRef}
                    style={{
                      outline: "none",
                      width: "90%",
                      border: "0",
                      height: "100%",
                    }}
                    placeholder="Add a comment..."
                  />
                  <button type="submit" className="btn">
                    Post
                  </button>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
