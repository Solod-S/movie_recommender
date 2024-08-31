import { Link as RoterLink } from "react-router-dom";
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
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import { LOCALES } from "../../constants";

import { useCallback, useContext, useState } from "react";
import { AppContext } from "../../appContext";

const Navigation = () => {
  const [isDrawerOpen, setisDrawerOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);

  const setLanguage = useCallback(locale => {
    dispatch({
      type: "setLocale",
      locale,
    });
  }, []);

  const renderListItems = () => (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem disablePadding>
          <ListItemButton component={RoterLink} to="/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Hidden only={["lg", "xl"]}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setisDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>

          <Link component={RoterLink} to="/">
            <Typography
              variant="h6"
              component="div"
              sx={{ color: "white", flexGrow: 1 }}
            >
              Movies recomendation
            </Typography>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", lg: "flex" },
              justifyContent: "end",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Button
                disabled={state.locale === LOCALES.ENGLISH}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => setLanguage(LOCALES.ENGLISH)}
              >
                English
              </Button>
              <Button
                disabled={state.locale === LOCALES.FRENCH}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => setLanguage(LOCALES.FRENCH)}
              >
                French
              </Button>
            </Box>
            <Button
              component={RoterLink}
              to="/settings"
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Settings
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={() => setisDrawerOpen(false)}
      >
        {renderListItems()}
      </Drawer>
    </Box>
  );
};

export default Navigation;
