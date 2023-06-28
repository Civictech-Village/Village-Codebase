import { useEffect, useState } from "react";
import * as React from 'react';
import OrganizationCard from '../components/OrganizationCard';

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
        backgroundColor: "white",
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
          <h1>Welcome {currentUser && currentUser.username}</h1>
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
      <HomePage />

      <Footer style={{ marginTop: "100px" }} />
    </div>
  );
}


function HomePage() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [Organizations, setOrganizations] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  useEffect(() => {
    const fetchOrganizations = async() => {
     const result =  await getAllVillages()
     setOrganizations(result)
    } 
    fetchOrganizations()
  }, [open, setOpen])
  console.log(Organizations.splice(3))
  
  return (
    <div style={{ display: 'flex', padding: '2% 1%' }}>
      <div style={{ flex: '1', marginRight: '10px', marginLeft: '20px' }}>
        <h2 style={{ marginTop: '10%', color: 'black' }}>Most Popular Villages:</h2>
        {Organizations.map((organization, index) => (
          <OrganizationCard
            key={index}
            village={organization}
            style={{ width: '50px' }} // Adjust the width as needed
          />
        ))}
      </div>
      <Bio />
    </div>
  );
}     
 
  
  function Bio() {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
        <div style={{ backgroundColor: '#f7f7f8', borderRadius: '15%', marginLeft: '10%', marginRight: '10%', padding: '200px 20px 2px 40px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', marginTop: '150px', marginBottom: '80px'}}>
          <p style={{ marginBottom: '20%' }}>
            We aim to serve local community members who either just wish to stay in the know about what their community is experiencing or those who want to let their fellow community members know what issues they are experiencing.
          </p>
          <p>Come together as a community, develop a Village</p>
          <Link to={'/organizations'}>
            <button style={{ marginTop: '10px', backgroundColor: '#b2f1d5', marginLeft: '30%', padding: '10px 30px', borderRadius: '25px', color: 'white', border: 'none' }}>
              Start a Village
            </button>
            <p style={{ textAlign: 'center', marginTop: '5%' }}>OR</p>
            <button style={{ marginTop: '10px', backgroundColor: '#b2f1d5', marginLeft: '30%', padding: '10px 30px', borderRadius: '25px', color: 'white', border: 'none' }}>
              Join a Village
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  
  
  // function NYC() {
  //   return ( 
  //     <div style={}>
  //       <img src="" alt="" />
  //     </div>
  //   )
  // }
  
  
  
  
  
  
  function App() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, sethasMore] = useState(true);
    const [activeTab, setActiveTab] = useState("popular");
    const [show, setShow] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
  
    const handleClose = () => {
      setShow(false);
    };
    const handleShow = (post) => {
      setSelectedPost(post);
  
      setShow(true);
    };
  
    const [loading, setLoading] = useState(false);
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  
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
      const doFetch = async () => {
        const posts = await fetchHandler(`/api/popularPost?page=${page}&limit=5`);
        if (posts[0]) {
          setPosts(posts[0]);
          setPage(page + 5);
        }
      };
      doFetch();
    }, []);
  
    const fetchMoreData = async () => {
      setLoading(true);
      const updated = await fetchHandler(`/api/popularPost?page=${page}&limit=5`);
      if (updated[0]) {
        if (updated[0].length === 0) {
          sethasMore(false);
          setLoading(false);
          return;
        }
        setPosts((prevPosts) => [...prevPosts, ...updated[0]]);
        setPage((prevPage) => prevPage + 5);
        setLoading(false);
      }
    };
  
    const handleMyVillage = async () => {
      const posts = await fetchHandler("/api/myVillagePost");
      if (posts[0]) {
        setPosts(posts[0]);
      }
      console.log(posts);
      setActiveTab("myVillage");
    };
  
    const handlePopular = async () => {
      const posts = await fetchHandler(`/api/popularPost?page=${0}&limit=5`);
      if (posts[0]) {
        setPosts(posts[0]);
      }
      setActiveTab("popular");
    };
  
    return (
      <div style={{backgroundColor:'#b2f1d5', backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", objectFit: 'fill', backdropFilter: 'blur(10px)', height:"", display:'flex', alignItems:'center', flexDirection:'column',justifyContent:'center'}}>
        <HomePage />
        {/* <Bio /> */}
      </div>
    );
  }
  