import { faSignOut } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuProps,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { useStore } from "../provider";

export type SignedMenuProps = {
  onClose: () => void;
} & Pick<MenuProps, "anchorEl">;
export const SignedMenu = (props: SignedMenuProps) => {
  const { store } = useStore();

  const handleSignOut = () => {
    props.onClose();
    store.auth && signOut(store.auth);
  };

  return (
    <Menu
      open={Boolean(props.anchorEl)}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      MenuListProps={{ dense: true, disablePadding: true }}
    >
      <ListItemButton onClick={handleSignOut} sx={{ color: "error.main" }}>
        <ListItemIcon sx={{ color: "inherit" }}>
          <FontAwesomeIcon icon={faSignOut} />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItemButton>
    </Menu>
  );
};
