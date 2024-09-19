import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { Navigation, Footer } from "../index";
import { Box, Container, CssBaseline } from "@mui/material";

const Layout = () => {
  return (
    <>
      <CssBaseline />
      <Navigation />

      <Suspense fallback={<div>Loading page...</div>}>
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
