import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import { Button, Box } from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";

function BackgroundVillage({
  props,
  name,
  userId,
  location,
  handler,
  userJoined,
  leaveHandle,
  image,
  members
}) {
  console.log(image)
  return (
    <Card
      sx={{
        display: "flex",
        height: "35%",
        width: { xs: "100%", md: "90%", lg: "70%" },
        flexDirection: "row",
        justifyContent: "center",
        alignItems:"center",
        borderRadius: "10px",
        mb: 7,
        position: "relative",
      }}
    >
      <div style={{}}>
      {image ? (<CardMedia
          component="img"
          sx={{width:"400px", objectFit:"cover",height:"265px"}}
          image={image}
          alt="placeHolder"
        />
      ) : (
        <p>Loading...</p>
      )}
      </div>
      <CardContent
        sx={{
          flexGrow: 1,
          padding: "0 0 0 0",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography component="h1" variant="h3" sx={{ mb: 2 }}>
            {name}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {location}
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" gutterBottom sx={{ mr: 4 }}>
              {members} Members
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <>
            {!userJoined ? (
              <Button
                variant="contained"
                sx={{ height: "fit-content", backgroundColor: "green" }}
                onClick={handler}
              >
                Join
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ height: "fit-content", backgroundColor: "red" }}
                onClick={leaveHandle}
              >
                Leave
              </Button>
            )}
          </>
        </Box>
      </CardContent>
    </Card>
  );
}

export default BackgroundVillage;
