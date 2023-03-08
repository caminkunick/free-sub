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
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

export const defaultTheme = (dark?: boolean): ThemeOptions => ({
  mixins: {
    sidebar: {
      width: 252,
    },
    absoluteFluid: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
    },
  },
  palette: {
    neutral: {
      main: grey[600],
      contrastText: "#fff",
    },
    mode: dark ? "dark" : "light",
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
