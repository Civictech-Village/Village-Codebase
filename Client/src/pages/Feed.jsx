import { useEffect, useState } from "react";
import {
  createVillage,
  getAllVillages,
} from "../adapters/organizations-adapter";
export default function Feed() {
    const [lat, setLat] = useState(null)
    const [lon, setLon] = useState(null)
      const [Organizations, setOrganizations] = useState([]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            // Geolocation is supported
            navigator.geolocation.getCurrentPosition(
              position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
          
                // Do something with the latitude and longitude values
                console.log("Latitude:", latitude);
                setLat(latitude)
                console.log("Longitude:", longitude);
                setLon(longitude)
              },
              error => {
                // Error occurred while retrieving location
                console.error("Error getting location:", error.message);
              }
            );
          } else {
            // Geolocation is not supported
            console.error("Geolocation is not supported by this browser.");
          }
    },[])

    useEffect(() => {
        const fetchOrganizations = async () => {
          const result = await getAllVillages();
          setOrganizations(result);
          console.log(result)
        };
        fetchOrganizations();
      }, []);

    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
      
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
      
        return distance;
      }
      
      function toRadians(degrees) {
        return degrees * (Math.PI / 180);
      }

      const villages = [
        { name: 'Village A', latitude: 37.7894, longitude: -122.4156 },
        { name: 'Village B', latitude: 37.7825, longitude: -122.4183 },
        { name: 'Village C', latitude: 37.7970, longitude: -122.4029 },
        // Add more villages here
      ];
      
      // Calculate distances to each village
      const distances = Organizations.map(village => ({
        name: village.name,
        distance: calculateDistance(lat, lon, village.latitude, village.longitude),
      }));

      distances.sort((a, b) => a.distance - b.distance);

    
    return(
        <div>
        </div>
    )
}