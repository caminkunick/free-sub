import { Box, BoxProps, styled } from "@mui/material";
import { FSImage } from "../ctrl/image";

type RootProps = BoxProps & {
  aspectRatio?: string;
  pos?: FSImage["pos"];
};
const Root = styled(Box, {
  shouldForwardProp: (prop) =>
    ["aspectRatio", "pos"].includes(prop.toString()) === false,
})<RootProps>(({ theme, aspectRatio, pos }) => ({
  width: "100%",
  aspectRatio: aspectRatio ?? "1 / 1",
  backgroundColor: theme.palette.background.default,
  flex: "1 0 200px",
  "& img": {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: pos ? `${pos.left} ${pos.top}` : undefined,
  },
}));

export type ImageDisplayProps = {
  src?: string;
  aspectRatio?: string;
  pos?: FSImage["pos"];
};

export const ImageDisplay = (props: ImageDisplayProps) => {
  return (
    <Root aspectRatio={props.aspectRatio} pos={props.pos}>
      {props.src && <img src={props.src} />}
    </Root>
  );
};
