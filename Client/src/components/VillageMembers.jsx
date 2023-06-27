export default function VillageMembers({ members }) {
  return (
    <div
      className=""
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "1rem",
      }}
      id="members"
    >
      <div>
        <h1>Members</h1>
      </div>
      <div>
        {members.map((elem) => {
          return (
            <div style={{display:'flex'}}>
              <img style={{width:'40px', height:'40px'}} src={elem.profile_picture ? elem.profile_picture : "https://cdn4.iconfinder.com/data/icons/gray-toolbar-8/512/xxx046-512.png"}></img>
              <p style={{marginLeft:'10px'}}>{elem.username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
