import { useState } from "react";
import PropTypes from "prop-types";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const directionMap = {
  top: {
    anchorOrigin: { vertical: "top", horizontal: "center" },
    transformOrigin: { vertical: "bottom", horizontal: "center" },
  },
  bottom: {
    anchorOrigin: { vertical: "bottom", horizontal: "center" },
    transformOrigin: { vertical: "top", horizontal: "center" },
  },
  left: {
    anchorOrigin: { vertical: "center", horizontal: "left" },
    transformOrigin: { vertical: "center", horizontal: "right" },
  },
  right: {
    anchorOrigin: { vertical: "center", horizontal: "right" },
    transformOrigin: { vertical: "center", horizontal: "left" },
  },
};

const ReusablePopOver = ({
  icon: IconComponent,
  content,
  direction="bottom",
  iconClassName='',
  contentClassName='',
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const { anchorOrigin, transformOrigin } = directionMap[direction];

  return (
    <>
      <div
        className={iconClassName}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <IconComponent />
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
      
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography className={contentClassName} sx={{ p: 1 }}>{content}</Typography>
      </Popover>
    </>
  );
};

ReusablePopOver.propTypes = {
  icon: PropTypes.elementType.isRequired,
  content: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["top", "bottom", "left", "right"]),
  iconClassName: PropTypes.string,
  contentClassName: PropTypes.string,
};

// ReusablePopOver.defaultProps = {
//   direction: "bottom",
//   iconClassName: "",
//   contentClassName: "",
// };
export default ReusablePopOver;
