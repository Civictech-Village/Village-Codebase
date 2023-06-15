const express = require('express');
const path = require('path');
const userController = require('./controllers/user');
const postController = require('./controllers/posts');
const issueController = require('./controllers/issues')
const villageController = require('./controllers/village');
const addModels = require('./middleware/add-models');
const checkAuthentication = require('./middleware/check-authentication');
const upload = require('./utils/multer');

const Router = express.Router();
Router.use(addModels);

Router.post('/posts', postController.create);
Router.get('/posts/:id', postController.listByIssue);
Router.patch('/posts/:id', postController.update);
Router.delete('/posts/:id', postController.destroy);

Router.get("/image/:name", (req, res) => {
  const { params: { name } } = req;
  res.type('jpg');
  res.sendFile(path.join(__dirname, "./images", name));
});

Router.get('/issues/:id', issueController.list)
Router.post('/issues/:id', issueController.create)
Router.delete('/issues/:issue_id', issueController.destroy)

Router.post('/villages', upload.single('image'), villageController.create);
Router.get('/villages', villageController.list);

Router.get('/users', userController.list);
Router.post('/users', userController.create);
Router.get('/users/:id', userController.show);
// We can use middleware slotted in between the route and the controller as well
Router.patch('/users/:id', checkAuthentication, userController.update);

Router.post('/login', userController.login);
Router.delete('/logout', userController.logout);
Router.get('/me', userController.showMe);

Router.get('/logged-in-secret', checkAuthentication, (req, res) => {
  res.send({ msg: 'The secret is: there is no secret.' });
});

module.exports = Router;
