// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import RemadePosts from './RemadePosts';
// import { createPost } from '../adapters/post-adapter';

// export default function IssueDropDown(issue) {
//     const style = {
//         position: 'absolute',
//         top: '50%',
//         left: '50%',
//         transform: 'translate(-50%, -50%)',
//         width: 400,
//         bgcolor: 'background.paper',
//         border: '2px solid #000',
//         boxShadow: 24,
//         p: 4,
//       };
//    return (<div className="item" style={{ backgroundColor: "white", borderRadius: "1rem" }} key={i}>
//                      <div className="title" >
//                          <h2>{issue.name}</h2>
//                          <div>
//                          <button className="buttn" onClick={handleOpen}>Create Post</button>
//                          <Modal
//                             open={open}
//                             onClose={handleClose}
//                             aria-labelledby="modal-modal-title"
//                             aria-describedby="modal-modal-description"
//                         >
//                         <Box sx={style}>
//                             <form className="ui form" onSubmit={(e) => {
//                               e.preventDefault();
//                               const data = new FormData(e.target);
//                               createPost(data, issue.issue_id, id);
//                               handleClose();
//                             }}>
//                                 <div className="" widths="equal">
//                                  <div className="field ui fluid">
//                                 <label></label>
//                                  <input type="file" name="image" placeholder="Name" />
//                             </div>
//                 <div style={{ marginBottom: "1rem" }} className="field ui fluid">
//                   <label>Message</label>
//                   <input type="text" name="message" placeholder="Name" />
//                 </div>
//               </div>
//               <button className="ui button" type="submit">
//                 Submit
//               </button>
//             </form>
//         </Box>
//       </Modal>
//                          </div>
//                          <h1 className="switch" style={{ fontSize: "4rem" }}onClick={() => toggle(i)} >{selected === i ? '-' : '+'}</h1>
//                      </div>
//                      <div className={ selected === i ? "contentshow" : "content" }><RemadePosts></RemadePosts></div>
//                  </div>)
// }