require("dotenv").config();
const server = require("./server");
const httpserver = require("http").createServer(server);
const io = require("socket.io")(httpserver, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true

  }
  });

io.on("connection", (socket) => {
  console.log("A user has connected");

  socket.on("disconnect", () => {
    console.log("A user has disconnected");
  });

  socket.on("send_message", (data) => {
    console.log(data);
    socket.emit("received", data);
  });

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  // Handle other socket events and logic here

  socket.on("chat message", async (msg, id) => {
    console.log(`Received message: ${msg}`, id);
    const roomId = msg;
    console.log(msg);
    // io.emit("chat message", msg); // send the message only to clients in the same chat room
    io.to(id).emit("chat message", msg);
    // io.emit("chat message", msg)

    if (msg.userId) {
      const result = await sendMessage(
        msg.message,
        msg.userId,
        id,
        msg.profilePic,
        msg.username
      );
    }
  });
});

const port = process.env.PORT || 8080;

httpserver.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
