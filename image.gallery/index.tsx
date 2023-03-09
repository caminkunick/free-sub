import {
  Box,
  Grid,
  GridProps,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { useState } from "react";
import { DialogCompact } from "../dialog.compact";

const ImageGalleryContainerRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(2, 3, 3),
  borderRadius: theme.spacing(2),
  border: `solid 1px ${theme.palette.primary.main}`,
  "& .MuiDivider-root": {
    backgroundColor: theme.palette.primary.main,
  },
}));
export const ImageGalleryContainer = (props: GridProps) => {
  return (
    <ImageGalleryContainerRoot>
      <Grid container spacing={2} {...props} />
    </ImageGalleryContainerRoot>
  );
};

const ImageGalleryTitleTypography = styled(Typography)({});

export const ImageGalleryTitle = (props: TypographyProps) => {
  return (
    <Grid item xs={12}>
      <ImageGalleryTitleTypography
        variant="h5"
        fontWeight="bold"
        {...props}
      />
    </Grid>
  );
};

const ImageGalleryItemRoot = styled(Box)({
  aspectRatio: "1 /1",
  cursor: "pointer",
  transition: "transform 0.25s",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  "&:hover": {
    transform: "scale(1.05, 1.05)",
  },
});

const ImageGalleryItemPopup = (props: {
  open: boolean;
  onClose: () => void;
  src?: string;
}) => {
  return (
    <DialogCompact maxWidth="md" open={props.open} onClose={props.onClose}>
      <img
        src={props.src}
        style={{ height: "calc(100vh - 400px)", objectFit: "contain" }}
      />
    </DialogCompact>
  );
};

export type ImageGalleryItemProps = {
  url?: string;
};

export const ImageGalleryItem = (props: ImageGalleryItemProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <ImageGalleryItemRoot onClick={() => setOpen(true)}>
        {props.url && <img src={props.url} />}
      </ImageGalleryItemRoot>
      <ImageGalleryItemPopup
        src={props.url}
        open={open}
        onClose={() => setOpen(false)}
      />
    </Grid>
  );
};
