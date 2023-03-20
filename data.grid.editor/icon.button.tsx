import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton as IC, IconButtonProps, styled } from "@mui/material";

export const IconButton = styled(
  ({
    icon,
    ...props
  }: Omit<IconButtonProps, "children"> & { icon: IconDefinition }) => (
    <IC size="small" {...props}>
      <FontAwesomeIcon size="sm" icon={icon} />
    </IC>
  )
)({
  width: 24,
  height: 24,
});
