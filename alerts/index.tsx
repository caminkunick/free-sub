import { Alert, AlertColor, Box, Snackbar, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { genKey } from "draft-js";
import { useStore } from "free-sub/provider";

export class AlertItemValue {
  label: React.ReactNode;
  severity: AlertColor;
  key: string;

  constructor(data?: Partial<AlertItemValue>) {
    this.label = data?.label ?? "";
    this.severity = data?.severity ?? "success";
    this.key = data?.key ?? genKey();
  }
}

const AlertIitem = ({ item }: { item: AlertItemValue }) => {
  const { dispatch } = useStore();

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: "removealert", value: item.key });
    }, 5000);
  }, [item, dispatch]);

  return (
    <Alert
      variant="filled"
      onClose={() => dispatch({ type: "removealert", value: item.key })}
    >
      {item.label}
    </Alert>
  );
};

export const Alerts = () => {
  const { store } = useStore();

  return (
    <Snackbar
      open={Boolean(store.alerts.length)}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Box>
        <Stack spacing={1}>
          {store.alerts.map((item) => (
            <AlertIitem item={item} key={item.key} />
          ))}
        </Stack>
      </Box>
    </Snackbar>
  );
};
