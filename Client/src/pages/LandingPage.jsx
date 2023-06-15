import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import BackgroundImage from "../assets/Backgroundimage.jpg";
import BackgroundVideo from "../assets/BackgrounVideo.mp4";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MediaCard from "../components/Card";
import Community from '../assets/Community.jpg'
export default function LandingPage() {
  return (
    <>
      <Container
        maxWidth="infinite"
        sx={{
          height: "100%",
          backgroundSize: "cover",
          width: "100%",
          margin: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 0,
        }}
      >
        <div class="fullscreen-bg">
          <video loop muted autoPlay class="fullscreen-bg__video">
            <source src={BackgroundVideo} type="video/webm" />
          </video>
        </div>
        <Box sx={{ textAlign: "center", color: "black" }}>
          <Typography
            fontWeight="bold"
            variant="h1"
            sx={{
              color: "white",
              fontFamily: "Trebuchet MS",
              fontWeight: "bold",
              textAlign: "center",
              mb: 3,
            }}
          >
            Village
          </Typography>
          <Typography
            fontWeight="light"
            variant="h5"
            className="animate__animated animate__fadeIn animate__slow"
            sx={{
              color: "white",
              fontFamily: "Trebuchet MS",
              fontWeight: "lighter",
              textAlign: "center",
            }}
          >
            If you want to go fast go alone
          </Typography>
          <Typography
            fontWeight="light"
            variant="h5"
            className="animate__animated animate__fadeIn animate__delay-1s animate__slower"
            sx={{
              color: "white",
              fontFamily: "Trebuchet MS",
              fontWeight: "lighter",
              textAlign: "center",
            }}
          >
            If you want to go far go together
          </Typography>
        </Box>
        <Box sx={{ mt: 7 }}>
          <Link to="/sign-up">
            <Button variant="contained" sx={{ mx: 3 }}>
              Sign Up
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="contained" sx={{ mx: 3 }}>
              Log In
            </Button>
          </Link>
        </Box>
      </Container>
      {/* <Box
        style={{
          zIndex: 1000,
          backgroundColor: "lightgreen",
          height: "100%",
          width: "100%",
          borderTop: "1px solid lightgreen",
        }}
      >
        <Box sx={{ mt: 7, display: "flex", flexDirection: "row" }}>
          <MediaCard image={Community}/>
          <MediaCard image={Community}/>
          <MediaCard image={Community}/>
          </Box>
      </Box> */}
    </>
  );
}
