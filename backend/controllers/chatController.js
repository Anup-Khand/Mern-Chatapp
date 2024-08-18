const ChatModel = require("../models/ChatModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

module.exports.createChat = async (req, res) => {
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports.userChats = async (req, res) => {
  const userId = req.user._id;
  try {
    const chats = await ChatModel.aggregate([
      // Match chats where the logged-in user is a member
      {
        $match: {
          members: userId,
          status: "accepted",
        },
      },

      // Unwind the members array
      { $unwind: "$members" },

      // Match to exclude the logged-in user
      { $match: { members: { $ne: userId } } },

      // Lookup to populate member details
      {
        $lookup: {
          from: "users", // The name of the User collection
          localField: "members",
          foreignField: "_id",
          as: "memberDetails",
        },
      },

      // Unwind the member details array
      { $unwind: "$memberDetails" },

      // Group back to the original chat structure
      {
        $project: {
          _id: 1,
          memberDetails: 1,
          // otherMembers: { $push: "$memberDetails" },
        },
      },
    ]);
    const formattedRequests = chats.map((req) => ({
      ...req.memberDetails,
      chatid: req._id,
    }));

    return res.status(200).json(formattedRequests);
  } catch (error) {
    console.error("Error fetching chat data:", error);
    throw error;
  }
};

module.exports.findChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getFriendIds = async (userId) => {
  const chats = await ChatModel.find({
    members: userId,
    status: "accepted",
  });

  const friendIds = new Set();
  chats.forEach((chat) => {
    chat.members.forEach((memberId) => {
      if (memberId.toString() !== userId?.toString()) {
        friendIds.add(memberId.toString());
      }
    });
  });
  return Array.from(friendIds);
};

module.exports.getAllUsersExceptFriends = async (req, res) => {
  // const userId = req.user._id;
  // const friendIds = await getFriendIds(userId);
  // // console.log(friendIds);
  // const users = await User.find({
  //   _id: { $nin: [...friendIds, userId] }, // Exclude friends and the user itself
  // });

  // res.status(200).json(users);

  try {
    const userId = req.user._id;

    // Step 1: Get the IDs of the user's friends
    const friendIds = await getFriendIds(userId);
    console.log(friendIds)

    // Step 2: Aggregate the chat status of all users except friends and the user itself
    const usersWithChatStatus = await User.aggregate([
      {
        $match: {
          _id: { $nin: [...friendIds, userId] },
          // Exclude friends and the user itself
        },
      },
      {
        $lookup: {
          from: "chats", // Collection name of ChatModel
          let: { userId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ["$$userId", "$members"] }, // Ensure the user is a member of the chat
                    { $in: [userId, "$members"] },
                    { $ne: ["$status", "accepted"] }, // Ensure the logged-in user is also a member
                  ],
                },

              },
            },
            {
              $project: {
                status: 1,
                latestMessage: 1,
              },
            },
          ],
          as: "chatStatus",
        },
      },
      {
        $unwind: {
          path: "$chatStatus",
          preserveNullAndEmptyArrays: false, // Preserve users with no chat status
        },
      },
      // {
      //   $match: {
      //     chatStatus: { $ne: "accepted" }, // Exclude users with any accepted chat
      //   },
      // },
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          avatarImage: 1, // Assuming the User model has a name field
          chatStatus: {
            $ifNull: ["$chatStatus.status", "no chat"], // Default to "no chat" if there's no chat status
          },
        },
      },
    ]);

    // Step 3: Return the result
    res.status(200).json(usersWithChatStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.SendRequest = async (req, res) => {
  const senderId = req.user._id;
  const receiverId = req.body.receiverId;
  console.log(receiverId);
  try {
    const existingRequest = await ChatModel.find({
      members: { $all: [senderId, receiverId] },
      status: "pending",
    });
    // console.log(existingRequest);
    if (existingRequest.length > 0) {
      return res.status(400).json({ msg: "Friend request already sent" });
    }
    const newRequest = new ChatModel({
      members: [senderId, receiverId],
      status: "pending",
    });

    const data = await newRequest.save();
    res.status(200).json({
      msg: "Friend request sent successfully",
      status: true,
    });
  } catch (err) {
    console.log(err);
  }
};

// get friend request

module.exports.getallfriendrequest = async (req, res) => {
  console.log("userId:", req.user._id);

  try {
    const userId = req.user._id; // Ensure userId is an ObjectId

    const requests = await ChatModel.aggregate([
      {
        $match: {
          members: { $size: 2 }, // Ensure there are exactly two members
          status: "pending",
        },
      },
      {
        $addFields: {
          member1: { $arrayElemAt: ["$members", 1] }, // Get the second member
          member0: { $arrayElemAt: ["$members", 0] }, // Get the first member
        },
      },
      {
        $match: {
          member1: userId, // Ensure userId matches the second member
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "member0",
          foreignField: "_id",
          as: "memberDetails",
        },
      },
      {
        $unwind: "$memberDetails",
      },
      {
        $project: {
          "memberDetails.password": 0,
        },
      },
      {
        $sort: { updatedAt: -1 },
      },
    ]);
    const formattedRequests = requests.map((req) => ({
      ...req.memberDetails,
      status: req.status,
    }));
console.log(formattedRequests)
    res.status(200).json(formattedRequests);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching friend requests." });
  }
};

module.exports.AcceptRequest = async (req, res) => {
  const senderId = req.body.senderId;
  const receiverId = req.user._id;

  try {
    const result = await ChatModel.findOneAndUpdate(
      {
        members: { $all: [senderId, receiverId] },
        status: "pending",
      },
      { $set: { status: "accepted" } }, // Update the status field
      { new: true } // Return the updated document
    );

    if (result) {
      res.status(200).json({ msg: "Request Accepted" });
    } else {
      res.status(404).json({ error: "Request not found" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while accepting the request" });
  }
};

module.exports.getPendingRequest = async (req, res) => {
  const userId = req.user._id

}
