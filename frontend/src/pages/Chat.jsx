import { useDispatch, useSelector } from "react-redux";
// import LeftSideChat from "../components/LeftSideChat";
import {
  ArrowLeftStartOnRectangleIcon,
  ChatBubbleLeftEllipsisIcon,
  ChatBubbleOvalLeftIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { logout } from "../redux/AuthSlice";
import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import ReusablePopOver from "../components/ResuablePopOver";
import RightSideChat from "../components/RightSideChat";
import { MessageImageAvatar } from "../components/ImageAvatar";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { IsOpen } = useSelector((state) => state.value);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // const avatarSrc = user?.avatarImage
  //   ? `data:image/svg+xml;base64,${user?.avatarImage}`
  //   : "";

  const handleLogout = () => {
    dispatch(logout());
    if (!isAuthenticated) {
      navigate("/signin");
    }
  };
  return (
    <div className="md:grid md:grid-cols-[1fr_3.5fr_7fr] h-screen relative ">
      <div
        className={`flex md:h-[95vh] items-center md:my-4 overflow-hidden md:flex-col md:justify-between  max-md-styles ${
          IsOpen ? "" : "max-md:hidden"
        } `}
      >
        <div className=" flex md:flex-col md:items-center gap-4">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "flex justify-center items-center bg-zinc-400 rounded-full "
                : ""
            }
            to="/chat"
            end
          >
            <ReusablePopOver
              icon={ChatBubbleOvalLeftIcon}
              direction="right"
              content="chat"
              iconClassName="size-12 cursor-pointer hover:bg-zinc-400 hover:rounded-full p-2"
            />
          </NavLink>
          <ReusablePopOver
            icon={UserGroupIcon}
            direction="right"
            content="people"
            iconClassName="size-12 cursor-pointer hover:bg-zinc-400 hover:rounded-full p-2"
          />
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "flex justify-center items-center bg-zinc-400 rounded-full "
                : ""
            }
            to="/chat/request"
          >
            <ReusablePopOver
              icon={ChatBubbleLeftEllipsisIcon}
              content="Message Request"
              direction="right"
              iconClassName="size-12 cursor-pointer hover:bg-zinc-400 hover:rounded-full p-2"
            />
          </NavLink>
        </div>
        <div className="flex md:flex-col md:items-center gap-4 ">
          <span className=" hidden md:block">
            <MessageImageAvatar
              src={user?.avatarImage}
              className="size-9 object-cover"
              alt="user"
            />
          </span>
          <ArrowLeftStartOnRectangleIcon
            onClick={handleLogout}
            className="size-12 p-2 hover:bg-zinc-400 hover:rounded-full  cursor-pointer"
          />
        </div>
      </div>

      <Outlet />
      <RightSideChat />
    </div>
  );
};

export default Chat;
