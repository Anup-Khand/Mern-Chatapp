import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PropTypes from "prop-types";
import React from "react";



const ImageAvatar = React.forwardRef(
  ({ src = "", alt = "", className = "", ...rest }, ref) => {
    const avatarSrc = src ? `data:image/svg+xml;base64,${src}` : "";
    return (
      <>
        {src ? (
          <img
            ref={ref}
            src={avatarSrc}
            className={className}
            alt={alt}
            {...rest}
          />
        ) : (
          <span
            {...rest}
            ref={ref}
            className={`flex justify-center items-center bg-zinc-300 rounded-full ${
              src ? "p-2" : "p-3"
            }`}
          >
            <PersonOutlineIcon fontSize="large" />
          </span>
        )}
      </>
    );
  }
);

ImageAvatar.displayName = "ImageAvatar";

export const MessageImageAvatar = ({ src = "", alt = "", className = "" }) => {
  const avatarSrc = src ? `data:image/svg+xml;base64,${src}` : "";
  return (
    <>
      {src ? (
        <img src={avatarSrc} className={className} alt={alt} />
      ) : (
        <span
          className={`flex justify-center items-center bg-zinc-300 rounded-full ${
            src ? "p-2" : "p-3"
          }`}
        >
          <PersonOutlineIcon fontSize="medium" />
        </span>
      )}
    </>
  );
};



 export const MsgImg = React.forwardRef(
  ({ src = "", alt = "", className = "",  ...rest }, ref) => {
    const avatarSrc = src ? `data:image/svg+xml;base64,${src}` : "";
    return (
      <>
        {src ? (
          <img
            ref={ref}
            src={avatarSrc}
            className={className}
            alt={alt}
            {...rest}
          />
        ) : (
          <span
            {...rest}
            ref={ref}
            className={`flex justify-center items-center bg-zinc-300 rounded-full ${
              src ? "p-1" : "p-1"
            }`}
          >
            <PersonOutlineIcon fontSize="medium" />
          </span>
        )}
      </>
    );
  }
);

MsgImg.displayName = "ImageAvatar";

MsgImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

ImageAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

MessageImageAvatar.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ImageAvatar;
