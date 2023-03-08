import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/material";

export const FSButton = {
  Add: () => (
    <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faPlus} />}>
      Add
    </Button>
  ),
};
