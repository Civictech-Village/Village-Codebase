import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function OrganizationCard(village) {
  console.log(village.village)
  return (
    <Link to={'/organizations/' + village.village.village_id}>
      <Card sx={{ width: 345, display: "inline-block", margin: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={`src/images/${village.village.image}`}
            alt="City "
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {village.village.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {village.village.location}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      </Link>
  );
}
