export default function VillageMembers({ members }) {
  return (
    <div
      className=""
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "1rem",
        height:'100%'
      }}
      id="members"
    >
      <div style={{borderBottom:'1px solid black', marginBottom:'2em'}}>
        <h1>Members</h1>
      </div>
      <div>
        {members.map((elem) => {
          return (
            <div style={{display:'flex', marginBottom:'1em'}}>
              <img style={{width:'40px', height:'40px'}} src={elem.profile_picture ? elem.profile_picture : "https://cdn4.iconfinder.com/data/icons/gray-toolbar-8/512/xxx046-512.png"}></img>
              <p style={{marginLeft:'10px'}}>{elem.username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
