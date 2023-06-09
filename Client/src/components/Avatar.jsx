import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { logUserOut } from "../adapters/auth-adapter";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function Avatar() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/landingpage");
  };
  console.log(currentUser);
  return (
    <div style={{ display: "flex" }}>
      <div style={{ margin: "0 20px", display:'flex', alignItems:'center',flexDirection:'column' }}>
        <Link
          to={`/users/${
            currentUser && currentUser.id ? currentUser.id : "notFound"
          }`}
          style={{ margin: "0 20px", textDecoration: "none" }}
        >
          <div>
            <h4>{currentUser ? currentUser.username : "username"}</h4>
          </div>
        </Link>

        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div>
        <img
          className="profilePic"
          src={
            currentUser && currentUser.profilePicture
              ? currentUser.profilePicture
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
          }
          alt="Profile Pic"
        ></img>
      </div>
    </div>
  );
}
