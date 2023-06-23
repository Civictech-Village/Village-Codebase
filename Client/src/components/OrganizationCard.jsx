import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";

export default function OrganizationCard({village}) {
  return (
    <div style={{ borderBottom: "2px solid #E5E7EB", marginBottom:"2em" }}>
      <div
        className="card mb-3"
        style={{
          width: "760px",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={village.image}
              style={{
                width: "300px",
                height: "200px",
                backgroundSize: "cover",
                objectFit: "cover",
              }}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h6 className="card-title"> {village.location}</h6>
              <h5 className="card-title"> {village.name}</h5>
              <p className="card-text">
                *Possible Village Bio*
              </p>
              <p className="card-text">
                <Link
                  to={"/organizations/" + village.village_id}
                  style={{
                    textDecoration: "none",
                    borderBottom: "2px solid black",
                  }}
                >
                  <button className="btn btn-success">View More</button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* <Card sx={{ width: 345, display: "inline-block", margin: 2 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={village.image}
            alt="City "
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {village.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {village.location}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card> */
