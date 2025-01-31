import { LinearProgress, Box } from "@mui/material";

export default function LoginLoader() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
      }}
    >
      <LinearProgress
        sx={{ width: "100%", position: "fixed" }}
      ></LinearProgress>
    </Box>
  );
}
