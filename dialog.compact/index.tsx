import { faImage } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import {
  Box,
  BoxProps,
  Dialog,
  DialogActions,
  DialogProps,
  Grow,
  styled,
  Typography,
  TypographyProps,
} from "@mui/material";
import { FSButton } from "free-sub/fs.button";
import { ReactNode } from "react";

const DialogStyled = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    padding: theme.spacing(3, 3, 0),
    borderRadius: theme.spacing(4),
  },
}));

const Title = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  gap: 8,
  marginBottom: theme.spacing(4),
}));

export type DialogCompactProps = {
  children?: ReactNode;
  title?: ReactNode;
  icon?: IconDefinition;
  actions?: ReactNode;
  componentProps?: {
    dialog?: DialogProps;
    titleRoot?: BoxProps;
    icon?: FontAwesomeIconProps;
    title?: TypographyProps;
  };
} & Pick<DialogProps, "maxWidth" | "onClose" | "open">;

export const DialogCompact = (props: DialogCompactProps) => {
  return (
    <DialogStyled
      fullWidth
      TransitionComponent={Grow}
      {...props.componentProps?.dialog}
      maxWidth={props.maxWidth ?? "xs"}
      open={props.open}
      onClose={props.onClose}
    >
      <Title {...props.componentProps?.titleRoot}>
        <FontAwesomeIcon
          size="3x"
          icon={faImage}
          {...props.componentProps?.icon}
        />
        <Typography
          variant="h4"
          fontWeight="bold"
          {...props.componentProps?.title}
        >
          {props.title}
        </Typography>
      </Title>
      {props.children}
      <DialogActions>
        <Box flex={1} />
        {props.actions}
        <FSButton.Close onClick={() => props.onClose?.({}, "escapeKeyDown")} />
      </DialogActions>
    </DialogStyled>
  );
};
