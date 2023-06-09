/* eslint-disable */
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler, serializeFormData } from "../utils";
import {
  createVillage,
  getAllVillages,
} from "../adapters/organizations-adapter";
import OrganizationCard from "../components/OrganizationCard";
import { useEffect, useState } from "react";
import SearchBar from "../components/NavBar";
import Avatar from "../components/Avatar";
import Footer from "../components/LandingPage/Footer";
import ReactPaginate from "react-paginate";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function HomePage() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(false);
  const handleClose = () => setOpen(true);
  const [Organizations, setOrganizations] = React.useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHovered, selectIsHovered] = useState(false);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  const inputPhotos = useRef();
  const navigate = useNavigate()

  const handleRemoveImage = () => {
    setSelectedImage(null);
    inputPhotos.current.value = "";
  };

  const { currentUser } = React.useContext(CurrentUserContext);
  console.log(currentUser);

  const handleImgEnter = () => {
    selectIsHovered(true);
  };

  const handleImgLeave = () => {
    selectIsHovered(false);
  };

  useEffect(() => {
    const fetchOrganizations = async () => {
      const result = await getAllVillages();
      setOrganizations(result);
    };
    fetchOrganizations();
  }, [open]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const location = await fetch(
      `https://geocode.maps.co/search?q=${e.target.location.value}`
    );
    const response = await location.json();
    let lat = response[0].lat;
    let lon = response[0].lon;
    const data = new FormData(e.target);
    data.append("user_id", String(currentUser.id));
    data.append("lat", lat);
    data.append("lon", lon);
    const responseData = await createVillage(data);
    console.log(responseData)
    handleClose();
    navigate('/organizations/' + responseData[0].village.village_id)
  };

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((organization, index) => (
            <OrganizationCard key={index} village={organization} />
          ))}
      </>
    );
  }

  function PaginatedItems({ itemsPerPage }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);

    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = Organizations.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(Organizations.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % Organizations.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Items currentItems={currentItems} />
        <div style={{position:'absolute', bottom:'3em', width:'100%'}}>
          <ReactPaginate
            className="react-paginate"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
          />
        </div>
      </>
    );
  }

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
      <h1>Villages</h1>
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
        <button className="btn btn-success" onClick={handleOpen}>
          Create Villages
        </button>
        <Modal
          open={!open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <form
              className="ui form"
              onSubmit={handleSubmit}
              style={{ width: "100%", border: "0" }}
            >
              <div className="four fields mb-1" widths="equal">
                <div className="field ui fluid mb-3">
                  <label className="form-label">Organization Name</label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    placeholder="Name"
                  />
                </div>
                <div className="field ui fluid mb-3">
                  <label className="form-label">Location</label>
                  <input
                    className="form-control"
                    type="text"
                    name="location"
                    placeholder="Location (City, ST)"
                  />
                </div>
                <div className="field ui fluid mb-3">
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <label className="form-label">Image URL</label>
                    {selectedImage ? (
                      <div style={{ height: "100%", maxheight: "304px" }}>
                        <div
                          style={{
                            width: "100%",
                            height: "150px",
                            position: "relative",
                            display: "flex",
                          }}
                        >
                          <img
                            src={selectedImage}
                            alt="Preview"
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </div>
                    ) : (
                      <img src="https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png" />
                    )}
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <input
                      className="form-control"
                      type="file"
                      name="image"
                      placeholder="Image"
                      onChange={handleImageChange}
                      style={{ marginRight: "5px" }}
                      ref={inputPhotos}
                    />
                    <button className="btn btn-danger d-flex" type="button">
                      <DeleteIcon onClick={handleRemoveImage} />
                    </button>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary d-flex " type="submit">
                Submit
              </button>
            </form>
          </Box>
        </Modal>
        <div
          id="org-gallery"
          style={{
            height: "100%",
            padding: "100px",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            justifyItems: "center",
            position:'relative'
          }}
        >
          <PaginatedItems itemsPerPage={4} />
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <Footer />
      </div>
    </div>
  );
}
