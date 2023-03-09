import { Box, BoxProps, styled } from "@mui/material";

export const YoutubeContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "aspectRatio",
})<BoxProps & { aspectRatio?: string }>(({ theme, aspectRatio }) => ({
  borderRadius: 16,
  overflow: "hidden",
  position: "relative",
  width: "100%",
  aspectRatio: aspectRatio ?? "16 / 9",
  backgroundColor: theme.palette.grey[600],
  "& iframe": {
    ...theme.mixins.absoluteFluid,
    border: "none",
  },
}));

export const YoutubeIframe = (props: {
  yid?: string | null;
  aspectRatio?: string;
}) => {
  return props.yid ? (
    <YoutubeContainer aspectRatio={props.aspectRatio}>
      <iframe
        src={`https://www.youtube.com/embed/${props.yid}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </YoutubeContainer>
  ) : null;
};
