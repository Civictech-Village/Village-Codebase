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
function BackgroundVillage({ props }) {
  return (
    <Card
      sx={{
        display: "flex",
        height: "35%",
        width: {xs:"100%",md: "90%",lg:"100%"},
        flexDirection: "column",
        justifyContent: "center",
        borderRadius: "10px",
        mb: 7,
        paddingBottom: "30px",
        position: "relative",
      }}
    >
      <div style={{ position: "relative" , display: "contents"}}>
        <CardMedia
          component="img"
          sx={{ width: "100%", height:"60%"}}
          image={"https://via.placeholder.com/350x150"}
          alt={"placeHolder"}
        ></CardMedia>
        <Avatar
          sx={{
            bgcolor: "orange",
            position: "absolute",
            width: 80,
            height: 80,
            top: "35%",
            left: "1.5%",
            zIndex: 1,
          }}
        >
          {props.profileUsername[0]}
        </Avatar>
       {props.currentUser && props.currentUser.id === Number(props.id) && <Button
              variant="contianed"
              sx={{
                position: "absolute",
                height: "fit-content",
                color: "black",
                top: "40%",
                left: "71.95%",
                borderColor: "green",
                border:"1px solid",
                backgroundColor:"white"
              }}
            >
              Edit Background Photo
            </Button>}
      </div>
      <CardContent
        sx={{
          flexGrow:1,
          padding: "0 0 0 0",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography component="h1" variant="h3" sx={{ mb: 2 }}>
            {props.profileUsername}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            "Fake Bio"
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" gutterBottom sx={{ mr: 4 }}>
              {0} Members
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
        
            <>
              <Button
                variant="contained"
                sx={{ height: "fit-content", backgroundColor: "green" }}
              >
                Join
              </Button>
            </>
        </Box>
      </CardContent>
    </Card>
  );
}

export default BackgroundVillage;
