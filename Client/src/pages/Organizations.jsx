/* eslint-disable */
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import CurrentUserContext from '../contexts/current-user-context';
import { serializeFormData } from '../utils'
import { createVillage } from '../adapters/organizations-adapter';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function HomePage() {
   const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)
  const [Organization, setOrganization] = React.useState({});

  const { currentUser } = React.useContext(CurrentUserContext)
  console.log(currentUser)
  const handleSubmit = async(e) => {
    e.preventDefault();
    const postBody = serializeFormData(e.target)
    postBody.user_id = currentUser.id
    createVillage(postBody)
    }


  return <>
      <h1>Organizations</h1>
      <div>
      <Button onClick={handleOpen}>Create Oraganization</Button>
      <Modal
        open={open}
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
                        <input type="image" name="image" placeholder="Image" />
                    </div>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
        </Box>
      </Modal>
    </div>
    </>;
}
