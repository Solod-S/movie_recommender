import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";
import { Alert, Divider, IconButton, InputBase, Paper } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { CopyToClipboard } from "react-copy-to-clipboard";
import CloseIcon from "@mui/icons-material/Close";
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
  minHeight: 273,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ConfirmModal = ({
  open = false,
  url = "",
  title = "",
  onClose = () => {},
}) => {
  const [openAlert, setOpenAlert] = React.useState(false);

  return (
    <>
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
              readOnly
            />
            <IconButton
              href={url}
              target="_blank"
              sx={{ p: "10px" }}
              aria-label="preview"
            >
              <VisibilityIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <CopyToClipboard
              text={url}
              onCopy={() => {
                setOpenAlert(true);
                setTimeout(() => {
                  setOpenAlert(false);
                }, 1000);
              }}
            >
              <IconButton
                color="primary"
                sx={{ p: "10px" }}
                aria-label="copy to clipboard"
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
            <TwitterShareButton url={url}>
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <TelegramShareButton url={url}>
              <TelegramIcon size={32} round />
            </TelegramShareButton>
          </Box>
          {openAlert && (
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mt: 2 }}
            >
              Copied!
            </Alert>
          )}
        </Box>
      </Modal>
    </>
  );
};

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  url: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func,
};

export default ConfirmModal;
