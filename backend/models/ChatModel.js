const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users", // Referencing the Users model
      },
    ],
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);
const ChatModel = mongoose.model("Chat", ChatSchema);
module.exports = ChatModel;
