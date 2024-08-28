import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useCustomNotification } from "../../hooks/useCustomNotification";
//15 lesson
// https://www.youtube.com/watch?v=4oqRbrz6WHo&list=PLlYbsPJVZjByoxkiMq35voVKulO73VuX8&index=17
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  TelegramIcon,
} from "react-share";

const style = {
  position: "absolute",
  borderRadius: "15px",

  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "0.5px solid #000",
  boxShadow: 24,
  p: 4,
};

const ConfirmModal = ({ open, url, title, onClose }) => {
  const { showNotification, NotificationComponent } = useCustomNotification();
  return (
    <>
      {NotificationComponent}
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              marginTop: "5px",
              display: "flex",
              alignItems: "center",

              width: "100%",
            }}
          >
            <InputBase
              value={url}
              sx={{ ml: 1, flex: 1 }}
              placeholder="List URL"
              inputProps={{ "aria-label": "list URL" }}
            />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="prepreview"
            >
              <VisibilityIcon />
            </IconButton>
            <Divider
              sx={{ height: 28, m: 0.5 }}
              orientation="copy to clipboard"
            />
            <CopyToClipboard
              text={url}
              onCopy={() =>
                showNotification("Copied!", "success", 2000, {
                  vertical: "top",
                  horizontal: "center",
                })
              }
            >
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
              >
                <ContentCopyIcon />
              </IconButton>
            </CopyToClipboard>
          </Paper>
          {/* Social Media Share Buttons */}
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <FacebookShareButton url={url} quote={title}>
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={url}
              // title={title}
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton
              url={url}
              // title={title} summary={title}
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TelegramShareButton
              url={url}
              // title={title}
            >
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

ConfirmModal.protoTypes = {
  open: PropTypes.bool,
  url: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default ConfirmModal;
