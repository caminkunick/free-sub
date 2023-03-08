import { ThemeOptions } from "@mui/material";

declare module "@mui/material/styles/createMixins" {
  interface Mixins {
    sidebar: CSSProperties;
    absoluteFluid: CSSProperties;
    flexMiddle: CSSProperties;
  }
}

export const defaultTheme = (dark?: boolean): ThemeOptions => ({
  mixins: {
    sidebar: {
      width: 252
    }
  },
  palette: {
    mode: dark ? "dark" : "light",
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        sizeMedium: {
          width: 48,
          height: 48
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 36
        }
      }
    }
  }
});
