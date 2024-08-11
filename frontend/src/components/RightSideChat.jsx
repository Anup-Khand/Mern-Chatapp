import RightChatNavbar from "./RightChatNavbar";
import MessageContent from "./MessageContent";
import { useSelector } from "react-redux";

const RightSideChat = () => {
  const { IsOpen } = useSelector((state) => state.value);
 

  return (
    <div
      className={`flex flex-col overflow-hidden bg-slate-200 md:flex-auto sm:h-[95vh] md:mr-4 md:mt-4 md:mb-4 md:ml-3 rounded-xl gradient max-md:absolute max-md:top-2/4 max-md:left-2/4 max-md:w-full  max-md:h-full max-md:-translate-x-1/2 max-md:-translate-y-1/2 ${
        IsOpen ? "max-md:hidden" : ""
      }`}
    >
      <RightChatNavbar />
      <MessageContent />
    </div>
  );
};

export default RightSideChat;
