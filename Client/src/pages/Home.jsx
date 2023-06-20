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
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  if (!currentUser) return <Navigate to="/landingpage" />;

  return (
    <div style={{backgroundColor:'#b2f1d5', backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", objectFit: 'fill', backdropFilter: 'blur(10px)', height:"", display:'flex', alignItems:'center', flexDirection:'column',justifyContent:'center'}}>
      <HomePage />
      {/* <Bio /> */}
    </div>
  );
}

export default App;
