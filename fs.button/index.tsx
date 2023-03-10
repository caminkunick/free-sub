import {
  faCheck,
  faFolderOpen,
  faImage,
  faPlus,
  faShoppingCart,
  faTrash,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonProps } from "@mui/material";
import { FSNumber } from "free-sub/ctrl/number";
import { forwardRef, InputHTMLAttributes, memo } from "react";

export type FSButtonBrowse = InputHTMLAttributes<HTMLInputElement> & {
  buttonProps?: Omit<ButtonProps, "component">;
};

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
  ChangeImage: (props: ButtonProps) => (
    <Button
      fullWidth
      variant="outlined"
      startIcon={<FontAwesomeIcon icon={faImage} />}
      {...props}
    >
      Change
    </Button>
  ),
  Confirm: (props: ButtonProps) => <Button {...props}>Confirm</Button>,
  Close: (props: ButtonProps) => (
    <Button color="neutral" {...props}>
      Close
    </Button>
  ),
  Browse: memo(
    forwardRef<HTMLInputElement, FSButtonBrowse>(
      ({ buttonProps, ...props }, ref) => (
        <label>
          <Button
            variant="outlined"
            component="span"
            startIcon={<FontAwesomeIcon icon={faFolderOpen} />}
            {...buttonProps}
          >
            {buttonProps?.children ?? "Browse"}
          </Button>
          <input
            hidden
            type="file"
            accept="image/jpeg,image/png"
            multiple
            ref={ref}
            {...props}
          />
        </label>
      )
    )
  ),
  Price: ({ price, ...props }: ButtonProps & { price: number }) => (
    <Button
      variant="contained"
      disableElevation
      startIcon={<FontAwesomeIcon icon={faShoppingCart} />}
      sx={{ borderRadius: 16, paddingInline: 3 }}
      {...props}
    >
      {FSNumber.separator(price)}
    </Button>
  ),
  Remove: (props: ButtonProps) => (
    <Button
      variant="outlined"
      color="error"
      startIcon={<FontAwesomeIcon icon={faTrash} />}
      {...props}
    >
      Remove
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
