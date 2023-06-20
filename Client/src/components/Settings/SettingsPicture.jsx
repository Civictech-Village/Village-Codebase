import { useState, useContext } from 'react';
import CurrentUserContext from '../../contexts/current-user-context';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import gallery from "../../assets/gallery-add.png";
import { updateUser } from '../../adapters/user-adapter';
export default function SettingsProfile() {
  const { currentUser } = useContext(CurrentUserContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeUserPfp = (e) => {
    e.preventDefault();
    // const currentUserData = new FormData(currentUser);
    var form_data = new FormData(e.target);
      // for ( var key in currentUser ) {
      //   form_data.append(key, currentUser[key]);
      // }
      // console.log("log")
    updateUser(currentUser.id, form_data);
    handleClose;
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
          <img src={gallery} alt="" onClick={handleShow}/>
          <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="ui form" onSubmit={changeUserPfp} >
            <div className="four fields" widths="equal">
              <div className="field ui fluid">
                <label>New Profile Picture</label>
                <input type="file" name="image" placeholder="Profile Pic" />
              </div>
            </div>
            <button className="ui button" type="submit">
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
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
