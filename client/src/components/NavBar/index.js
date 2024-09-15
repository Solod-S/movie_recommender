import { Link as RouterLink } from "react-router-dom";
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
} from "@mui/material";
import { LOCALES } from "../../constants";
import { useCallback, useContext } from "react";
import { AppContext } from "../../providers/appContext";
import { framerLogoVariants } from "../../constants";
import banner from "../../assets/banner.jpg";
import logo from "../../assets/movie-logo.png";

const MotionLogo = motion(Avatar);

const Navigation = () => {
  const { state, dispatch } = useContext(AppContext);

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
      <AppBar
        position="static"
        sx={{
          minHeight: 150,
          backgroundImage: `url(${banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Toolbar>
          <Hidden only={["lg", "xl"]}>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
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
                    height: "60px",
                    width: "auto",
                    objectFit: "contain",
                    borderRadius: "0",
                    zIndex: 1,
                  }}
                />
              </Link>
            </Box>
          </Hidden>

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
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navigation;
