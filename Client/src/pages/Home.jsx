import { motion, useTransform, useScroll } from "framer-motion";
import SearchBar from "../components/NavBar";
import Avatar from "../components/Avatar";
import Tabs from "../components/Tabs";
import HomeCard from "../components/HomeCard";
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchHandler } from "../utils";
import Footer from "../components/LandingPage/Footer";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentModal from "../components/CommentModal/CommentModal";
import StickyBox from "react-sticky-box";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";
import { getAllVillages } from "../adapters/organizations-adapter";
export default function HomePage() {
  const { scrollYProgress } = useScroll();
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
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const images = [
    {
      url: "/static/images/buttons/breakfast.jpg",
      title: "Breakfast",
      height: "100px",
      width: "100%",
    },
    {
      url: "/static/images/buttons/burgers.jpg",
      title: "Burgers",
      height: "100px",
      width: "100%",
    },
    {
      url: "/static/images/buttons/camera.jpg",
      title: "Camera",
      height: "100px",
      width: "100%",
    },
  ];
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [Organizations, setOrganizations] = useState([]);
  const [sorted, setSorted] = useState([]);

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

  const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: "relative",
    height: 200,
    [theme.breakpoints.down("sm")]: {
      width: "100% !important", // Overrides inline-style
      height: 100,
    },
    "&:hover, &.Mui-focusVisible": {
      zIndex: 1,
      "& .MuiImageBackdrop-root": {
        opacity: 0.15,
      },
      "& .MuiImageMarked-root": {
        opacity: 0,
      },
      "& .MuiTypography-root": {
        border: "4px solid currentColor",
      },
    },
  }));

  const ImageSrc = styled("span")({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: "cover",
    backgroundPosition: "center 40%",
  });

  const Image = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
  }));

  const ImageBackdrop = styled("span")(({ theme }) => ({
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create("opacity"),
  }));

  const ImageMarked = styled("span")(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  }));

  function ButtonBases() {
    return (
      <Box
        sx={{ display: "flex", flexWrap: "wrap", minWidth: 300, width: "100%" }}
      >
        {sorted.map((sorted) => {
          console.log(sorted)
          return (
            <ImageButton
              focusRipple
              key={sorted.name}
              style={{
                height: "100px",
                width: "100%",
                marginTop: "1.5em",
              }}
              onClick={() => {navigate('/organizations/' + sorted.villageId)}}
            >
              <ImageSrc style={{ backgroundImage: `url(${sorted.image})` }} />
              <ImageBackdrop className="MuiImageBackdrop-root" />
              <Image>
                <Typography
                  component="span"
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    position: "relative",
                    p: 4,
                    pt: 2,
                    pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                  }}
                >
                  {sorted.name}
                  <ImageMarked className="MuiImageMarked-root" />
                </Typography>
              </Image>
            </ImageButton>
          );
        })}
      </Box>
    );
  }

  const [loading, setLoading] = useState(false);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

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
    <div style={{ width: "100%", height: "100%" }}>
      <CommentModal
        isOpen={show}
        closeModal={handleClose}
        post={selectedPost}
      />

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
      <div style={{ display: "flex", marginTop: "6em" }}>
        <div
          style={{
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            height: "100%",
            marginBottom: "3em",
          }}
          id="posts"
        >
          <Tabs
            handlePopular={handlePopular}
            handleMyVillage={handleMyVillage}
            activeTab={activeTab}
          />

          {posts.length > 0 ? (
            <InfiniteScroll
              dataLength={posts.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={<h4>Loading...</h4>}
              loading={loading}
            >
              {posts.map((elem, i) => {
                return (
                  <HomeCard
                    key={i}
                    props={elem}
                    openModal={() => handleShow(elem)}
                  />
                );
              })}
            </InfiniteScroll>
          ) : (
            <p style={{ margin: "auto" }}>
              Sorry, There are no posts here for now
            </p>
          )}
        </div>
        <StickyBox offsetTop={20} style={{ height: "100%", marginTop: "9em", padding:'0 10px' }}>
          <div
            style={{
              backgroundColor: "white",
              height: "100%",
              minHeight: "100px",
              borderRadius: "8px",
              width: "100%",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <h3>Recommended Villages</h3>
            </div>
            <ButtonBases />
          </div>
        </StickyBox>
      </div>
      <Footer />
    </div>
  );
}

//Old code part two
{
  /* <div
style={{
  backgroundImage: `url("src/images/pexels-miki-czetti-111963.jpg")`,
  backgroundAttachment: "fixed",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
}}
></div>
<div
style={{
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
}}
>
<h1
  style={{
    color: "white",
    fontSize: "100px",
    textShadow: "5px 5px black",
  }}
>
  Village
</h1>
</div>
<div style={{ backgroundColor: "whitesmoke", height: "100vh" }}>
<div style={{ display: "flex", alignItems: "center" }}>

</div>
<h1>
  We aim to serve local community members who either just wish to stay
  in the know about what their community is experiencing or those who
  want to let their fellow community members know what issues they are
  experiencing.
</h1>
</div> */
}

//   return (
//     <div style={{ backgroundColor: '#b2f1d5', padding: '20px' }}>
//       <h1 style={{textAlign:'center'}}>
//         Village
//       </h1>
//       <p>
// eslint-disable-next-line max-len
//         We aim to serve local community members who either just wish to stay in the know about what their community is experiencing or those who want to let their fellow community members know what issues they are experiencing.
//       </p>
//     </div>
//   );
// }
// function NYC() {
//   return (
//     <div style={{width:"100%", display:'flex', justifyContent:'center', flexDirection:"column"}}>
// eslint-disable-next-line max-len
//     <img src= {Home} alt="/home/vinny/Development/Village-Codebase/Client/src/pages/new-york-city-evening-NYCTG0221-52492d6ccab44f328a1c89f41ac02aea.jpg" />
//     </div>
//   )
// }

// function Bio() {
//   return (
//     <div style={{ textAlign: 'center', padding: '20px' }}>
//       <p>Come together as a community, develop a Village</p>
//       <Link to={'/organizations'}>
// eslint-disable-next-line max-len
//       <button style={{ marginTop: '10px', backgroundColor: '#0d6efd', padding: '10px 30px', borderRadius: '25px', color: 'white', border: 'none' }}>
//         Start a Village
//       </button>
//       </Link>
//     </div>
//   );
// }

// function App() {
//   const navigate = useNavigate();
//   const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
//   if (!currentUser) return <Navigate to="/landingpage" />;

//   return (
// eslint-disable-next-line max-len
//     <div style={{backgroundColor: '#b2f1d5', height:"100%", display:'flex', alignItems:'center', flexDirection:'column',justifyContent:'center'}}>
//       <HomePage />
//       <Bio />
//     </div>
//   );
