export default function Avatar() {
  return (
    <div style={{display:'flex'}}>
      <div style={{margin:'0 20px'}}>
        <div>
          <h4>Username</h4>
        </div>
        <p>Log out</p>
      </div>
      <div>
        <img className="profilePic" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="Profile Pic"></img>
      </div>
    </div>
  );
}
