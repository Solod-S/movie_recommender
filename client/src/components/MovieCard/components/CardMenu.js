import * as React from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const CardMenu = ({ onCardSelect }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        sx={{
          position: "absolute",
          backgroundColor: "#ffffff3b",
          right: "4px",
          top: "4px",
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
        PaperProps={
          {
            // style: {
            //   maxHeight: ITEM_HEIGHT * 4.5,
            //   width: "20ch",
            // },
          }
        }
      >
        <MenuItem
          key={1}
          onClick={() => {
            handleClose();
            setTimeout(() => {
              onCardSelect();
            }, 100);
          }}
        >
          Select
        </MenuItem>
      </Menu>
    </>
  );
};

export default CardMenu;
