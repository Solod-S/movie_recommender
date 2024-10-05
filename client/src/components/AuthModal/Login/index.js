import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { FormattedMessage } from "react-intl";
import { AppContext } from "../../../providers/appContext";
import { useCustomNotification } from "../../../hooks/useCustomNotification";
import { LOGIN_MUTATION } from "../queries";

import logoSvg from "../../../assets/logo.webp";

const Card = styled(MuiCard)(({ theme }) => ({
  borderRadius: "15px",
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const Login = ({ setMode, setOpenAuthModal }) => {
  const [loginUp, { loading }] = useMutation(LOGIN_MUTATION);
  const { dispatch } = useContext(AppContext);
  const { showNotification, NotificationComponent } = useCustomNotification();
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const email = data.get("email");
      const password = data.get("password");
      const result = await loginUp({
        variables: { email, password },
      });

      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
      result.data.login &&
        dispatch({ type: "setUser", user: result.data.login });
      setOpenAuthModal(false);
    } catch (err) {
      console.error("Registration error:", err.message);
      showNotification(err.message, "error", 3000, {
        vertical: "top",
        horizontal: "left",
      });
    }
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <>
      {NotificationComponent}
      <Card variant="outlined">
        <Box
          component="img"
          sx={{
            width: "70%",
            margin: "auto",
          }}
          alt="No images."
          src={logoSvg}
        />
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">
              <FormattedMessage id="auth.email" />
            </FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
              sx={{ ariaLabel: "email" }}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">
                <FormattedMessage id="auth.password" />
              </FormLabel>
            </Box>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>

          <Button
            sx={{
              backgroundColor: "#282F3D",
              "&:hover": {
                backgroundColor: "#3A4455",
              },
            }}
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            <FormattedMessage id="auth.login" />
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            <FormattedMessage id="auth.loginFooterMessage" />{" "}
            <span
              style={{ color: "#1976d2", cursor: "pointer" }}
              onClick={() => {
                setMode("SignUp");
              }}
            >
              <FormattedMessage id="auth.register" />
            </span>
          </Typography>
        </Box>
      </Card>
    </>
  );
};

Login.propTypes = {
  setMode: PropTypes.func.isRequired,
  setOpenAuthModal: PropTypes.func.isRequired,
};

export default Login;
