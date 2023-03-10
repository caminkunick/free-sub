import { PaletteColor, PaletteColorOptions, ThemeOptions } from "@mui/material";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: PaletteColor;
  }
  interface PaletteOptions {
    neutral?: PaletteColorOptions;
  }
}

declare module "@mui/material/styles/createMixins" {
  interface Mixins {
    sidebar: CSSProperties;
    absoluteFluid: CSSProperties;
    fixedFullScreen: CSSProperties;
    flexColumnCenter: CSSProperties;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

declare module "@mui/material/Fab" {
  interface FabPropsColorOverrides {
    neutral: true;
  }
}

export const defaultTheme = (dark?: boolean): ThemeOptions => ({
  mixins: {
    sidebar: {
      width: 272,
    },
    absoluteFluid: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    fixedFullScreen: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
    flexColumnCenter: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  palette: {
    primary: {
      main: "#4285F4",
    },
    success: {
      main: "#34A853",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#FBBC05",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#4285F4",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#EA4335",
      contrastText: "#FFFFFF",
    },
    neutral: {
      main: grey[600],
      contrastText: "#fff",
    },
    background: dark
      ? { default: "#222", paper: "#000" }
      : { default: "#F6F6F6" },
    mode: dark ? "dark" : "light",
  },
  typography: {
    caption: {
      fontSize: 12,
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          width: 48,
          height: 48,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 36,
        },
      },
    },
  },
});
