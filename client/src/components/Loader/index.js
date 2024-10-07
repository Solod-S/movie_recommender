import { Box } from "@mui/material";
import { RotatingLines } from "react-loader-spinner";

const Loader = ({ cardLoader = false }) => (
  <Box
    sx={
      cardLoader
        ? {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }
        : {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // height: "350px",
            width: "100%",
            height: "100vh",
          }
    }
  >
    <RotatingLines
      visible={true}
      height="80"
      width="80"
      strokeColor="#FFBC01"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  </Box>
);

export default Loader;
