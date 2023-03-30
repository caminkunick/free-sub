import { faSignOut } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuProps,
} from "@mui/material";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useStore } from "../provider";

export type SignedMenuProps = {
  onClose: () => void;
} & Pick<MenuProps, "anchorEl">;
export const SignedMenu = (props: SignedMenuProps) => {
  const { store, dispatch } = useStore();
  const route = useRouter();

  const handleSignOut = async () => {
    props.onClose();
    if (store.auth) {
      await signOut(store.auth);
      dispatch({ type: "auth", value: null });
    }
    route.push("/");
  };

  const content =
    store.signedMenu instanceof Function
      ? store.signedMenu(store.claims)
      : store.signedMenu;

  return (
    <Menu
      open={Boolean(props.anchorEl)}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      MenuListProps={{ disablePadding: true }}
    >
      <List dense disablePadding>
        {content}
        <ListItemButton onClick={handleSignOut} sx={{ color: "error.main" }}>
          <ListItemIcon sx={{ color: "inherit" }}>
            <FontAwesomeIcon icon={faSignOut} />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItemButton>
      </List>
    </Menu>
  );
};
