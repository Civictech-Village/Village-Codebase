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

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, sethasMore] = useState(true);
  const [activeTab, setActiveTab] = useState("popular");


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
    <div style={{ width: "100%", height: "100%" }}>
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
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "6em",
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
