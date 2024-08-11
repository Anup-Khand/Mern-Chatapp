const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
module.exports = MessageModel;
