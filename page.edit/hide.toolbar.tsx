import {
  Checkbox,
  CheckboxProps,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { forwardRef } from "react";

export const HideToolbar = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => (
    <ListItem divider>
      <ListItemIcon>
        <Checkbox ref={ref} size="small" edge="start" {...props} />
      </ListItemIcon>
      <ListItemText primary="Hide Toolbar" />
    </ListItem>
  )
);
