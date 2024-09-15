import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Hidden,
  Link,
  Select,
  MenuItem,
  FormControl,
  Avatar,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { LOCALES } from "../../constants";

import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../providers/appContext";

import translate from "../../utils/translate";

import banner from "../../assets/banner.jpg";
import logo from "../../assets/movie-logo.png";

const Navigation = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  const renderListItems = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RouterLink} to="/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={translate("navigation.settings")} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
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
        }}
      >
        <Toolbar>
          <Hidden only={["lg", "xl"]}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setIsDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Link component={RouterLink} to="/">
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "white", flexGrow: 1 }}
            >
              <Avatar
                src={logo}
                style={{
                  height: "140px",
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: "0",
                }}
              />
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
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

            {/* <Button
              component={RouterLink}
              to="/settings"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <FormattedMessage id="navigation.settings" />
            </Button> */}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {renderListItems()}
      </Drawer>
    </Box>
  );
};

export default Navigation;
