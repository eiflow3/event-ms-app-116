import { useState, useEffect } from "react";
import ThemeProviderWrapper from "./mui-theme";
import RouterProviderWrapper from "./routes/router-provider";
import { Typography } from "@mui/material";
import UseStateStore from "./state-store"; // state store import

// components

function App() {

  return (
    <ThemeProviderWrapper>
      <RouterProviderWrapper />
    </ThemeProviderWrapper>
  );
}

export default App;
