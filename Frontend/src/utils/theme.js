import React from "react";
import { createTheme } from "@mui/material/styles";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: "#0f172a",
    },
    background: {
      default: "#0f172a",
    },
    secondary: {
      main: "#0f172a",
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
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
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
      main: "#CBF7ED",
    },
    background: {
      default: "#CBF7ED",
    },
    secondary: {
      main: "#23395B",
    },
    text: {
      primary: "#0f172a",
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
          color: "#0f172a",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          backgroundColor: "#2a9d8f",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          color: "#0f172a",
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
