import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import Home from '../assets/Home.jpg'
import { Link, Navigate, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import background from "/home/vinny/Development/Village-Codebase/Client/src/assets/tribeca-best-neighborhoods-manhattan.jpg";
import OrganizationCard from '../components/OrganizationCard';
import { createVillage, getAllVillages } from '../adapters/organizations-adapter';


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
console.log(Organizations)

  return (
    <div style={{ display: 'flex', padding: '2% 2%' }}>
      <div style={{ flex: '1', marginRight: '10px' }}>
        <h1 style={{ textAlign: 'left', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Welcome {currentUser.username}</h1>
        <h2 style={{ marginTop: '10%', color: 'white', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>Potiential Villages for you:</h2>
        {Organizations.map((organization, index) => <OrganizationCard key={index} village={organization}/>)}
        <Bio />
      </div>
    </div>
  );
}



function Bio() {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
      <div style={{ backgroundColor: '#f7f7f8', borderRadius: '15%', marginLeft: '60%', marginRight: '10%', padding: '50px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', marginTop: '-50px', paddingBottom: '5%'}}>
        <p style={{ marginBottom: '50%' }}>
          We aim to serve local community members who either just wish to stay in the know about what their community is experiencing or those who want to let their fellow community members know what issues they are experiencing.
        </p>
        <p>Come together as a community, develop a Village</p>
        <Link to={'/organizations'}>
          <button style={{ marginTop: '10px', backgroundColor: '#b2f1d5', marginLeft: '30%', padding: '10px 30px', borderRadius: '25px', color: 'white', border: 'none' }}>
            Start a Village
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
  const [activeTab, setActiveTab] = useState("popular");
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
      const posts = await fetchHandler("/api/popularPost");
      if (posts[0]) {
        setPosts(posts[0]);
      }
    };
    doFetch();
  }, []);

  const handleMyVillage = async () => {
    const posts = await fetchHandler("/api/myVillagePost");
    if (posts[0]) {
      setPosts(posts[0]);
    }
    console.log(posts)
    setActiveTab("myVillage");
  };

  const handlePopular = async () => {
    const posts = await fetchHandler("/api/popularPost");
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
