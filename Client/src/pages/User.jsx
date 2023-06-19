import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import React from "react";
import SearchBar from "../components/NavBar";
import Avatar from "../components/Avatar";
import Person2Icon from "@mui/icons-material/Person2";
import CakeIcon from "@mui/icons-material/Cake";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import { Link } from "react-router-dom";
import UserPostCard from "../components/UserPostCard";
import { fetchHandler } from "../utils";
import { deleteOptions } from "../utils";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [errorText, setErrorText] = useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);



  const date = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const parsed = new Date(date);
    const month = parsed.getMonth();
    const day = parsed.getDay();
    const year = parsed.getFullYear();
    return `${months[month]} ${day}, ${year}`;
  };

  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

 
  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.statusText);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  useEffect(() => {
    const doFetch = async () => {
      const posts = await fetchHandler("/api/userPosts/" + id);
      if (posts[0]) {
        setPosts(posts[0]);
      }
    };
    doFetch();
  }, []);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  
  const handlePostDestroy = async (postId) => {
    try {
      await fetchHandler(`/api/posts/${postId}`, deleteOptions);
      // Refetch all posts after successful deletion
      const updatedPosts = await fetchHandler('/api/userPosts/' + id);
      setPosts(updatedPosts);
    } catch (error) {
      // Handle error if deletion or refetch fails
      console.error(error)
      return null
    }
  };

  if (!userProfile && !errorText) return null;
  if (errorText) return <p>{errorText}</p>;

  // What parts of state would change if we altered our currentUser context?
  // Ideally, this would update if we mutated it
  // But we also have to consider that we may NOT be on the current users page
  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;
  const propObject = {
    profileUsername,
    currentUser,
    isCurrentUserProfile,
    id,
  };
  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height:'100%'
      }}
    >
      <div style={{ display: "flex", width: "95%" }}>
        <SearchBar />
        <Avatar />
      </div>
      <div className="BackgroundHeader">
        <div id="backgroundImage"></div>
        <div
          id="profileandname"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div id="ProfilePicture"></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "12em",
              paddingTop: "10px",
            }}
          >
            <div id="userName">{profileUsername}</div>
            <div style={{ width: "113px", height: "23px" }}>Fake Bio</div>
            <div style={{ display: "flex" }}>
              <p style={{ margin: "0 10px 0 0" }}>{0} Following</p>
              <p>{0} Followers</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "8em",
            }}
          >
            {!isCurrentUserProfile ? (
              <button className="btn btn-success">Follow</button>
            ) : (
              <Link to="/settings" className="btn btn-outline-dark">
                Edit Profile
              </Link>
            )}
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div id="aboutSection">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              width: "236px",
              height: "307px",
              padding: "40px 0 40px 0",
            }}
          >
            <h4 id="aboutText" style={{ marginBottom: "28px" }}>
              About
            </h4>
            <h6
              className="ContactText"
              style={{
                paddingBottom: "16px",
                borderBottom: "0.5px solid #030229",
              }}
            >
              <Person2Icon />{" "}
              {currentUser && currentUser.gender ? currentUser.gender : "Undefined"}
            </h6>
            <h6
              className="ContactText"
              style={{ padding: "16px 0", borderBottom: "0.5px solid #030229" }}
            >
              <CakeIcon />{" "}
              {currentUser && currentUser.birthday ? date(currentUser.birthday) : "Undefined"}
            </h6>
            <h6
              className="ContactText"
              style={{ padding: "16px 0", borderBottom: "0.5px solid #030229" }}
            >
              <LocationOnIcon /> Location
            </h6>
            <h6 className="ContactText" style={{ padding: "16px 0" }}>
              <EmailIcon />{" "}
              {currentUser && currentUser.email ? currentUser.email : "Undefined"}
            </h6>
          </div>
        </div>
        <div id="postSection">
          <div
            id="aboutText"
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              marginTop: "3em",
              paddingBottom: "19px",
              borderBottom: "0.8px solid #030229",
            }}
          >
            <h3>Posts</h3>
          </div>
          <div style={{ display: "flex", width: "100%", padding: "20px 43px", flexDirection:'column' }}>
            {posts.map((elem) => {
              return <UserPostCard props={elem} isCurrentUserProfile={isCurrentUserProfile} handlePostDestroy={handlePostDestroy}/>;
            })}
          </div>
        </div>
        <div id="villageSection">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <h3>Their Village</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
