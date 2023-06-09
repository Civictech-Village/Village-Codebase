import { useState, useEffect } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { getAllVillages } from "../adapters/organizations-adapter";
import config from "../../config";
import { Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { Margin } from "@mui/icons-material";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const MapContainer = () => {
  const [villages, setVillages] = useState([]);
  useEffect(() => {
    const fetchOrganizations = async () => {
      const result = await getAllVillages();
      setVillages(result);
      console.log(result);
    };
    fetchOrganizations();
  }, []);
  
  return (
    <div style={{ width: "90vw", height: "100vh" }}>
      <ReactMapGL
        initialViewState={{
          latitude: 40.71427,
          longitude: -74.00597,
          zoom: 12,
        }}
        mapboxAccessToken={config.mapboxAccessToken}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {villages.map((village) => {
          return (
            <Marker
              key={village.village_id}
              latitude={village.latitude}
              longitude={village.longitude}
            >
              <Link to={`../organizations/${village.village_id}`}>
                <OverlayTrigger
                  trigger={["hover", "focus"]}
                  placement="top"
                  overlay={ <Popover id="popover-positioned-top" title="Popover top">
                  <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={village.image} />
                  <Card.Body>
                    <Card.Title>{village.name}</Card.Title>
                    {/* <Card.Text>
                      Village bio
                    </Card.Text> */}
                  </Card.Body>
                </Card>
                </Popover>}
                >
                  <img
                    style={{ width: "30px" }}
                    src="https://res.cloudinary.com/ddj0t5srx/image/upload/v1687789695/map-marker-svgrepo-com_mwrsul.svg"
                  ></img>
                </OverlayTrigger>
              </Link>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
};

export default MapContainer;
