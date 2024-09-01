import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setValue } from "../redux/ChatSlice";
import { fetchMessage, sendMessage } from "../redux/MessageSlice";
import ScrollableChat from "./ScrollableChat";
import io from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import SouthIcon from "@mui/icons-material/South";
import useScrollToBottom from "../hooks/useScrolltoBottom";

const ENDPOINT = "http://localhost:8000";
var socket, selectedChatCompare;

const MessageContent = () => {
  const dispatch = useDispatch();

  const chatContainerRef = useRef(null);

  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  // const [isTyping, setIsTyping] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { chatId } = useSelector((state) => state.value) || {};
  const { messages,IsLoading } = useSelector((state) => state.message) || {};

   const { showScrollButton, scrollToBottom } =
     useScrollToBottom(chatContainerRef);

  // console.log(showScrollButton)

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));

    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));

    socket.on("typing", (userId) => {
      if (!typingUsers.includes(userId)) {
        setTypingUsers((prev) => [...prev, userId]);
      }
    });

    socket.on("stop typing", (userId) => {
      setTypingUsers((prev) => prev.filter((id) => id !== userId));
    });
  }, [user, typingUsers]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererAscpectRatio: "xMidYMid slice",
  };

  // Function to scroll to the bottom of the chat container
  // const scrollToBottom = () => {
  //   if (chatContainerRef.current) {
  //     console.log(chatContainerRef.current.scrollHeight);
  //     chatContainerRef.current.scrollTop =
  //       chatContainerRef.current.scrollHeight;
  //   }
  // };

  // const Sendmessage = async (event) => {
  //   if (event.key === "Enter" && newMessage) {
  //     event.preventDefault();
  //     socket.emit("stop typing", chatId?.chatid);
  //     const ChatId = chatId?.chatid;
  //     console.log(newMessage);
  //     const response = await dispatch(sendMessage({ newMessage, ChatId }));
  //     console.log(response);
  //     if (response.payload) {
  //       socket.emit("new message", response.payload);
  //       setMessage([...messages, response.payload]);
  //     }
  //     setNewMessage("");
  //   }
  // };

  const handleSendMessage = async () => {
    if (newMessage) {
      // socket.emit("stop typing", chatId?.chatid);
      socket.emit("stop typing", chatId?.chatid, user._id);
      const ChatId = chatId?.chatid;
      const response = await dispatch(sendMessage({ newMessage, ChatId }));
      if (response.payload) {
        socket.emit("new message", response.payload);
        setMessage([...messages, response.payload]);
      }
      setNewMessage("");
      scrollToBottom();
    }
  };

  const Sendmessage = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", chatId?.chatid, user._id);
    }

    let lastTypingTime = new Date().getTime();

    var timerLength = 3000;

    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", chatId?.chatid, user._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    if (messages) {
      setMessage(messages);
       setNewMessage("");
      scrollToBottom();
    }
  }, [messages]);

  // console.log(message);
  const fetchmessage = async () => {
    if (!chatId?.chatid) return;
    if (chatId?.chatid) {
      // console.log(chatId);
      dispatch(fetchMessage(chatId?.chatid));

      socket.emit("join chat", chatId?.chatid);
      scrollToBottom();
    }
  };

  useEffect(() => {
    fetchmessage();
    selectedChatCompare = chatId?.chatid;
  }, [chatId?.chatid]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare !== newMessageReceived.chatId._id
      ) {
        // give notification
      } else {
        setMessage([...messages, newMessageReceived]);
        scrollToBottom();
      }
    });
  });

  // console.log(chatId);

  useEffect(() => {
    const storedChatId = JSON.parse(localStorage.getItem("chatId"));
    console.log(storedChatId);
    if (storedChatId?.chatid) {
      dispatch(setValue(storedChatId));
    }
  }, [dispatch]);

  useEffect(() => {
    if (chatId?.chatid) {
      localStorage.setItem("chatId", JSON.stringify(chatId));
    }
  }, [chatId]);

  return (
    <>
      <div
        ref={chatContainerRef}
        className=" flex-auto w-full h-full p-2 overflow-y-scroll scroll-pb-4 scrollbar-custom "
      >
        <ScrollableChat IsLoading={IsLoading} messages={message} />

        <span
          onClick={scrollToBottom}
          className={`fixed   max-md:transition-all duration-500 ease-out z-50 bg-zinc-400 top-[80%] opacity-0 left-[50%] -translate-x-1/2   p-2 rounded-full cursor-pointer md:left-[70%]  ${
            showScrollButton
              ? "-translate-y-[50%] opacity-100"
              : "-translate-y-[25%] opacity-0"
          }`}
        >
          <SouthIcon />
        </span>
      </div>
      <form
        onKeyDown={Sendmessage}
        className="flex flex-col p-2  w-full "
        action=""
      >
        {typingUsers.length > 0 ? (
          <div>
            <Lottie
              options={defaultOptions}
              width={70}
              style={{ marginBottom: 0, marginLeft: 0 }}
            />
          </div>
        ) : (
          <></>
        )}
        <div className="flex w-full  items-center gap-3">
          <input
            className=" outline-none p-2 rounded-md w-full"
            placeholder="Enter the Message"
            type="text"
            onChange={handleTyping}
            value={newMessage}
          />
          <span onClick={handleSendMessage}>
            <SendIcon className=" cursor-pointer" />
          </span>
        </div>
      </form>
    </>
  );
};

export default MessageContent;
