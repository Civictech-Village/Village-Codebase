import { useEffect, useState } from "react";
import {
  createVillage,
  getAllVillages,
} from "../adapters/organizations-adapter";
import SearchBar from "../components/NavBar";
import Avatar from "../components/Avatar";
import Footer from "../components/LandingPage/Footer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { useContext } from "react";
export default function Feed() {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [Organizations, setOrganizations] = useState([]);
  const [sorted, setSorted] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useContext(CurrentUserContext);
  console.log(currentUser);

  useEffect(() => {
    if (!currentUser) {
      // Redirect to the landing page after a delay
      const redirectTimer = setTimeout(() => {
        navigate("/landingpage");
      }, 500);

      return () => {
        // Clear the timer if the component is unmounted
        clearTimeout(redirectTimer);
      };
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Geolocation is supported
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;

          // Do something with the latitude and longitude values
          console.log("Latitude:", latitude);
          setLat(latitude);
          console.log("Longitude:", longitude);
          setLon(longitude);
        },
        (error) => {
          // Error occurred while retrieving location
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      // Geolocation is not supported
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  useEffect(() => {
    const fetchOrganizations = async () => {
      const result = await getAllVillages();
      setOrganizations(result);
      console.log(result);
      // Calculate distances to each village
    };
    fetchOrganizations();
  }, []);

  useEffect(() => {
    const distances = Organizations.map((village) => ({
      name: village.name,
      image: village.image,
      villageId: village.village_id,
      distance: calculateDistance(
        lat,
        lon,
        Number(village.latitude),
        Number(village.longitude)
      ),
    }));

    distances.sort((a, b) => b.distance - a.distance);
    setSorted(distances.slice(0, 3));
    console.log(sorted);
  }, [Organizations]);

  //   <div className="carousel-item">
  //   <img
  //     src="https://via.placeholder.com/350x150"
  //     className="d-block w-100"
  //     alt="..."
  //   />
  // </div>

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: "#f5f5f5",
        width: "100%",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          height: "fit-content",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <SearchBar />
        <Avatar />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          flexGrow: "1",
          marginBottom: "3em",
        }}
      >
        <div className="d-flex justify-content-start w-100 px-5 mb-5">
          <h3>Welcome {currentUser && currentUser.username}</h3>
        </div>
        <div>
          <h3>Recommended Villages</h3>
        </div>
        {lat && lon ? (
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide w-75"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner d-flex align-items-center">
              {sorted.map((elem, i) => {
                console.log(elem);
                if (i == 0) {
                  return (
                    <div
                      className="carousel-item active"
                      style={{ width: "100%" }}
                      onClick={() =>
                        navigate("/organizations/" + elem.villageId)
                      }
                    >
                      <div className="card">
                        <img
                          src={elem.image}
                          style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            height: "auto",
                          }}
                          className="card-img-top"
                          alt="..."
                        />
                        <div className="carousel-caption d-none d-md-block">
                          <h5>{elem.name}</h5>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="carousel-item" style={{ width: "100%" }}>
                      <img
                        src={elem.image}
                        alt={elem.name}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "600px%",
                          minWidth: "90%",
                          height: "auto",
                        }}
                      />
                      <div class="carousel-caption d-none d-md-block">
                        <h5>{elem.name}</h5>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              height: "250px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1>"Could not display this data"</h1>
          </div>
        )}
      </div>
      <Footer style={{ marginTop: "100px" }} />
    </div>
  );
}
