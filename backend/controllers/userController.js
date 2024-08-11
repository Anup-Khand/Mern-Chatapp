const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// create json web token

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

module.exports.register = async (req, res, next) => {
  //   console.log(req.body);
  try {
    const { firstname, lastname, email, password } = req.body;
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ msg: "Email is already used", status: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    delete user.password;
    const token = createToken(user._id);
    return res.status(200).json({ user: user, token: token });
  } catch (error) {
    console.log(error);
  }
};

module.exports.login = async (req, res, next) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ msg: "Email not found", status: false });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect email or password", status: false });
    }
    const token = createToken(user._id);
    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    // delete user.password;

    return res.status(200).json({ user: userWithoutPassword, token: token });
  } catch (error) {
    console.log(error);
  }
};

module.exports.setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.status(200).json({
      isSet: userData?.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getSearchUsers = async (req, res) => {
  const { query } = req.body;
  try {
    const users = await User.find({
      $or: [
        { firstname: { $regex: query, $options: "i" } },
        { lastname: { $regex: query, $options: "i" } },
      ],
    }).find({ _id: { $ne: req.user._id } });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};
