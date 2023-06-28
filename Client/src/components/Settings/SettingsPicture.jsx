import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/current-user-context";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import gallery from "../../assets/gallery-add.png";
import { updateUser } from "../../adapters/user-adapter";
export default function SettingsProfile() {
  const { setCurrentUser, currentUser } = useContext(CurrentUserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  const changeUserPfp = (e) => {
    e.preventDefault();
    var form_data = new FormData(e.target);
    const changepfp = async () => {
      const result = await fetch(`api/updateprofilepicture/${currentUser.id}`, {
        method: `PATCH`,
        body: form_data,
      });
    };
    changepfp();
    handleClose();
  };

  return (
    <div style={{ margin: "5em 2em" }}>
      <div>
        <h5>Your Profile Picture</h5>
        <div
          style={{
            cursor: "pointer",
            width: "200px",
            height: "230px",
            border: "1px dashed #4C545F",
            borderRadius: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "25px",
          }}
        >
          <img src={gallery} alt="" onClick={handleShow} />
          <>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>New Profile Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form
                  className="ui form"
                  onSubmit={changeUserPfp}
                  style={{ border: "0", width: "75%" }}
                >
                  <div className="four fields" widths="equal">
                    <div className="field ui fluid">
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
                        <img src="https://uploader-assets.s3.ap-south-1.amazonaws.com/codepen-default-placeholder.png" style={{marginBottom:'20px'}}/>
                      )}
                      <input
                        style={{ marginBottom: "5%" }}
                        type="file"
                        name="image"
                        class="form-control"
                        placeholder="Profile Pic"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <button class="btn btn-primary" type="submit">
                    Submit
                  </button>
                </form>
              </Modal.Body>
            </Modal>
          </>
          <p
            style={{
              lineHeight: "16px",
              textAlign: "center",
              width: "102.11px",
              marginTop: "15px",
            }}
          >
            Upload your Photo
          </p>
        </div>
      </div>
    </div>
  );
}
