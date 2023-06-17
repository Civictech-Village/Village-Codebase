import { Box, Container, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import BackgroundImage from "../assets/Backgroundimage.jpg";
import BackgroundVideo from "../assets/BackgrounVideo.mp4";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MediaCard from "../components/Card";
import Community from "../assets/Community.jpg";
import Hero from "../components/LandingPage/Hero";
import Featured from "../components/LandingPage/FeaturedOrgs";
import FeaturesSection from "../components/LandingPage/FeaturesSection";
import Footer from "../components/LandingPage/Footer";
export default function LandingPage() {
  return (
    <div style={{width:'100%'}}>
      <div style={{ backgroundColor: "#F5F5F5", paddingBottom:'7em' }}>
        <Hero />
      </div>
      <div style={{ backgroundColor: "#b2f1d5", width:'100%' }}>
        <Featured />
      </div>
      <div style={{ backgroundColor: "#F5F5F5", width:'100%' }}>
        <FeaturesSection />
      </div>
      <div style={{ backgroundColor: "#b2f1d5", width:'100%' }}>
        <Footer />
      </div>
    </div>
  );
}
