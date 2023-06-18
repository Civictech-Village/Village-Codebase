import SearchIcon from "@mui/icons-material/Search";
import { getAllUsers } from "../adapters/user-adapter";
import { useEffect, useState } from "react";
import MemberCard from "./MemberCard";
import { Link } from "react-router-dom";

export default function SearchBar() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownResults, setDropdownResults] = useState([]);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Perform search and update dropdown results
    const results = users.filter(elem => elem.username.toLowerCase().startsWith(query.toLowerCase()));
    setDropdownResults(results.slice(0, 3));
    // Show/hide dropdown based on search input
    setDropdownVisible(query.length > 0);
  };

  return (
    <div style={{ width: "100%" }}>
      <form style={{ border: "0", margin: "0", width: "100%" }}>
        <div
          className="searchBar"
          style={{
            display: "flex",
            backgroundColor: "white",
            padding: "5px",
            alignItems: "center",
            width: "98%",
            position: "relative",
          }}
        >
          <SearchIcon sx={{ color: "grey", marginRight: "10px" }}></SearchIcon>
          <input
            placeholder="Search People"
            style={{ width: "100%" }}
            onChange={handleInputChange}
          />
          {dropdownVisible && (
            <div className="dropdown-results">
              {/* Render dropdown results */}
              {dropdownResults.map((result) => (
                <div key={result.id}><Link to={"/users/" + result.id}><MemberCard name={result.username} /></Link></div>
              ))}
            </div>
          )}{" "}
        </div>
      </form>
    </div>
  );
}
