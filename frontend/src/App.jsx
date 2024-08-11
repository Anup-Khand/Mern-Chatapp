import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import SignIn from "./pages/Login";
import Chat from "./pages/Chat";
import { ToastContainer } from "react-toastify";
import Avatar from "./pages/Avatar";
import Landing from "./pages/Landing";
import { useSelector } from "react-redux";
// import { useEffect } from "react";
import TokenExpiryHandler from "./utils/ExpireToken";
import LeftSideChat from "./components/LeftSideChat";
import LeftSideRequest from "./components/LeftSideRequest";

function App() {
  // const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated);

  return (
    <>
      <BrowserRouter>
        <TokenExpiryHandler />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/chat" /> : <Register />}
          />
          <Route
            path="/signin"
            element={isAuthenticated ? <Navigate to="/chat" /> : <SignIn />}
          />
          <Route path="/avatar" element={<Avatar />} />
          <Route
            path="/chat"
            element={isAuthenticated ? <Chat /> : <Navigate to="/signin" />}
          >
            <Route index element={<LeftSideChat />} />
            <Route path="request" element={<LeftSideRequest />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer stacked />
    </>
  );
}

export default App;
