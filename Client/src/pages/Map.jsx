import { useState, useEffect } from "react";
import ReactMapGL , { Marker }from "react-map-gl";
import { getAllVillages } from "../adapters/organizations-adapter";
import config from "../../config";
import { Link } from "react-router-dom";
const MapContainer = () => {
    const [villages, setVillages] = useState([])
    useEffect(() => {
        const fetchOrganizations = async () => {
          const result = await getAllVillages();
          setVillages(result);
          console.log(result)
        };
        fetchOrganizations();
      }, []);

    const [viewport, setViewport] = useState({
        latitude: 40.7128,
        longitude: -74.0060,
        width: "100%",
        height: "100%",
        zoom: 10,
    });
    return (
        <div style={{width: "90vw", height: "100vh"}}>
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
                    return(
                    <Marker key={village.village_id} latitude={village.latitude} longitude={village.longitude}>
                        <Link to={`../organizations/${village.village_id}`}>
                            <img style={{width:"30px"}}src="https://res.cloudinary.com/ddj0t5srx/image/upload/v1687789695/map-marker-svgrepo-com_mwrsul.svg"></img>  
                        </Link>
                    </Marker>
                  )
 
                })}
            </ReactMapGL>
        </div>
    )
};

export default MapContainer;
