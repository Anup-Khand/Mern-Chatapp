const router = require("express").Router();
const {
  register,
  login,
  setAvatar,
  getSearchUsers,
} = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth")


router.post("/register", register);
router.post("/login", login);
router.post("/setAvatar/:id", setAvatar);
router.get("/getalluser");
router.post("/getsearchusers",requireAuth, getSearchUsers);

module.exports = router;
