import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Login from "./Login";
import Register from "./Register";

const AuthModal = ({ open = false, setOpenAuthModal }) => {
  const [mode, setMode] = React.useState("SignIn");

  const style = {
    position: "absolute",
    borderRadius: "15px",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    boxShadow: 24,
    marginTop: "0px",
    padding: "0px",
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setMode("SignIn");
        setOpenAuthModal(false);
      }}
      aria-label="modal-title"
    >
      <Box sx={style}>
        {mode === "SignIn" && (
          <Login setMode={setMode} setOpenAuthModal={setOpenAuthModal} />
        )}
        {mode === "SignUp" && (
          <Register setMode={setMode} setOpenAuthModal={setOpenAuthModal} />
        )}
      </Box>
    </Modal>
  );
};

export default AuthModal;
