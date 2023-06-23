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
import Footer from "../components/LandingPage/Footer";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [villages, setVillages] = useState([]);
  const [errorText, setErrorText] = useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [brightness, setBrightness] = useState("100%");
  const [className, setClassname] = useState("NotActive");

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

  useEffect(() => {
    const doFetch = async () => {
      const villages = await fetchHandler("/api/villageUser/" + id);
      console.log(villages);
      if (villages[0]) {
        setVillages(villages[0]);
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
      const updatedPosts = await fetchHandler("/api/userPosts/" + id);
      const newPosts = posts.filter((elem) => {
        console.log(elem, updatedPosts);
        if (elem.post_id !== updatedPosts[0].post_id) {
          return elem;
        }
      });
      console.log(updatedPosts[0]);

      setPosts(updatedPosts[0]);
    } catch (error) {
      // Handle error if deletion or refetch fails
      console.error(error);
      return null;
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

  console.log(userProfile);
  return (
    <div
      style={{
        width: "100%",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
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
          <div
            id="ProfilePicture"
            style={{
              backgroundImage: `url(${
                userProfile && userProfile.profilePicture
                  ? userProfile.profilePicture
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              })`,
            }}
          ></div>
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
              {currentUser && currentUser.gender
                ? currentUser.gender
                : "Undefined"}
            </h6>
            <h6
              className="ContactText"
              style={{ padding: "16px 0", borderBottom: "0.5px solid #030229" }}
            >
              <CakeIcon />{" "}
              {currentUser && currentUser.birthday
                ? date(currentUser.birthday)
                : "Undefined"}
            </h6>
            <h6
              className="ContactText"
              style={{ padding: "16px 0", borderBottom: "0.5px solid #030229" }}
            >
              <LocationOnIcon /> Location
            </h6>
            <h6 className="ContactText" style={{ padding: "16px 0" }}>
              <EmailIcon />{" "}
              {currentUser && currentUser.email
                ? currentUser.email
                : "Undefined"}
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
          <div
            style={{
              display: "flex",
              width: "100%",
              padding: "20px 43px",
              flexDirection: "column",
            }}
          >
            {posts.map((elem) => {
              console.log(elem);
              return (
                <UserPostCard
                  props={elem}
                  isCurrentUserProfile={isCurrentUserProfile}
                  handlePostDestroy={handlePostDestroy}
                />
              );
            })}
          </div>
        </div>
        <div id="villageSection">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
              flexDirection: "column",
              padding: "10px",
              textAlign: "center",
            }}
          >
            <h3 style={{ borderBottom: "1px solid black" }}>
              {!isCurrentUserProfile ? "Their" : "Your"} Village's
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {villages.map((elem) => {
                console.log(elem);
                return (
                  <Link to={`/organizations/` + elem.village_id} style={{
                    width: "100%",
                    height: "100%",
                    textDecoration:'none'
                  }}>
                    <div
                      onMouseEnter={(e) => {
                        setClassname("slide-in-blurred-top");
                        setBrightness("50%");
                      }}
                      onMouseLeave={(e) => {
                        setClassname("NotActive");
                        setBrightness("100%");
                      }}
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <div
                        className="villageProfileImage"
                        style={{
                          position: "absolute",
                          backgroundImage: `url(${elem.image})`,
                          filter: `brightness(${brightness})`,
                        }}
                      >
                        {" "}
                      </div>
                      <div
                        className={className}
                        style={{
                          color: "white",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                        }}
                      >
                        <p>{elem.name}</p>
                        <p
                          style={{
                            borderBottom: "10px solid white",
                            width: "fit-content",
                            textAlign: "center",
                          }}
                        >
                          {elem.location}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "100%", marginTop: "20px" }}>
        <Footer />
      </div>
    </div>
  );
}
