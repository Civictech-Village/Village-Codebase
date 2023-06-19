import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchHandler } from '../utils';
import RemadePosts from './RemadePosts';

export default function VillageBody() {
  const [issues, setIssues] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [selected, setSelected] = useState(null);
  const { id } = useParams();

  const fetchIssues = async () => {
    const result = await fetchHandler(`/api/issues/${id}`);
    setIssues(result[0]);
  };
  useEffect(() => {
    fetchIssues();
  }, []);

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

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
  return (
        <div id="body" className="bodyboxes" style={{ flex: "2", margin: "0px 2rem", padding: "0.5rem" }}>
        <div id="Isuue" style={{ }}>
             {issues.map((issue, i) => (<div className="item" style={{ backgroundColor: "white", borderRadius: "1rem" }}key={i}>
                     <div className="title" >
                         <h2>{issue.name}</h2>
                         <div>
                         <button className="buttn" onClick={handleOpen}>Create Post</button>
                         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form className="ui form" >
              <div className="four fields" widths="equal">
                <div className="field ui fluid">
                  <label>Issue Name</label>
                  <input type="text" name="name" placeholder="Name" />
                </div>
                <div style={{ marginBottom: "1rem" }}className="field ui fluid">
                  <label>Issue Desc</label>
                  <input type="text" name="issue_desc" placeholder="Description" />
                </div>
              </div>
              <button className="ui button" type="submit">
                Submit
              </button>
            </form>
        </Box>
      </Modal>
                         </div>
                         <h1 className="switch" style={{ fontSize: "4rem" }}onClick={() => toggle(i)} >{selected === i ? '-' : '+'}</h1>
                     </div>
                     <div className={ selected === i ? "contentshow" : "content" }><RemadePosts></RemadePosts></div>
                 </div>))}
        </div>
     </div>
  );
}
