const User = require("../models/userModel");
const jwt= require("jsonwebtoken")

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  // console.log(authorization);
  if (!authorization) {
    return res.status(401).json({ msg: "Authorization tokken required" });
  }

  const token = authorization.split(" ")[1];
  // console.log("This is token",token);
  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    // console.log(_id);
    req.user = await User.findOne({ _id }).select("_id");
    console.log(req.user);

    next();
  } catch (error) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};
module.exports = requireAuth;
