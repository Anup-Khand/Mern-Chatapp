// import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../utils/Logics";
import Tooltip from "@mui/material/Tooltip";
import { useSelector } from "react-redux";
import Zoom from "@mui/material/Zoom";
import  { MsgImg } from "./ImageAvatar";

const ScrollableChat = ({ messages }) => {
  // console.log("this is from scroll", messages);

  const { user } = useSelector((state) => state.auth);
  // console.log(user._id);

  return (
    <div className="">
      {messages &&
        messages.map((msg, i) => {
          const sameSender = isSameSender(messages, msg, i, user._id);
          const lastMessage = isLastMessage(messages, i, user._id);
          // console.log(
          //   `Message ID: ${msg._id}, isSameSender: ${sameSender}, isLastMessage: ${lastMessage}`
          // );

          return (
            <div
              className="flex items-center max-w-full gap-2"
              key={msg._id}
            >
              {(sameSender || lastMessage) && (
                <Tooltip
                  TransitionComponent={Zoom}
                  title={`${msg.senderId.firstname} ${msg.senderId.lastname}`}
                  arrow
                >
                  <MsgImg
                    src={msg?.senderId?.avatarImage}
                    alt={msg?.senderId.firstname}
                    className=" object-cover size-7"
                    message
                  />
                </Tooltip>
              )}
              <span
                className="border rounded-xl py-1 px-2 text-lg  max-w-[50%] flex-nowrap whitespace-pre-wrap  break-words text-wrap"
                style={{
                  backgroundColor: `${
                    msg.senderId._id === user._id ? "#BEE3F8" : "#B9F5D0"
                  }`,
                  marginLeft: isSameSenderMargin(messages, msg, i, user._id),
                  marginTop: isSameUser(messages, msg, i, user._id) ? 3 : 0,
                }}
              >
                {msg.text}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default ScrollableChat;
