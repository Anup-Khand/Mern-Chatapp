import { useDispatch, useSelector } from "react-redux";
import { GetFriendRequest } from "../redux/FriendRequestSlice";
import { useEffect } from "react";
import ChatCard from "./ChatCard";

const FriendRequest = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetFriendRequest());
  }, [dispatch]);

  const { data } = useSelector((state) => state.friendrequest);
  console.log(data);

  return (
    <div className=" flex flex-auto flex-col h-[80%] gap-2">
      <div className="mt-2 font-semibold "> FriendRequest</div>
      <div
        className={`gap-2 overflow-y-scroll scrollbar-custom flex-auto ${
          data.length > 0 ? "pr-2" : "p-0"
        }`}
      >
        <div className="flex flex-col">
          {data.length > 0 ? (
            data?.map((items) => (
              <ChatCard data={items} key={items._id} accept />
            ))
          ) : (
            <p>Its Seem you don`t have any friends request</p>
          )}
        
        </div>
      </div>
    </div>
  );
};

export default FriendRequest;
