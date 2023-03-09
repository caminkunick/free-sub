import {
  alpha,
  Box,
  CircularProgress,
  styled,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

const CardItemRoot = styled(Box)(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px ${theme.palette.divider}`,
  aspectRatio: "1 / 1",
  backgroundSize: "cover",
  borderRadius: "10%",
  transition: "transform 0.25s",
  "&:hover": {
    cursor: "pointer",
    transform: "scale(1.05,1.05)",
  },
}));

const CardItemText = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 0.75),
  backdropFilter: "blur(3px)",
  position: "absolute",
  top: 16,
  left: 16,
  width: "calc(100% - 32px)",
  padding: theme.spacing(1, 2),
  borderRadius: 16,
}));

const CardItemActions = styled(Box)({
  position: "absolute",
  bottom: 16,
  right: 16,
});

export type CardItemProps = {
  image?: string;
  primary?: ReactNode;
  secondary?: ReactNode;
  actions?: ReactNode;
  onClick?: () => void
};
export const CardItem = (props: CardItemProps) => {
  return (
    <CardItemRoot
      sx={{
        backgroundImage: props.image ? `url("${props.image}")` : undefined,
      }}
      onClick={props.onClick}
    >
      <CardItemText>
        {props.primary && (
          <Typography variant="h6" fontWeight="bold">
            {props.primary}
          </Typography>
        )}
        {props.secondary && <Typography>{props.secondary}</Typography>}
      </CardItemText>
      {props.actions && <CardItemActions>{props.actions}</CardItemActions>}
    </CardItemRoot>
  );
};

export const CardItemLoading = () => {
  return (
    <CardItemRoot sx={(theme) => ({ ...theme.mixins.flexColumnCenter })}>
      <CircularProgress size={96} color="inherit" />
    </CardItemRoot>
  );
};
