import { useEffect, useState } from "react";
// import ChatCard from "./ChatCard";
// import useDebounce from "../hooks/useDebounce";

// import { fetchUserChat } from "../redux/UserChatSlice";

import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { allUser } from "../redux/FriendsSlice";
import FriendRequest from "./FriendRequest";
import AddFriend from "./AddFriend";

const LeftSideRequest = () => {
const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchUserChat());
  // }, [dispatch]);


  useEffect(() => {
    dispatch(allUser());
  }, [dispatch]);
  const { data } = useSelector((state) => state.friend);
  console.log(data);

  const [value, setValue] = useState("1");

  const handleChange1 = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className=" bg-slate-200 h-screen w-full sm:h-[95vh] sm:w-[22rem] sm:mt-4 sm:rounded-xl p-2 flex flex-col ">
      {/* <Box sx={{ width: "100%",height:"auto", typography: "body1" }}> */}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange1}
            variant="fullWidth"
            aria-label="lab API tabs example"
          >
            <Tab label="Add Friends" value="1" />
            <Tab label="Friend Requests" value="2" />
          </TabList>
        </Box>
        <div
          className={`flex-auto bg-red-400 p-2 ${
            value == 1 ? "" : "hidden"
          } scrollbar-custom`}
          value="1"
        >
          <AddFriend data={data} />
        </div>

        <div
          className={`flex-auto overflow-y-scroll ${
            value == 2 ? "" : "hidden"
          }  scrollbar-custom`}
          value="2"
        >
          <FriendRequest />
        </div>
      </TabContext>
    </div>
  );
};

export default LeftSideRequest;
