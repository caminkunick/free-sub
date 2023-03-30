import {
  AppBar,
  Avatar,
  AvatarProps,
  Box,
  IconButton,
  IconButtonProps,
  Link,
  LinkProps,
  styled,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignIn, faSpinner } from "@fortawesome/pro-regular-svg-icons";

export const MainAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxSizing: "border-box",
  borderBottom: `solid 1px ${theme.palette.divider}`,
  top: 0,
  zIndex: 1201,
}));
MainAppBar.defaultProps = {
  elevation: 0,
  position: "sticky",
};

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

export type MainContentProps = { dense?: boolean; sidebar?: boolean };
export const MainContent = styled(Box, {
  shouldForwardProp: (prop) => !["dense", "sidebar"].includes(prop.toString()),
})<MainContentProps>(({ theme, dense, sidebar }) => ({
  paddingTop: theme.spacing(dense ? 0 : 6),
  paddingBottom: theme.spacing(6),
  marginLeft: sidebar ? theme.mixins.sidebar.width : 0,
}));

export const BarsButton = (props: IconButtonProps) => (
  <IconButton edge="start" {...props}>
    <FontAwesomeIcon icon={faBars} />
  </IconButton>
);
