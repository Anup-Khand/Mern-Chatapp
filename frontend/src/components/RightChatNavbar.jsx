import { useDispatch, useSelector } from "react-redux";
import ChatCard from "./ChatCard";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { setOpen } from "../redux/ChatSlice";

const RightChatNavbar = () => {
  const dispatch = useDispatch();
  
  const { chatId } = useSelector((state) => state.value);
  const { IsOpen } = useSelector((state) => state.value);

  const handleClose = () => {
    dispatch(setOpen(true));
  };

  return (
    <div className=" flex gap-1  items-center border-b border-black p-2 z-20 ">
      <span
        onClick={handleClose}
        className={` p-2 rounded-full hidden hover:bg-zinc-400 text-sm ${
          IsOpen ? "" : "max-md:inline-block"
        } `}
      >
        <KeyboardBackspaceIcon />
      </span>
      <ChatCard data={chatId} message />
    </div>
  );
};

export default RightChatNavbar;
