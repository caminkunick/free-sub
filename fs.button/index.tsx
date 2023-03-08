import {
  faCheck,
  faPlus,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "@mui/material";

export const FSButton = {
  Add: (props: ButtonProps) => (
    <Button
      variant="outlined"
      startIcon={<FontAwesomeIcon icon={faPlus} />}
      {...props}
    >
      Add
    </Button>
  ),
  Ok: (props: ButtonProps) => (
    <Button
      fullWidth
      variant="contained"
      disableElevation
      startIcon={<FontAwesomeIcon icon={faCheck} />}
      size="large"
      type="submit"
      {...props}
    >
      Ok
    </Button>
  ),
};

export const FSPopBtn = {
  Ok: (props: ButtonProps) => (
    <Button
      fullWidth
      variant="contained"
      disableElevation
      startIcon={<FontAwesomeIcon icon={faCheck} />}
      size="large"
      type="submit"
      {...props}
    >
      Ok
    </Button>
  ),
  Confirm: (props: ButtonProps) => (
    <Button
      fullWidth
      variant="contained"
      disableElevation
      startIcon={<FontAwesomeIcon icon={faCheck} />}
      size="large"
      type="submit"
      {...props}
    >
      Confirm
    </Button>
  ),
  Remove: (props: ButtonProps) => (
    <Button
      fullWidth
      variant="contained"
      disableElevation
      startIcon={<FontAwesomeIcon icon={faTrash} />}
      size="large"
      type="submit"
      color="error"
      {...props}
    >
      Remove
    </Button>
  ),
  Cancel: (props: ButtonProps) => (
    <Button
      fullWidth
      startIcon={<FontAwesomeIcon icon={faXmark} />}
      size="large"
      type="button"
      {...props}
    >
      Cancel
    </Button>
  ),
};
