import { Box, styled } from "@mui/material";

const Root = styled(Box)(({ theme }) => ({
  ...theme.mixins.fixedFullScreen,
  ...theme.mixins.flexColumnCenter,
  backgroundColor: theme.palette.background.paper,
}));

const LoadingIcon = styled((props) => (
  <div {...props}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
))({
  display: "inline-block",
  position: "relative",
  width: 80,
  height: 80,
  "& div": {
    position: "absolute",
    top: 33,
    width: 13,
    height: 13,
    borderRadius: "50%",
    background: "#fff",
    animationTimingFunction: "cubic-bezier(0, 1, 1, 0)",
  },
  "& div:nth-of-type(1)": {
    left: 8,
    animation: "lds-ellipsis1 0.6s infinite",
  },
  "& div:nth-of-type(2)": {
    left: 8,
    animation: "lds-ellipsis2 0.6s infinite",
  },
  "& div:nth-of-type(3)": {
    left: 32,
    animation: "lds-ellipsis2 0.6s infinite",
  },
  "& div:nth-of-type(4)": {
    left: 56,
    animation: "lds-ellipsis3 0.6s infinite",
  },
  "@keyframes lds-ellipsis1": {
    "0%": {
      transform: "scale(0)",
    },
    "100%": {
      transform: "scale(1)",
    },
  },
  "@keyframes lds-ellipsis3": {
    "0%": {
      transform: "scale(1)",
    },
    "100%": {
      transform: "scale(0)",
    },
  },
  "@keyframes lds-ellipsis2": {
    "0%": {
      transform: "translate(0, 0)",
    },
    "100%": {
      transform: "translate(24px, 0)",
    },
  },
});

export const Loading = () => {
  return (
    <Root>
      <LoadingIcon />
    </Root>
  );
};
