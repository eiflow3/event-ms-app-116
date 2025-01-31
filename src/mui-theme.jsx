import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/500.css";
import { Padding } from "@mui/icons-material";
import { backdropClasses, createTheme, ThemeProvider } from "@mui/material";

const colors = {
  primary: "#E7473C",
  secondary: "#000",
  bg: "#F0F0F0",
};

export default function ThemeProviderWrapper({ children }) {
  const theme = createTheme({
    typography: {
      two: {
        fontSize: ".8rem",
      },
      three: {
        fontSize: "1.4rem",
      },
      four: {
        fontSize: "1.6rem",
      },
      five: {
        fontSize: "1.8rem",
      },
      six: {
        fontSize: "2rem",
      },
      seven: {
        fontSize: "2.2rem",
      },
      eight: {
        fontSize: "2.4rem",
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Manrope Variable",
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontWeight: 550,
            fontSize: "1rem",
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
            borderRadius: "20px",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            height: "40px",
            "& input": {
              padding: "10px",
              fontSize: ".8rem",
              backDropFilter: "blur(10px)",

            },
            "& .MuiInputBase-root": {
              borderRadius: "8px",
            },
          },
        },
      },
      defaultProps: {
        variantMapping: {
          two: "span",
          three: "span",
          four: "p",
          five: "h4",
          six: "h3",
          seven: "h2",
          eight: "h1",
        },
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
