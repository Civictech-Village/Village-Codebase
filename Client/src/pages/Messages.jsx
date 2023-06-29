import CurrentUserContext from "../contexts/current-user-context";
import React, { useState, useEffect, useContext } from "react";
import SearchBar from "../components/NavBar";
import Avatar from "../components/Avatar";
import socket from "../socket";
import { fetchHandler } from "../utils";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Message() {
  const { currentUser, loggedIn } = useContext(CurrentUserContext);

  const [users, setUsers] = useState([]);
  const [messagesArr, setMessagesArr] = useState([]);
  const [roomNumber, setRoomId] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState(null)
  const [selectedProfilePic, setSelectedProfilePic] = useState(null)

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roomId = queryParams.get("roomId");
    setRoomId(roomId);
    console.log("New roomId:", roomId);
    if (roomId) {
      socket.emit("joinRoom", roomId);
      const doFetch = async () => {
        const result = await fetchHandler("/api/MessageHistory/" + roomId);
        console.log(result);
        setMessagesArr(result[0]);
      };
      doFetch();
    }
  }, [location.search]);

  useEffect(() => {
    const doFetch = async () => {
      const result = await fetchHandler("/api/Chatroom");
      const updatedChatRooms = await Promise.all(
        result[0].map(async (chatRoom) => {
          const participantId =
            chatRoom.user_id === currentUser.id
              ? chatRoom.recipient_id
              : chatRoom.user_id;
          const userProfile = await fetchHandler("/api/users/" + participantId);

          return {
            ...chatRoom,
            profilePicture: userProfile[0].profilePicture,
            username: userProfile[0].username,
          };
        })
      );
      setUsers(updatedChatRooms);
      console.log(users);
    };
    doFetch();
  }, [currentUser]);

  useEffect(() => {
    console.log(currentUser);
    function onConnect() {
      console.log("connected");
    }

    function onDisconnect() {
      console.log("false");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  socket.on("chat message", async (data) => {
    console.log(data);
    const arr = [...messagesArr];
    arr.push(data);
    console.log(arr);
    setMessagesArr(arr);
    console.log(messagesArr);
  });

  const sendMessage = (e) => {
    e.preventDefault();
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    const message = {
      time: new Date().toLocaleTimeString(undefined, options),
      message: e.target.message.value,
      username: currentUser.username,
      profilePic: currentUser.profilePicture,
      id: currentUser.id,
    };
    socket.emit("chat message", message, roomNumber);
    e.target.reset()
  };

  useEffect(() => {
    console.log(messagesArr);
  }, [messagesArr]);

  const handleClick = (roomId, username, profilePic) => {
    // Change the link to a query parameter on click
    setSelectedUsername(username)
    setSelectedProfilePic(profilePic)
    navigate(`/Messages?roomId=${roomId}`);
  };

  const Users = ({ username, profilePic, id }) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    return (
      <div
        type="button"
        onClick={() => handleClick(id, username, profilePic)}
        style={{
          width: "264px",
          height: "50px",
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            width: "51px",
            height: "50px",
            backgroundImage: profilePic
              ? profilePic
              : `url(https://cdn4.iconfinder.com/data/icons/gray-toolbar-8/512/xxx046-512.png)`,
            backgroundSize: "cover",
          }}
        ></div>
        <div>
          <h5 style={{ color: "#E9E9E9", fontSize: "16px", fontWeight: "700" }}>
            {username}
          </h5>
        </div>
        <div style={{ width: "51px", height: "40px" }}>

        </div>
      </div>
    );
  };

  const MessageComponent = ({ message, username, profilePic, time, id }) => {
    const date = new Date(time);
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    const timeString = date.toLocaleTimeString(undefined, options);
    if (timeString !== "Invalid Date") {
      time = timeString;
    }
    console.log(id);
    return (
      <div id="message" style={{ padding: "25px" }}>
        <div
          className={id === currentUser.id ? "sentText" : ""}
          style={{ display: "flex" }}
        >
          <div
            id="messageImage"
            style={{
              width: "41px",
              height: "41px",
              backgroundSize: "cover",
              backgroundImage: profilePic
                ? profilePic
                : "url(https://cdn4.iconfinder.com/data/icons/gray-toolbar-8/512/xxx046-512.png)",
            }}
          ></div>
          <div style={{ padding: "0 12px" }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <h5
                style={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                {username}
              </h5>
              <p style={{ color: "#7C8B9F", fontSize: "13px" }}>{time}</p>
            </div>
            <div>
              <div
                style={{
                  width: "279px",
                  height: "42px",
                  backgroundColor: "#1E1F25",
                }}
              >
                <p style={{ color: "white" }}>{message}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ width: "100%" }}>
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
      <div style={{ display: "flex" }}>
        <div
          id="sidebarUsers"
          style={{
            border: "1px solid black",
            width: "333px",
            height: "726px",
            backgroundColor: "#212229",
          }}
        >
          <div style={{ padding: "20px" }}>
            <h5 style={{ fontSize: "30px", fontWeight: "700", color: "white" }}>
              Messages
            </h5>
          </div>
          <div style={{ padding: "20px" }}>
            <input
              placeholder={true && ` Search...`}
              style={{
                borderRadius: "8px",
                border: "none",
                backgroundColor: "#050505",
                width: "262px",
                height: "48px",
                padding: "20px",
              }}
            />
          </div>
          <div id="users" style={{ padding: "0 30px" }}>
            {users.length > 0 ? users.map((elem) => (
              <Users
                id={elem.id}
                username={elem.username}
                profilePic={elem.profilePicture}
              />
            )) : <h5 style={{color:'white', textAlign:'center'}}>Click on a users profile to begin direct messaging them</h5>}
          </div>
        </div>
        <div
          style={{
            width: "80%",
            height: "726px",
            backgroundColor: "#131517",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {roomNumber ? (
            <>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  padding: "20px 30px",
                  marginBottom: "30px",
                }}
              >
                <div
                  style={{ width: "258px", height: "61px", display: "flex" }}
                >
                  <div
                    id="imageGroup"
                    style={{
                      marginRight: "15px",
                      width: "63.6px",
                      height: "62.4px",
                      backgroundImage:
                        `url(${selectedProfilePic ? selectedProfilePic : 'https://cdn4.iconfinder.com/data/icons/gray-toolbar-8/512/xxx046-512.png'})`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                  <div id="textGroup">
                    <h3
                      style={{
                        color: "#F8F8F8",
                        fontSize: "30px",
                        fontWeight: "500",
                      }}
                    >
                      {selectedUsername}
                    </h3>
                  </div>
                </div>
                <div style={{ display: "flex", padding: "10px 20px" }}>
                  {/* <div
                id="memberIcons"
                style={{
                  width: "33px",
                  height: "30px",
                  backgroundSize: "cover",
                  backgroundImage:
                    "url(https://cdn4.iconfinder.com/data/icons/gray-toolbar-8/512/xxx046-512.png)",
                }}
              ></div>
              <div
                id="memberIcons"
                style={{
                  width: "33px",
                  height: "30px",
                  backgroundSize: "cover",
                  backgroundImage:
                    "url(https://cdn4.iconfinder.com/data/icons/gray-toolbar-8/512/xxx046-512.png)",
                }}
              ></div>
              <div
                id="memberIcons"
                style={{
                  width: "33px",
                  height: "30px",
                  backgroundSize: "cover",
                  backgroundImage:
                    "url(https://cdn4.iconfinder.com/data/icons/gray-toolbar-8/512/xxx046-512.png)",
                }}
              ></div> */}
                </div>
              </div>
              <div
                style={{
                  maxHeight: "500px",
                  overflowY: "auto",
                  height: "100%",
                }}
              >
                {messagesArr.map((elem) => {
                  console.log(elem);
                  return (
                    <MessageComponent
                      time={elem.time}
                      message={elem.message}
                      username={elem.username}
                      profilePic={elem.profilePic}
                      id={elem.id}
                    />
                  );
                })}
              </div>
              <div
                id="TextForm"
                style={{
                  width: "100%",
                  height: "88px",
                  backgroundColor: "#282932",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <form
                  onSubmit={sendMessage}
                  style={{
                    border: "0",
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <input
                    name="message"
                    placeholder="Send a message..."
                    style={{
                      borderRadius: "25px",
                      width: "609px",
                      height: "50px",
                      backgroundColor: "#1E1F25",
                      padding: "20px",
                      color: "white",
                    }}
                  ></input>
                  <button type="submit" className="btn btn-light">
                    Send
                  </button>
                </form>
              </div>{" "}
            </>
          ) : <h5 style={{color:"white", height:'100%', alignItems:'center',justifyContent:'center', display:'flex'}}>Click on a user to the left to view your messages</h5>}
        </div>
      </div>
    </div>
  );
}
