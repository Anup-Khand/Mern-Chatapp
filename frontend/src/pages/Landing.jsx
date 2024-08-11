import { useEffect } from "react";
import gif from "../assets/icons8-chat.gif";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    // Navigate to /home after 3 seconds
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate("/chat");
      } else {
        navigate("/signin");
      }
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated]);
  return (
    <div className="relative bg-slate-100 dark:bg-zinc-900 h-screen flex items-center justify-center  flex-col ">
      <img
        className=" mix-blend-multiply size-24"
        src={gif}
        alt="landing icon"
      />
      <span className="absolute bottom-5">From A</span>
    </div>
  );
};

export default Landing;
