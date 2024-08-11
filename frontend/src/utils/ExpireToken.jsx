import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { decodeToken } from "./jwt";
import { logout } from "../redux/AuthSlice";

const TokenExpiryHandler = () => {
  const dispatch = useDispatch();
  //   console.log(token);
  const user = JSON.parse(localStorage.getItem("chat-app-user"));
  const token = user ? user.token : "";
  useEffect(() => {
    if (!token) return;

    const decodedToken = decodeToken(token);
    if (!decodedToken) return;

    const currentTime = Date.now() / 1000;
    const timeUntilExpiry = decodedToken.exp - currentTime;

    if (timeUntilExpiry > 0) {
      const timer = setTimeout(() => {
        dispatch(logout());
      }, timeUntilExpiry * 1000);

      return () => clearTimeout(timer);
    } else {
      dispatch(logout());
    }
  }, [token, dispatch]);

  return null;
};

export default TokenExpiryHandler;
