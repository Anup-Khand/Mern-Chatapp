import { useEffect, useState } from "react";
import ChatCard from "./ChatCard";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";

import {
  clearSearchResults,
  fetchRequestSearchUser,
  fetchSearchUser,
} from "../redux/SearchUserSlice";

import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const AddFriend = ({ data }) => {
  const dispatch = useDispatch();

  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      // API call or search function here
      dispatch(fetchRequestSearchUser(debouncedQuery));
      console.log("Searching for:", debouncedQuery);
    } else {
      dispatch(clearSearchResults());
    }
    return () => {
      dispatch(clearSearchResults());
    };
  }, [debouncedQuery, dispatch]);

  const { data: data1,status } = useSelector((state) => state.searchuser);
  // console.log(data1);

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
  return (
    <div className="p-2  flex flex-col flex-auto h-[80%]">
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
            className="w-full bg-transparent outline-none border-none"
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
      <div className=" flex-auto overflow-y-scroll scrollbar-custom p-2  -mr-1 ">
        {!focus ? (
          <div className="flex flex-col gap-2">
            {data?.map((item) => (
              <ChatCard key={item?._id} data={item} request />
            ))}
          </div>
        ) : (
          <div
            className={`flex h-full flex-col gap-2 ${
              data1.length == 0 ? "justify-center items-center" : ""
            }`}
          >
            {status === "succeeded" ? (
              data1.length > 0 ? (
                data1.map((item, index) => (
                  <ChatCard key={index} request data={item} />
                ))
              ) : (
                <p>No such data</p>
              )
            ) : (
              <img
                src="../../public/Spinner@1x-1.0s-200px-200px.svg"
                className="w-[5rem]"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFriend;
