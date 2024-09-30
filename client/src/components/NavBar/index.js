import { Link as RouterLink, useLocation } from "react-router-dom";

import { motion } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Box,
  Hidden,
  Link,
  Select,
  MenuItem,
  FormControl,
  Avatar,
  Button,
} from "@mui/material";
import { LOCALES } from "../../constants";
import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../providers/appContext";
import { framerLogoVariants } from "../../constants";
import defaultBackground from "../../assets/banner.jpg";
import favoritesBackground from "../../assets/favorites.jpg";
import logo from "../../assets/movie-logo.png";
import { FormattedMessage } from "react-intl";
import AuthModal from "../AuthModal";

const MotionLogo = motion(Avatar);

const Navigation = () => {
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const location = useLocation();
  const isActive = path => location.pathname === path;
  const isFavorite = location.pathname === "/favorites";

  const setLanguage = useCallback(
    locale => {
      dispatch({
        type: "setLocale",
        locale,
      });
    },
    [dispatch]
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AuthModal open={openAuthModal} setOpenAuthModal={setOpenAuthModal} />
      <AppBar
        position="static"
        sx={{
          minHeight: 150,
          backgroundImage: `url(${isFavorite ? favoritesBackground : defaultBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Toolbar>
          {/* <Hidden only={["lg", "xl"]}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link end="true" component={RouterLink} to="/">
                <MotionLogo
                  src={logo}
                  alt={"logo"}
                  initial="start"
                  animate="end"
                  transition={{
                    ...framerLogoVariants.transition_img,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  variants={framerLogoVariants}
                  style={{
                    height: "60px",
                    width: "auto",
                    objectFit: "contain",
                    borderRadius: "0",
                    zIndex: 1,
                  }}
                />
              </Link>
            </Box>
          </Hidden> */}

          <Hidden only={["xs", "sm", "md"]}>
            <Link component={RouterLink} to="/">
              <MotionLogo
                src={logo}
                alt={"logo"}
                initial="start"
                animate="end"
                transition={{
                  ...framerLogoVariants.transition_img,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                variants={framerLogoVariants}
                style={{
                  height: "140px",
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: "0",
                  zIndex: 1, // Ensure Avatar is on top
                }}
              />
            </Link>
          </Hidden>

          <Box
            sx={{
              marginLeft: "auto",
              display: { lg: "flex" },
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Button
              component={RouterLink}
              to="/"
              sx={{
                my: 2,
                color: isActive("/") ? "yellow" : "white",
                display: "block",
                borderBottom: isActive("/") ? "2px solid yellow" : "none",
              }}
            >
              <FormattedMessage id="navigation.homeBtn" />
            </Button>
            {state.user && (
              <Button
                component={RouterLink}
                to="/favorites"
                sx={{
                  my: 2,
                  color: isActive("/favorites") ? "yellow" : "white",
                  display: "block",
                  borderBottom: isActive("/favorites")
                    ? "2px solid yellow"
                    : "none",
                }}
              >
                <FormattedMessage id="navigation.favoriteBtn" />
              </Button>
            )}
            {!state.user && (
              <Button
                component="button"
                onClick={() => setOpenAuthModal(true)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                <FormattedMessage id="navigation.loginBtn" />
              </Button>
            )}

            <FormControl sx={{ m: 1 }} variant="standard">
              <Select
                value={state.locale}
                onChange={e => setLanguage(e.target.value)}
                disableUnderline
                sx={{
                  color: "white",
                  "& .MuiSvgIcon-root": {
                    display: "none",
                  },
                  "& .MuiSelect-select": {
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                  },
                }}
              >
                <MenuItem value={LOCALES.ENGLISH}>EN</MenuItem>
                <MenuItem value={LOCALES.FRENCH}>FR</MenuItem>
                <MenuItem value={LOCALES.GERMAN}>DE</MenuItem>
              </Select>
            </FormControl>
            {state.user && (
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
                onClick={() => dispatch({ type: "clearUser" })}
              >
                <FormattedMessage id="navigation.logoutBtn" />
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
