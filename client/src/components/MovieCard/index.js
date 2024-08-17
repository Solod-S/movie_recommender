import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem } from "@mui/material";

const MovieCard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ position: "relative" }}>
      <IconButton
        sx={{ position: "absolute", right: 0 }}
        aria-label="more"
        id="long-button"
        // aria-controls={open ? "long-menu" : undefined}
        // aria-expanded={open ? "true" : undefined}
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
        <MenuItem key={1} onClick={handleClose}>
          Add
        </MenuItem>
      </Menu>
      <CardMedia
        component="img"
        image="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h5" gutterBottom component="div">
          Alien: Romulus (2024)
        </Typography>
        <Typography variant="subtitle1" gutterBottom component="div">
          Aug 15, 2024
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
