import { useEffect, useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

const Avatar = () => {
  const toastOptions = {
    position: "top-right",
    autoClose: 5000,
    draggable: true,
    theme: "dark",
  };
  const [avatar, setAvatar] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAvatar = async () => {
      const data = [];
      for (let i = 0; i < 7; i++) {
        const Imageresponse = await axios.get(
          `${import.meta.env.VITE_MULTIAVATAR_API}/${Math.round(
            Math.random() * 1000
          )}?apikey=${import.meta.env.VITE_MULTIAVATAR_APIKEY}`
        );
        console.log(Imageresponse);
        const buffer = Buffer.from(Imageresponse.data, "utf-8");
        data.push(buffer.toString("base64"));
      }
      setAvatar(data);
      setLoading(false);
    };

    getAvatar();
  }, []);

  const handleAvatar = async () => {
    console.log(selectedAvatar);
    if (selectedAvatar === null) {
      toast.error("Please select an Avatar ", toastOptions);
    } else {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      console.log(user);
      const { data } = await axios.post(
        `${import.meta.env.VITE_PORT}/api/auth/setAvatar/${user?.user._id}`,
        {
          image: avatar[selectedAvatar],
        }
      );
      console.log(data);
      if (data.isSet) {
        user.user.isAvatarImageSet = true;
        user.user.avatarImage = data?.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user?.user));
        toast.success("Avatar set successfully!", toastOptions);
      } else {
        toast.error("Error setting an Avatar", toastOptions);
      }
    }
  };

  return (
    <main className="w-full h-screen max-sm:h-full flex place-items-center dark:bg-slate-100 bg-neutral-800 justify-center">
      <section className="card">
        <h1 className="text-center text-white font-bold  mix-blend-difference text-2xl sm:h-full">
          Pick an avatar or image for profile picture
        </h1>
        <div className="flex flex-wrap gap-4 place-content-center justify-center items-center py-2 ">
          {loading ? (
            <Loader />
          ) : (
            avatar.map((item, index) => (
              <div
                key={index}
                className={`flex justify-center items-center p-2 rounded-full cursor-pointer ${
                  selectedAvatar === index &&
                  "border border-solid border-red-700 "
                }`}
              >
                <img
                  loading="lazy"
                  className="h-[5rem] w-[5rem] object-cover"
                  src={`data:image/svg+xml;base64,${item}`}
                  alt=""
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))
          )}
        </div>
        <div className="text-center">
          <button
            onClick={() => handleAvatar()}
            className="button-wrapper border bg-purple-700 rounded-lg outline-none"
          >
            <span className="button-wrapper-inner p-2 font-semibold">
              Set as a Profile Picture
            </span>
          </button>
        </div>
      </section>
    </main>
  );
};

export default Avatar;
