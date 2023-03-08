import {
  AppBar,
  Avatar,
  AvatarProps,
  IconButton,
  IconButtonProps,
  Link,
  LinkProps,
  styled,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faSpinner } from "@fortawesome/free-solid-svg-icons";

export const MainAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxSizing: "border-box",
  borderBottom: `solid 1px ${theme.palette.divider}`,
  top: 0
}));
MainAppBar.defaultProps = {
  elevation: 0,
  position: "sticky"
}

export const UserButton = {
  Signed: ({ src, ...props }: IconButtonProps & Pick<AvatarProps, "src">) => (
    <IconButton edge="end" {...props}>
      <Avatar src={src} />
    </IconButton>
  ),
  Unsigned: ({ href, ...props }: IconButtonProps & Pick<LinkProps, "href">) => (
    <Link href={href}>
      <IconButton edge="end" {...props}>
        <Avatar>
          <FontAwesomeIcon icon={faSignIn} />
        </Avatar>
      </IconButton>
    </Link>
  ),
  Loading: () => (
    <IconButton edge="end" disabled>
      <Avatar>
        <FontAwesomeIcon icon={faSpinner} pulse />
      </Avatar>
    </IconButton>
  ),
};
