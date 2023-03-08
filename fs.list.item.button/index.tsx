import {
  darken,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemText,
  ListItemTextProps,
  styled,
} from "@mui/material";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";

const ListItemButtonStyled = styled(ListItemButton)(({ theme }) => ({
  "&.Mui-selected": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: darken(theme.palette.primary.main, 0.25),
    }
  },
}));

export type FSListItemButtonProps = Omit<ListItemButtonProps, "children"> &
  Pick<ListItemTextProps, "primary" | "secondary"> & {
    icon?: FontAwesomeIconProps["icon"];
    iconProps?: Omit<FontAwesomeIconProps, "icon">;
    textProps?: Omit<ListItemTextProps, "primary" | "secondary">;
  };

export const FSListItemButton = ({
  primary,
  secondary,
  textProps,
  icon,
  iconProps,
  ...props
}: FSListItemButtonProps) => {
  return (
    <ListItemButtonStyled {...props}>
      {icon && (
        <ListItemIcon sx={{ color: "inherit" }}>
          <FontAwesomeIcon icon={icon} {...iconProps} />
        </ListItemIcon>
      )}
      <ListItemText primary={primary} secondary={secondary} {...textProps} />
    </ListItemButtonStyled>
  );
};
