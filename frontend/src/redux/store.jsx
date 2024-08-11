import { configureStore } from "@reduxjs/toolkit";
import SearchUserReducer from "./SearchUserSlice";
import authReducer from "./AuthSlice";
import UserChatReducer from "./UserChatSlice";
import FriendsReducer from "./FriendsSlice";
import FriendRequestReducer from "./FriendRequestSlice";
import MessageReducer from "./MessageSlice";
import ChatReducer from "./ChatSlice";

const store = configureStore({
  reducer: {
    searchuser: SearchUserReducer,
    auth: authReducer,
    userchat: UserChatReducer,
    friend: FriendsReducer,
    friendrequest: FriendRequestReducer,
    message: MessageReducer,
    value: ChatReducer,
  },
});

export default store;
