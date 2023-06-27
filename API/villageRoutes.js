const express = require('express');
const addModels = require('./middleware/add-models');
const villageController = require('./controllers/village');

const villageRouter = express.Router();
villageRouter.use(addModels);

villageRouter.get('/villages', villageController.list);
villageRouter.get('/villages/:id', villageController.find);

villageRouter.get('/villageget/:id', villageController.findUser)

villageRouter.delete('/villages/:id', villageController.destroy)

villageRouter.post('/villages/:id', villageController.join);

villageRouter.get('/villageUser/:id', villageController.listUserVillage)

module.exports = villageRouter;
