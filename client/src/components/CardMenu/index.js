import { forwardRef, useImperativeHandle, useState } from "react";
import PropTypes from "prop-types";

import { IconButton, Menu } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CardMenu = forwardRef(({ children }, ref) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useImperativeHandle(ref, () => ({
    handleClose,
  }));

  return (
    <>
      <IconButton
        sx={{
          position: "absolute",
          backgroundColor: "#ffffff3b",
          right: "6px",
          top: "6px",
        }}
        aria-label="more"
        id="long-button"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        // PaperProps={{
        //   style: {
        //     width: "20ch",
        //   },
        // }}
      >
        {children}
      </Menu>
    </>
  );
});

CardMenu.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardMenu;
