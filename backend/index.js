const userRoute = require("./Routes/userRoutes");
const chatRoute = require("./Routes/ChatRoutes");
const messageRoute = require("./Routes/MessageRoute");
const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const app = express();
require("dotenv").config();

app.use(cors());

app.use(express.json());

app.use("/api/auth", userRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database is connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room" + room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chatId;
    console.log(chat);
    if (!chat.members) return console.log("chat.users not defined");

    chat.members.forEach((user) => {
      console.log(user);
      if (user == newMessageReceived.senderId._id) return;

      socket.in(user).emit("message received", newMessageReceived);
    });
  });

  // socket.on("typing", (room) => socket.in(room).emit("typing"));
  // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("typing", (room, userId) => {
    socket.to(room).emit("typing", userId);
  });

  socket.on("stop typing", (room, userId) => {
    socket.to(room).emit("stop typing", userId);
  });

  socket.off("setup", () => {
    console.log("user disconnected");
    socket.leave(userData._id);
  });
});
