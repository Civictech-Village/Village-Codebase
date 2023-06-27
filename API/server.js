const cloudinary = require('cloudinary').v2
const express = require('express');
const path = require('path');
const handleCookieSessions = require('./middleware/handle-cookie-sessions');
const routes = require('./routes');
const villageRoutes = require('./villageRoutes');
const http = require('http')
const {Server} = require("socket.io")
const cors = require('cors')
const { sendMessage } = require('./controllers/messages/');




const logRoutes = require('./middleware/log-routes');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const io = new Server({
  cors: {
    origin: '*',
  },
});
io.on('connection', (socket) => {
  console.log('A user has connected');

  socket.on('disconnect', () => {
    console.log('A user has disconnected');
  });

  socket.on('send_message', (data) => {
    console.log(data)
    socket.emit("received", data)
  })

  socket.on("joinRoom", (room) => {
    socket.join(room);
  });

  // Handle other socket events and logic here

  socket.on("chat message", async (msg, id) => {
    console.log(`Received message: ${msg}`, id);
    const roomId = msg;
    console.log(msg)
    // io.emit("chat message", msg); // send the message only to clients in the same chat room
    io.to(id).emit("chat message", msg)
    // io.emit("chat message", msg)

    if(msg.userId){
      const result = await sendMessage(msg.message, msg.userId, id, msg.profilePic, msg.username);
    }
  });
});

io.listen(8080);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(cors())

app.use(handleCookieSessions);
// app.use(logRoutes);
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', routes);
app.use('/api', villageRoutes);

app.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/api')) next();
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
