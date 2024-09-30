import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";
import { FormattedMessage } from "react-intl";

const Footer = () => {
  return (
    <footer>
      <Box
        sx={{
          backgroundColor: "#f5f5f5",
          padding: "20px 0",
          marginTop: "auto",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="textSecondary" align="center">
            {"© "}
            {"Solod Serg "} {new Date().getFullYear()}
            {".  "}
            <FormattedMessage id="footer.rights" />
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Link
              href="https://solod.netlify.app/"
              color="inherit"
              sx={{ mx: 1 }}
            >
              <FormattedMessage id="footer.about_author" />
            </Link>
            <Link
              href="https://github.com/Solod-S"
              color="inherit"
              sx={{ mx: 1 }}
            >
              Github
            </Link>
            <Link href="#" color="inherit" sx={{ mx: 1 }}>
              <FormattedMessage id="footer.privacy_policy" />
            </Link>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer;
