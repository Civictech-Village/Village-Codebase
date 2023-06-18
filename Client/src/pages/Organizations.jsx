/* eslint-disable */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CurrentUserContext from "../contexts/current-user-context";
import { serializeFormData } from "../utils";
import {
  createVillage,
  getAllVillages,
} from "../adapters/organizations-adapter";
import OrganizationCard from "../components/OrganizationCard";
import { useEffect, useState } from "react";
import SearchBar from "../components/NavBar";
import Avatar from "../components/Avatar";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function HomePage() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(false);
  const handleClose = () => setOpen(true);
  const [Organizations, setOrganizations] = React.useState([]);

  const { currentUser } = React.useContext(CurrentUserContext);
  console.log(currentUser);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const result = await getAllVillages();
      setOrganizations(result);
    };
    fetchOrganizations();
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    data.append("user_id", String(currentUser.id));
    createVillage(data);
    handleClose();
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#f5f5f5",
        width: "100%",
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
      <h1>Organizations</h1>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Button variant="contained" onClick={handleOpen}>
          Create Oraganization
        </Button>
        <Modal
          open={!open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form className="ui form" onSubmit={handleSubmit}>
              <div className="four fields" widths="equal">
                <div className="field ui fluid">
                  <label>Organization Name</label>
                  <input type="text" name="name" placeholder="Name" />
                </div>
                <div className="field ui fluid">
                  <label>Location</label>
                  <input type="text" name="location" placeholder="County" />
                </div>
                <div className="field ui fluid">
                  <label>Image URL</label>
                  <input type="file" name="image" placeholder="Image" />
                </div>
              </div>
              <button className="ui button" type="submit">
                Submit
              </button>
            </form>
          </Box>
        </Modal>
        <div id="org-gallery" style={{ height: "100%", padding: "100px" }}>
          {Organizations.map((organization, index) => (
            <OrganizationCard key={index} village={organization} />
          ))}
        </div>
      </div>
    </div>
  );
}
