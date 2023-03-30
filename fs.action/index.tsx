import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEdit, faTrash } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, IconButtonProps } from "@mui/material";

export const FSAction = {
  Icon: ({ icon, ...props }: IconButtonProps & { icon: IconDefinition }) => (
    <IconButton size="small" {...props}>
      <FontAwesomeIcon icon={icon} />
    </IconButton>
  ),
  Edit: (props: IconButtonProps) => (
    <IconButton size="small" color="warning" {...props}>
      <FontAwesomeIcon icon={faEdit} />
    </IconButton>
  ),
  Remove: (props: IconButtonProps) => (
    <IconButton size="small" color="error" {...props}>
      <FontAwesomeIcon icon={faTrash} />
    </IconButton>
  ),
};
