import { useDispatch } from "react-redux";
import { SendRequest } from "../redux/FriendsSlice";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ReusablePopOver from "./ResuablePopOver";
import { AcceptFriendRequest } from "../redux/FriendRequestSlice";
import ImageAvatar, { MessageImageAvatar } from "./ImageAvatar";

/* eslint-disable react/prop-types */
const ChatCard = ({ data, request, accept, message, onClick, className }) => {
  const dispatch = useDispatch();
  console.log(data);
  const gap = "6px";
  const radius = "14px";
  const imgRadius = `calc(${radius} - ${gap})`;

  // const avatarSrc = data?.avatarImage
  //   ? `data:image/svg+xml;base64,${data?.avatarImage}`
  //   : "";

  const handleSendRequest = (id) => {
    // console.log(id);
    dispatch(SendRequest(id));
  };
  const handleAcceptRequest = (id) => {
    console.log("clicked");
    dispatch(AcceptFriendRequest(id));
  };
  return (
    <div
      onClick={onClick}
      className={`flex items-center relative hover:bg-slate-100
         ${request ? "gap-3" : " gap-4"} 
       ${message ? "px-1" : "p-1.5"} 
      ${className}
      ${!message && "border border-gold"}   cursor-pointer`}
      style={{ borderRadius: radius }}
    >
      <div
        style={{ borderRadius: imgRadius }}
        className="card__img flex justify-center items-center flex-shrink-0 w-[60px] aspect-square overflow-hidden rounded-[calc(14px-6px)] "
      >
        {message ? (
          <MessageImageAvatar
            src={data?.avatarImage}
            alt={`${data?.firstname}${data?.lastname}`}
            className={` object-cover  size-12`}
          />
        ) : (
          <ImageAvatar
            src={data?.avatarImage}
            alt="Jane Doe"
            className={`w-full h-full object-cover ${message && "size-9"}`}
            message
          />
        )}
      </div>
      <div className="text-lg">
        {data?.firstname} {data?.lastname}
        {!message && <span className="block text-xs">Accounts Manager</span>}
      </div>
      {request && (
        <div
          onClick={() => handleSendRequest(data?._id)}
          className="bg-sky-400 p-1 text-sm rounded-md cursor md:absolute right-1 shadow-md shadow-sky-300  "
        >
          <span className=" font-bold">
            {data?.chatStatus == "pending" ? "Pending..." : "Send Request"}
          </span>
        </div>
      )}
      {accept && (
        <div className="md:absolute right-1 flex gap-1">
          <span onClick={() => handleAcceptRequest(data?._id)}>
            <ReusablePopOver
              icon={DoneAllOutlinedIcon}
              direction="top"
              content="Accept Request"
              iconClassName="bg-zinc-400 p-2 rounded-full"
            />
          </span>
          <ReusablePopOver
            icon={DeleteOutlineIcon}
            direction="top"
            content="Delete"
            iconClassName=" bg-zinc-400 p-2 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default ChatCard;
