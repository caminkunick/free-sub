import { BoxProps } from "@mui/material";
import * as React from "react";
import { DataGridState, DataGridStateAction, DataGridValues } from "./data.grid.controller";

export interface DataGridEditorProps {
  value?: DataGridValues;
  onChange?: (data: DataGridValues) => void;
  view?: boolean;
  componentProps?: {
    rootProps?: BoxProps;
  };
}

export interface DataGridEditorContextTypes
  extends Pick<DataGridEditorProps, "onChange"> {
  data: DataGridState;
  setData: React.Dispatch<DataGridStateAction>;
}
export const DataGridEditorContext =
  React.createContext<DataGridEditorContextTypes>({
    data: new DataGridState(),
    setData: () => {},
  });

export const useDGE = () => React.useContext(DataGridEditorContext);
