const cloudinary = require('cloudinary').v2
const express = require('express');
const path = require('path');
const handleCookieSessions = require('./middleware/handle-cookie-sessions');
const routes = require('./routes');
const villageRoutes = require('./villageRoutes');
const http = require('http')
const {Server} = require("socket.io")
const cors = require('cors')




const logRoutes = require('./middleware/log-routes');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();


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
