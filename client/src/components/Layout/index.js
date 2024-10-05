import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Box, Container, CssBaseline } from "@mui/material";

import Loader from "../Loader/index.js";
import { Navigation, Footer } from "../index";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Navigation />

      <Suspense fallback={<Loader />}>
        <Box
          sx={{
            backgroundColor: theme => theme.palette.grey[100],
          }}
        >
          <Container maxWidth="xxl">
            <Outlet />
          </Container>
        </Box>
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
