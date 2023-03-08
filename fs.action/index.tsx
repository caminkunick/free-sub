import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, IconButtonProps } from "@mui/material";

export const FSAction = {
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
