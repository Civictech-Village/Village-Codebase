import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import HomeIcon from '@mui/icons-material/Home';
import Houses from '../assets/houses.png'
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import Person2Icon from '@mui/icons-material/Person2';
import CurrentUserContext from "../contexts/current-user-context";
export default function SideBar() {

  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  return (
    <div
      className="sidebar"
      style={{ display: "flex", alignItems: "flex-start" }}
    >
      <StickyBox>
        <h1 style={{textAlign:'center'}}>Village</h1>
        <ul class="menu" style={{marginTop:"3em", borderTop:'1px solid'}}>
          <li className="sideBarItem">
            <HomeIcon />
            <h6><Link to="/" style={{marginLeft:'7px',textAlign:'center', fontSize:'larger'}}>Home</Link></h6>
          </li>
          <li className="sideBarItem">
            <img style={{width:'24px', height:'24px'}} src={Houses}></img>
            <Link to="/organizations" style={{marginLeft:'7px',textAlign:'center', fontSize:'larger'}}>Villages</Link>
          </li>
          <li className="sideBarItem">
            <Person2Icon />
            <Link to={currentUser ? "/users/" + currentUser.id : '/NotFound'} style={{marginLeft:'7px',textAlign:'center', fontSize:'larger'}}>Profile</Link>
          </li>
          <li className="sideBarItem">
            <ChatIcon />
            <Link to="/Feed" style={{marginLeft:'7px',textAlign:'center', fontSize:'larger'}}>Feed</Link>
          </li>
          <li className="sideBarItem">
            <SettingsIcon />
            <Link to="/settings" style={{marginLeft:'7px',textAlign:'center', fontSize:'larger'}}>Settings</Link>
          </li>
        </ul>
      </StickyBox>
    </div>
  );
}
