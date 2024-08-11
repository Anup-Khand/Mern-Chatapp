const express = require("express");
const {
  getMessages,
  sendMessage,
} = require("../controllers/messageController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.post("/", requireAuth, sendMessage);
router.get("/:chatId", getMessages);

module.exports = router;
