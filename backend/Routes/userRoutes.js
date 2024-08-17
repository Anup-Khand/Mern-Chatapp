const router = require("express").Router();
const {
  register,
  login,
  setAvatar,
  getSearchUsers,
  getRequestSearchUser,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/getalluser");
router.post("/getsearchusers", requireAuth, getSearchUsers);
router.post("/getrequestsearchusers", requireAuth, getRequestSearchUser);
module.exports = router;
