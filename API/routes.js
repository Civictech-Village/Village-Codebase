const express = require("express");
const path = require("path");
const userController = require("./controllers/user");
const postController = require("./controllers/posts");
const issueController = require("./controllers/issues");
const villageController = require("./controllers/village");
const addModels = require("./middleware/add-models");
const checkAuthentication = require("./middleware/check-authentication");
const upload = require("./utils/multer");
const commentController = require('./controllers/comments')
const chatroomController = require('./controllers/chatrooms')
const messageController = require('./controllers/messages')

const Router = express.Router();
Router.use(addModels);

Router.post("/posts/:id", upload.single("image"), postController.create);
Router.get("/posts/:issue_id", postController.listByIssue);
Router.get("/postsVillage/:id", postController.listAll);
Router.patch("/posts/:id", postController.update);
Router.delete("/posts/:post_id", postController.destroy);
Router.post("/like/:id", postController.like);
Router.get("/like/:id", postController.likeCount);
Router.get("/hasliked/:id", postController.hasLiked);
Router.delete("/destroylike/:id", postController.destroyLike);
Router.get("/popularPost", postController.popularLikes);
Router.get("/myVillagePost", postController.villagePosts);
Router.get("/userPosts/:id", postController.listUsersPosts);

Router.get("/image/:name", (req, res) => {
  const {
    params: { name },
  } = req;
  res.type("jpg");
  res.sendFile(path.join(__dirname, "./images", name));
});

Router.get('/comments/:id', commentController.list)
Router.get('/commentCount/:id', commentController.commentCount)

Router.post('/comments/:id', commentController.create)

Router.post('/Chatroom', chatroomController.create)
Router.get('/Chatroom', chatroomController.listUser)
Router.get('/MessageHistory/:room_id', messageController.listMessage)

Router.get("/issues/:id", issueController.list);
Router.post("/issues/:id", issueController.create);
Router.delete("/issues/:issue_id", issueController.destroy);

Router.post("/villages", upload.single("image"), villageController.create);
Router.get("/villages", villageController.list);
Router.get("/villagemembers/:id", villageController.findMembers)

Router.get("/users", userController.list);
Router.post("/users", userController.create);
Router.get("/users/:id", userController.show);
// We can use middleware slotted in between the route and the controller as well
Router.patch('/users/:id', checkAuthentication, userController.update);
Router.patch('/updateprofilepicture/:id', upload.single('image'), userController.updateProfilePicture )
Router.post('/login', userController.login);
Router.delete('/logout', userController.logout);
Router.get('/me', userController.showMe);

Router.get("/logged-in-secret", checkAuthentication, (req, res) => {
  res.send({ msg: "The secret is: there is no secret." });
});


module.exports = Router;
