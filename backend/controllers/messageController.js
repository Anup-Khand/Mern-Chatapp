const ChatModel = require("../models/ChatModel");
const MessageModel = require("../models/MessageModel");
const User = require("../models/userModel");

module.exports.sendMessage = async (req, res) => {
  const { chatId, text } = req.body;
  console.log(chatId, text);
  if (!text || !chatId) {
    console.log("Invalid data passed into request");
  }

  var message = {
    chatId: chatId,
    senderId: req.user._id,
    text: text,
  };

  try {
    var result = await MessageModel.create(message);
    //  console.log("this is first result", result);
    result = await result.populate(
      "senderId",
      "firstname lastname avatarImage "
    );
    // console.log("this is result",result)
    result = await result.populate("chatId");
    //  console.log("this is third result", result);
    result = await User.populate(result, {
      path: "Chat.members",
      select: "firstname lastname avatarImage email",
    });
    await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: result,
    });
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

module.exports.getMessages = async (req, res) => {
  const chatId = req.params.chatId;
  console.log(chatId);
  try {
    const result = await MessageModel.find({
      chatId,
    })
      .populate("senderId", "firstname lastname email avatarImage")
      .populate("chatId");
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
