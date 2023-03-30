import { faQuestionCircle } from "@fortawesome/pro-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Dialog,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { FSPopBtn } from "../fs.button";
import { useStore } from "../provider";
import { PopupValue } from "./popup.value";

const DialogStyled = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: theme.spacing(3),
  },
}));

const Content = styled(Stack)(({ theme }) => ({
  width: 360,
  maxWidth: "80vw",
  alignItems: "center",
  padding: theme.spacing(3, 3, 2),
}));
Content.defaultProps = {
  spacing: 2,
};

export const Popup = () => {
  const { store, dispatch } = useStore();
  const [value, setValue] = useState<PopupValue | null>(null);
  const [title, setTitle] = useState<string>("");

  const handleClose = () => {
    dispatch({ type: "popup", value: null });
    setTitle("");
    setTimeout(() => {
      setValue(null);
    }, 1000);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value?.onConfirm) {
      value.onConfirm(title);
    }
    handleClose();
  };

  useEffect(() => {
    if (store.popup) {
      setValue(store.popup);
      if (typeof store.popup.defaultValue === "string") {
        setTitle(store.popup.defaultValue);
      }
    }
  }, [store.popup]);

  return (
    <DialogStyled
      maxWidth="xs"
      open={Boolean(store.popup)}
      onClose={handleClose}
    >
      <Content>
        <FontAwesomeIcon size="2x" icon={value?.icon ?? faQuestionCircle} />
        <Typography variant="h5" fontWeight="bold">
          {value?.title ?? "No Title"}
        </Typography>
        {["alert", "confirm", "remove"].includes(store.popup?.type ?? "") && (
          <Typography variant="body2">
            {value?.text ?? "Description"}
          </Typography>
        )}
        <Box sx={{ width: "100%" }}>
          <form onSubmit={handleSubmit}>
            {value?.type === "prompt" && (
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label={value?.text}
                  autoFocus
                  value={title}
                  onChange={({ target: { value } }) => setTitle(value)}
                />
                <Stack spacing={1}>
                  <FSPopBtn.Confirm />
                  <FSPopBtn.Cancel />
                </Stack>
              </Stack>
            )}
            {value?.type === "remove" && (
              <Stack spacing={1}>
                <FSPopBtn.Remove autoFocus />
                <FSPopBtn.Cancel />
              </Stack>
            )}
          </form>
        </Box>
      </Content>
    </DialogStyled>
  );
};
