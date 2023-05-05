import React from "react";
import { createTheme } from "@mui/material/styles";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#1C2834",
    },
    background: {
      default: "#0D1B2A",
    },
    secondary: {
      main: "#0d1b2a",
    },
    text: {
      primary: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          color: "#FFFFFF",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          backgroundColor: "#023047",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          backgroundColor: "#023047",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          color: "#0d1b2a",
          backgroundColor: "#FFFFFF",
          "&:hover": {
            color: "#FFFFFF",
            backgroundColor: "#0d1b2a",
          },
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          label: {
            color: "#FFFFFF",
          },
          backgroundColor: "#415a77",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          label: {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          label: {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          color: "#FFFFFF",
        },
      },
    },
    MuiIcons: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
  },
});

export const LightTheme = createTheme({
  palette: {
    primary: {
      main: "#1C2834",
    },
    background: {
      default: "#FFFFFF",
    },
    secondary: {
      main: "#e0e1dd",
    },
    text: {
      primary: "#0d1b2a",
    },
  },
  typography: {
    fontFamily: "Poppins",
    color: "#0d1b2a",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          color: "#FFFFFF",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          backgroundColor: "#023047",
          "&:hover": {
            color: "#0d1b2a",
            backgroundColor: "#FFFFFF",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          color: "#FFFFFF",
          backgroundColor: "#1E1E1E",
          label: {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
    MuiIcons: {
      styleOverrides: {
        root: {
          color: "#0f172a",
        },
      },
    },
  },
});
