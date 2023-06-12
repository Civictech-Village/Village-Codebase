import Box from "@mui/material/Box";
import { Typography, Grid, CssBaseline, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import BackgroundHeader from "../components/BackgroundHeader";
import CakeIcon from "@mui/icons-material/Cake";

function PostsProfile({ props }) {
  return (
    <Box
      md={6}
      sx={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        height: "60%",
        width: "700px",
        borderRadius: "10px",
        textAlign:"center",
        padding:'30px 0'
      }}
    >
      <Typography variant="h5" sx={{width:"100%", borderBottom:"1px black solid", paddingBottom:"1rem", fontWeight:"bold"}}>Posts</Typography>
    </Box>
  );
}

export default PostsProfile;
