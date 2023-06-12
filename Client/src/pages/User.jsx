import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import React from "react";
import Box from "@mui/material/Box";
import { Typography, Grid, CssBaseline, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BackgroundHeader from "../components/BackgroundHeader";
import CakeIcon from "@mui/icons-material/Cake";
import PostsProfile from "../components/PostsComponent";
import {Divider} from "@mui/material";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [errorText, setErrorText] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);
  console.log(currentUser);
  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setErrorText(error.statusText);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
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
    id
  }
  return (
    <>
      <Grid container component="main" sx={{ height: "100vh", width:"100%" }}>
        <CssBaseline />
        <Grid
          item
          component={Paper}
          square
          sx={{
            backgroundColor: "#5DBB63",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <BackgroundHeader props={propObject} />

          <Grid
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width:{xs:"100%",md:"100%",lg:"85%"},
              height: "50%",
            }}
          >
            <Box
              md={3}
              elevation={6}
              sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "space-between",
                height: "68%",
                width: "250px",
                padding: "43px 0px 49px 24px",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h5" sx={{fontWeight:"bold"}}>About</Typography>
              <Box
                sx={{
                  height: "90%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  mt: 2,
                  paddingBottom:"40px"
                }}
              >
                <Typography
                  component="h4"
                  sx={{
                    borderBottom: "1px solid black",
                    padding: "12px 0",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <PersonIcon sx={{ mr: 1 }}></PersonIcon>
                  {currentUser.gender ? currentUser.gender : "Unknown"}
                </Typography>
                <Typography
                  component="h4"
                  sx={{
                    borderBottom: "1px solid black",
                    padding: "12px 0",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <CakeIcon sx={{ mr: 1 }}></CakeIcon>
                  {currentUser.birthday ? currentUser.birthday : "Unknown"}
                </Typography>
                <Typography
                  component="h4"
                  sx={{
                    borderBottom: "1px solid black",
                    display: "flex",
                    width: "100%",
                    padding: "12px 0",
                  }}
                >
                  <LocationOnIcon sx={{ mr: 1 }}></LocationOnIcon>
                  Location
                </Typography>
                <Typography
                  component="h4"
                  sx={{
                    borderBottom: "1px solid black",
                    padding: "12px 0",
                    display: "flex",
                    width: "100%",
                  }}
                >
                  <EmailIcon sx={{ mr: 1 }}></EmailIcon>
                  {currentUser.email ? currentUser.email : "Unknown"}
                </Typography>
                <Typography
                  component="h4"
                  sx={{ display: "flex", width: "100%", padding: "12px 0" }}
                >
                  <PhoneIcon sx={{ mr: 1 }}></PhoneIcon>
                  Phone
                </Typography>
              </Box>
            </Box>
            <PostsProfile></PostsProfile>
            <Box
              md={3}
              sx={{
                backgroundColor: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "40%",
                width: "200px",
                borderRadius: "10px",
                padding:"10px 0px",
                textAlign:'center',
                mt:6
              }}
            >
              <Typography variant="h5" sx={{width:"100%", borderBottom:"1px solid black", paddingBottom:"5px", fontWeight:"bold"}}>Their Villages</Typography>
            </Box>
          </Grid>

          {!!isCurrentUserProfile && (
            <button onClick={handleLogout}>Log Out</button>
          )}

          {!!isCurrentUserProfile && (
            <UpdateUsernameForm
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
}
