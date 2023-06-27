import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import StickyBox from "react-sticky-box";
import HomeIcon from "@mui/icons-material/Home";
import Houses from "../assets/houses.png";
import SettingsIcon from "@mui/icons-material/Settings";
import ChatIcon from "@mui/icons-material/Chat";
import Person2Icon from "@mui/icons-material/Person2";
import CurrentUserContext from "../contexts/current-user-context";
import MapIcon from '@mui/icons-material/Map';
import { NavLink } from "react-router-dom";
export default function SideBar() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  return (
    <div
      className="sidebar"
      style={{ display: "flex", alignItems: "flex-start" }}
    >
      <StickyBox>
        <div style={{ marginTop: "20px" }}>
          <h1 style={{ textAlign: "center",}}>Village</h1>
        </div>
        <ul className="menu" style={{ marginTop: "2.5em", borderTop: "1px solid" }}>
          <li className="sideBarItem">
            <HomeIcon />
              <NavLink
                to="/"
                style={{
                  marginLeft: "7px",
                  textAlign: "center",
                  fontSize: "larger",
                }}
              >
                Home
              </NavLink>
          </li>
          <li className="sideBarItem">
            <img style={{ width: "24px", height: "24px" }} src={Houses}></img>
            <NavLink
              to="/organizations"
              style={{
                marginLeft: "7px",
                textAlign: "center",
                fontSize: "larger",
              }}
            >
              Villages
            </NavLink>
          </li>
          <li className="sideBarItem">
            <MapIcon />
            <NavLink
              to="/Map"
              style={{
                marginLeft: "7px",
                textAlign: "center",
                fontSize: "larger",
              }}
            >
              Map
            </NavLink>
          </li>
          <li className="sideBarItem">
            <Person2Icon />
            <NavLink
              to={currentUser ? "/users/" + currentUser.id : "/NotFound"}
              style={{
                marginLeft: "7px",
                textAlign: "center",
                fontSize: "larger",
              }}
            >
              Profile
            </NavLink>
          </li>
          <li className="sideBarItem">
            <ChatIcon />
            <NavLink
              to="/Feed"
              style={{
                marginLeft: "7px",
                textAlign: "center",
                fontSize: "larger",
              }}
            >
              Feed
            </NavLink>
          </li>
          <li className="sideBarItem">
            <SettingsIcon />
            <NavLink
              to="/settings"
              style={{
                marginLeft: "7px",
                textAlign: "center",
                fontSize: "larger",
              }}
            >
              Settings
            </NavLink>
          </li>
          
        </ul>
      </StickyBox>
    </div>
  );
}
