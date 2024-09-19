import { Box } from "@mui/material";
import errorImg from "../../assets/server_error.svg";

const ServerError = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="img"
        sx={{
          width: "50%",
          opacity: ".4",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        alt="No images."
        src={errorImg}
      />
    </Box>
  );
};

export default ServerError;
