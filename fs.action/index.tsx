import {
  faArrows,
  faEdit,
  faMobile,
  faTrash,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton, IconButtonProps } from "@mui/material";

export const FSAction = {
  Edit: (props: IconButtonProps) => (
    <IconButton size="small" color="warning" {...props}>
      <FontAwesomeIcon icon={faEdit} />
    </IconButton>
  ),
  Position: (props: IconButtonProps) => (
    <IconButton size="small" color="info" {...props}>
      <FontAwesomeIcon icon={faArrows} />
    </IconButton>
  ),
  ToggleMobilePC: ({ pc, ...props }: IconButtonProps & { pc: boolean }) => (
    <IconButton size="small" color="info" {...props}>
      <FontAwesomeIcon icon={pc ? faTv : faMobile} />
    </IconButton>
  ),
  Remove: (props: IconButtonProps) => (
    <IconButton size="small" color="error" {...props}>
      <FontAwesomeIcon icon={faTrash} />
    </IconButton>
  ),
};
