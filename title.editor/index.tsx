import {
  ListItem,
  ListItemProps,
  styled,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { forwardRef, memo } from "react";

const ListItemStyled = styled(ListItem)(({ theme }) => ({
  paddingTop: theme.spacing(2),
}));

export type TitleEditorProps = TextFieldProps &
  Pick<ListItemProps, "divider"> & {
    listItemProps?: Omit<ListItemProps, "divider">;
  };

export const TitleEditor = memo(
  forwardRef<HTMLInputElement, TitleEditorProps>(
    ({ listItemProps, divider, ...props }, ref) => {
      return (
        <ListItemStyled divider={divider} {...listItemProps}>
          <TextField ref={ref} fullWidth label="Title" size="small" {...props} />
        </ListItemStyled>
      );
    }
  )
);
