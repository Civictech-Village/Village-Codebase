const express = require('express');
const addModels = require('./middleware/add-models');
const villageController = require('./controllers/village');

const villageRouter = express.Router();
villageRouter.use(addModels);

villageRouter.get('/villages', villageController.list);
villageRouter.get('/villages/:id', villageController.find);

villageRouter.post('/villages', villageController.create);
villageRouter.post('/villages/:id', villageController.join);

module.exports = villageRouter;
