import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import { Button, ButtonProps, ListItem, ListItemProps } from "@mui/material";
import { useRouter } from "next/router";

export type BackLinkProps = ListItemProps & {
  to: string;
  buttonProps?: ButtonProps;
  iconProps?: FontAwesomeIconProps;
};

export const BackLink = ({
  to,
  buttonProps,
  iconProps,
  ...props
}: BackLinkProps) => {
  const router = useRouter();

  return (
    <ListItem {...props}>
      <Button
        color="neutral"
        startIcon={<FontAwesomeIcon icon={faChevronLeft} {...iconProps} />}
        {...buttonProps}
        onClick={() => router.push(to)}
      >
        Back
      </Button>
    </ListItem>
  );
};
