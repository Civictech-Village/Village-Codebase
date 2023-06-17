import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
export default function HomeCard() {
  return (
    <div
      className="card"
      style={{
        borderRadius: "8px",
        height: "480px",
        width: "500px",
        marginTop: "5em",
        boxShadow: "0px 12px 24px rgba(34, 34, 34, 0.12)",
        padding: "13px",
      }}
    >
      <img
        src="https://via.placeholder.com/350x150"
        className="card-img-top"
        alt="..."
      />
      <div className="card-body" style={{ padding: "0", paddingTop: "10px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ul
            style={{
              display: "flex",
              flexDirection: "row",
              listStyle: "none",
              padding: "0",
              height: "fit-content",
            }}
          >
            <li
              style={{
                margin: "0 10px",
                borderRadius: "90px",
                backgroundColor: "#D11036",
                width: "fit-content",
                display: "flex",
                justifyContent: "center",
                color: "white",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Issues
            </li>
            <li
              style={{
                margin: "0 10px",
                borderRadius: "90px",
                backgroundColor: "#808080",
                width: "fit-content",
                display: "flex",
                justifyContent: "center",
                color: "white",
                padding: "5px",
                textAlign: "center",
              }}
            >
              Infrastructure
            </li>
          </ul>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <img
              className="profilePic"
              style={{ width: "40px", height: "40px", marginBottom:'3px' }}
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
            ></img>
            <h5>Charles Deo</h5>
            <p>115 mins ago</p>
          </div>
        </div>
        <h5 className="card-title">Leaky Pipe</h5>
        <p className="card-text">
          My pipe burst for the third time this month!!!
        </p>
        <div style={{ display: "flex" }}>
          <div style={{marginRight:'12px'}}>
            <FavoriteBorderIcon style={{marginRight:'3px'}}/>
            {0}
          </div>
          <div>
            <ChatBubbleOutlineIcon style={{marginRight:'3px'}}/>
            {0}
          </div>
        </div>
      </div>
    </div>
  );
}
