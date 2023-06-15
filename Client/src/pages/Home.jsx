import React from "react";
import Home from '../assets/Home.jpg'
import { Link, Navigate, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
function HomePage() {
  return (
    <div style={{ backgroundColor: '#b2f1d5', padding: '20px' }}>
      <h1 style={{textAlign:'center'}}>
        Village
      </h1>
      <p>
        We aim to serve local community members who either just wish to stay in the know about what their community is experiencing or those who want to let their fellow community members know what issues they are experiencing.
      </p>
    </div>
  );
}
function NYC() {
  return (
    <div style={{width:"100%", display:'flex', justifyContent:'center', flexDirection:"column"}}>
    <img src= {Home} alt="/home/vinny/Development/Village-Codebase/Client/src/pages/new-york-city-evening-NYCTG0221-52492d6ccab44f328a1c89f41ac02aea.jpg" />
    </div>
  )
}


function Bio() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <p>Come together as a community, develop a Village</p>
      <Link to={'/organizations'}>
      <button style={{ marginTop: '10px', backgroundColor: '#0d6efd', padding: '10px 30px', borderRadius: '25px', color: 'white', border: 'none' }}>
        Start a Village
      </button>
      </Link>
    </div>
  );
}


function App() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  if (!currentUser) return <Navigate to="/landingpage" />;

  return (
    <div style={{backgroundColor: '#b2f1d5', height:"100%", display:'flex', alignItems:'center', flexDirection:'column',justifyContent:'center'}}>
      <HomePage />
      <Bio />
    </div>
  );
}

export default App;
