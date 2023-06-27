import { fetchHandler, getPostOptions, deleteOptions } from "../utils";
import React, { useRef, useContext } from "react";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import PostCards from "../components/PostCards";
import MemberCard from "../components/MemberCard";
import BackgroundVillage from "../components/BackgroundVillages";
import Example from "../components/Modal";
import BasicExample from "../components/NavTabs";
import { useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import Badge from "react-bootstrap/Badge";
import { Navigate } from "react-router-dom";

export default function OrgLayoutPage() {
  //Village
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImages] = useState(false);
  const [userJoined, setUserJoined] = useState(false);
  const [tab, setTab] = useState("Posts");
  const [show, setShow] = useState(false);
  const [issues, setIssues] = useState([]);
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userType, setUserType] = useState(null)
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  console.log(currentUser);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let { id } = useParams();
  useEffect(() => {
    const doFetch = async () => {
      const responseData = await fetchHandler("/api/villages/" + id);
      console.log(responseData);
      if (responseData[0]) {
        const { name, location, image } = responseData[0];
        setName(name);
        setLocation(location);
        setImages(image);
      }
    };

    doFetch();
  }, []);

  useEffect(() => {
    const doFetch = async () => {
      const responseData = await fetchHandler("/api/issues/" + id);
      console.log(responseData);
      if (responseData[0]) {
        setIssues(responseData[0]);
      }
    };
    doFetch();
  }, []);

  const handleJoin = async () => {
    const responseData = await fetchHandler(
      "/api/villages/" + id,
      getPostOptions()
    );
    console.log(responseData);
    setUserJoined(true);
    const arr = [...members];
    if (!members.includes(userData[0].username)) {
      arr.push(userData[0].username);
      setMembers(arr);
    }
  };

  const handleIssuesTab = async () => {
    setTab("Posts");
    console.log(tab);
  };

  const handlePostTab = async () => {
    setTab("Issues");
    console.log(tab);
  };

  useEffect(() => {
    const doFetch = async () => {
      const responseData = await fetchHandler("/api/postsVillage/" + id);
      console.log(responseData);
      if (responseData[0]) {
        setPosts(responseData[0]);
      }
    };
    doFetch();
  }, []);

  const handlePostCreate = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    const issue_id = e.target.issue.value;
    const responseData = await fetchHandler(
      "/api/posts/" + id,
      getPostOptions({ message, issue_id })
    );
    const arr = [...posts];
    arr.push(responseData[0]);
    setPosts(arr);
    console.log(responseData);
    handleClose();
  };

  const handleLeave = async () => {
    const responseData = await fetchHandler(
      "/api/villages/" + id,
      deleteOptions
    );
    console.log(responseData);
    setUserJoined(false);
  };

  //Members
  const handleIssuesCreate = async (e) => {
    e.preventDefault();
    const responseData = await fetchHandler(
      "/api/issues/" + id,
      getPostOptions({ name: e.target.name.value })
    );
    console.log(responseData);

    const arr = [...issues];
    arr.push(responseData[0]);
    setIssues(arr);
    handleClose();
  };

  useEffect(() => {
    const doFetch = async () => {
      const responseData = await fetchHandler("/api/villageget/" + id);
      if (responseData) {
        console.log(responseData);
        if (responseData[0]) {
          setUserJoined(true);
          setUserType(responseData[0].user_type)
          const userData = await getUser(responseData[0]["user_id"]);
          console.log(userData);
          const arr = [...members];
          if (!members.includes(userData[0].username)) {
            arr.push(userData[0].username);
            setMembers(arr);
          }
        }
      }
    };

    doFetch();
  }, []);

  setTimeout(() => {
    if (!currentUser) return <Navigate to="/" />;
  }, 500);

  return (
    <div style={{ backgroundColor: "#FFF9E3", height: "100vh" }}>
      <div style={{ width: "100%", justifyContent: "center", display: "flex" }}>
        <BackgroundVillage
          name={name}
          location={location}
          handler={handleJoin}
          leaveHandle={handleLeave}
          userJoined={userJoined}
          image={image}
          members={members.length}
          userType={userType}
        />
      </div>
      <Example
        handleClose={handleClose}
        issues={issues}
        show={show}
        tab={tab}
        fetch={handleIssuesCreate}
        fetchPosts={handlePostCreate}
      />
      <div
        style={{
          display: "flex",
          maxHeight: "600px",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            maxHeight: "800px",
            marginLeft: "100px",
          }}
        >
          <BasicExample
            handleIssues={handleIssuesTab}
            handlePost={handlePostTab}
          ></BasicExample>
          {tab === "Posts" ? (
            <div
              className="posts"
              style={{
                borderRadius: "1px",
                display: "flex",
                backgroundColor: "grey",
                flexDirection: "column",
                width: "500px",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: "30px",
              }}
            >
              <h1>Posts</h1>
              {userJoined && (
                <Button variant="contained" onClick={handleShow}>
                  Create Post
                </Button>
              )}
              <div style={{ overflowY: "scroll", maxHeight: "300px" }}>
                {posts.map((elem) => (
                  <PostCards elem={elem} />
                ))}
              </div>
            </div>
          ) : (
            <div
              className="issues"
              style={{
                borderRadius: "1px",
                display: "flex",
                backgroundColor: "grey",
                flexDirection: "column",
                width: "50%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: "20px",
                paddingBottom: "30px",
              }}
            >
              <div style={{ marginBottom: "30px", textAlign: "center" }}>
                <h1>Issues</h1>
                {userJoined && (
                  <Button variant="contained" onClick={handleShow}>
                    Create Issue
                  </Button>
                )}
              </div>
              <div
                style={{
                  paddingTop: "10px",
                  maxHeight: "120px",
                  overflowY: "scroll",
                  border: "1px solid black",
                }}
              >
                {issues.map((elem) => {
                  return (
                    <Badge bg="danger" style={{ margin: "0 5px" }}>
                      {elem.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div
          className="members"
          style={{ textAlign: "center", marginRight: "100px" }}
        >
          <h1>Members</h1>
          {/* <h2>{members.username}</h2>
        <img src="{members.profile_picture}" alt="" /> */}
          {members.map((elem) => {
            return <MemberCard key={elem.id} name={elem} />;
          })}
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            Show More
          </Button>
        </div>
      </div>
    </div>
  );
}
