import { Box, Container, CssBaseline } from "@mui/material";
import { Navigation } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Home, Settings, Recomendation } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Navigation />
      <Box
        sx={{
          backgroundColor: theme => theme.palette.grey[100],
        }}
      >
        <Container maxWidth="xxl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="settings" element={<Settings />} />
            <Route path="recomendation" element={<Recomendation />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
}

export default App;
