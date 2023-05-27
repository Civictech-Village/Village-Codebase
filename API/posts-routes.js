const express = require('express');
const postController = require('./controllers/posts');
const addModels = require('./middleware/add-models');

const Router = express.Router();
Router.use(addModels);

Router.post(postController.create);

module.exports = Router;
