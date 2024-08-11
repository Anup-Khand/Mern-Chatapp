const express = require("express");
const {
  createChat,
  userChats,
  findChat,
  getAllUsersExceptFriends,
  SendRequest,
  getallfriendrequest,
  AcceptRequest,
} = require("../controllers/chatController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/", createChat);
router.get("/", requireAuth, userChats);
router.get("/find/:firstId/:secondId", findChat);
router.get("/alluserexpectfriend", requireAuth, getAllUsersExceptFriends);
router.get("/getallfriendrequest", requireAuth, getallfriendrequest);
router.post("/sendrequest", requireAuth, SendRequest);
router.post("/acceptfriendrequest", requireAuth, AcceptRequest);

module.exports = router;
