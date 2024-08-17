import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import useDebounce from "../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchResults, fetchSearchUser } from "../redux/SearchUserSlice";
import { fetchUserChat } from "../redux/UserChatSlice";
import { Skeleton } from "@mui/material";
import { setOpen, setValue } from "../redux/ChatSlice";
const LeftSideChat = () => {
  const dispatch = useDispatch();

  const { chatId } = useSelector((state) => state.value);

  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      // API call or search function here
      dispatch(fetchSearchUser(debouncedQuery));
      console.log("Searching for:", debouncedQuery);
    } else {
      dispatch(clearSearchResults());
    }
    return () => {
      dispatch(clearSearchResults());
    };
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    dispatch(fetchUserChat());
  }, [dispatch]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const handleLossFocus = () => {
    setFocus(false);
    setQuery("");
  };

  const handleChat = (id) => {
    console.log(id);
    dispatch(setValue(id));
    dispatch(setOpen(false))
  };

  const { data } = useSelector((state) => state.searchuser);
  const { data: userchats, IsLoading } = useSelector((state) => state.userchat);
  // console.log(userchats);
  return (
    <div className=" bg-slate-200 h-screen w-full md:h-[95vh]   md:mt-4 rounded-xl p-2 ">
      <h2 className=" font-bold text-2xl mb-5">Chats</h2>
      <div className="flex w-full items-center mb-4 gap-2">
        {focus && (
          <div>
            <ArrowLeftIcon
              onClick={() => handleLossFocus()}
              className=" w-[2.3rem] cursor-pointer  bg-zinc-400 p-2 rounded-[50%]"
            />
          </div>
        )}
        <div
          className={`flex w-full items-center  bg-zinc-400 ${
            focus ? "py-1" : " py-2"
          } pl-2 pr-1  rounded-[10rem] gap-2 `}
        >
          <MagnifyingGlassIcon className=" size-6" />
          <input
            className="w-full bg-transparent outline-none border-none "
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => handleFocus()}
          />
          {focus && (
            <XMarkIcon
              onClick={() => handleLossFocus()}
              className=" w-[2.4rem] bg-zinc-300 p-1 cursor-pointer  rounded-[50%] "
            />
          )}
        </div>
      </div>
      <hr className=" text-red-500 border border-solid border-black" />
      <div className="  h-[80%] overflow-y-scroll scrollbar-custom p-2 -mr-1 flex-auto">
        {!focus ? (
          <div className="flex h-full flex-col gap-2">
            {IsLoading ? (
              <div className="flex flex-col gap-2">
                {[...Array(7)].map((_, index) => (
                  <Skeleton
                    key={index}
                    variant="rounded"
                    width="100%"
                    height={60}
                    animation="wave"
                  />
                ))}
              </div>
            ) : !focus ? (
              <div className="flex flex-col gap-2">
                {userchats?.map((item, index) => (
                  <ChatCard
                    key={index}
                    className={`${
                      chatId?.chatid == item.chatid ? "bg-slate-100" : ""
                    }`}
                    onClick={() => handleChat(item)}
                    data={item}
                  />
                ))}

              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {/* {data?.map((item, index) => (
                      <ChatCard key={index} data={item} />
                    ))} */}
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col gap-2">
            {data?.map((item, index) => (
              <ChatCard key={index} className={`${chatId}`} data={item} />
            ))}
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};

export default LeftSideChat;
