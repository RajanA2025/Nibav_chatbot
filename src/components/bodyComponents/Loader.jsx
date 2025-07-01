import { Box } from "@mui/material";
const Loader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <img
        src="https://app.lottiefiles.com/animation/b6f5d59c-4674-452d-8bd9-d7e65c336e2f"
        alt="Loading..."
        style={{
          width: "80px",
          height: "80px",
        }}
      />
    </Box>
  );
};

export default Loader;
