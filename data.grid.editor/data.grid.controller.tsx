import { GridCellEditStopParams, GridColDef } from "@mui/x-data-grid";
import { md5 } from "../ctrl/md5";
import update from "react-addons-update";
import { genKey } from "./gen.key";

export type DataGridRowType = { [key: string]: string } & { id: string };
export type DataGridValues = {
  rows: DataGridRowType[];
  columns: GridColDef[];
};

export type DataGridStateAction =
  | { type: "update"; value: DataGridState }
  | {
      type: "row.add";
      value: GridCellEditStopParams;
    }
  | { type: "row.insert.before"; value: string }
  | { type: "row.insert.after"; value: string }
  | { type: "row.remove"; value: string }
  | {
      type: "col.update" | "col.insert.before" | "col.insert.after";
      field: string;
      value: Partial<GridColDef>;
    }
  | { type: "col.remove"; value: string }
  | { type: "init"; value: DataGridValues };
export class DataGridState {
  rows: ({ id: string } & Record<string, string>)[];
  columns: GridColDef[];
  hash: string;

  constructor(data?: Partial<DataGridState>) {
    this.rows = data?.rows ?? [{ id: genKey() }, { id: genKey() }];
    this.columns = data?.columns ?? [
      { field: genKey(), headerName: "Column 1", width: 160 },
      { field: genKey(), headerName: "Column 2", width: 160 },
    ];
    this.hash = this.genHash();
  }

  genHash() {
    return md5(JSON.stringify({ rows: this.rows, columns: this.columns }));
  }

  init(data: DataGridValues): DataGridState {
    this.columns = data.columns;
    this.rows = data.rows;
    return new DataGridState(this);
  }

  Row() {
    return {
      change: (
        params: GridCellEditStopParams<any, any, any>
      ): DataGridState => {
        this.rows = this.rows.map((row) =>
          row.id === params.field
            ? update(row, { [params.field]: { $set: params.value } })
            : row
        );
        this.hash = this.genHash();
        return new DataGridState(this);
      },
      insertBefore: (id: string): DataGridState => {
        const index = this.rows.findIndex((row) => row.id === id);
        let rows = [...this.rows];
        rows.splice(index, 0, { id: genKey() });
        this.rows = rows;
        return new DataGridState(this);
      },
      insertAfter: (id: string): DataGridState => {
        const index = this.rows.findIndex((row) => row.id === id);
        let rows = [...this.rows];
        rows.splice(index + 1, 0, { id: genKey() });
        this.rows = rows;
        return new DataGridState(this);
      },
      remove: (key: string): DataGridState => {
        this.rows = this.rows.filter((row) => row.id !== key);
        return new DataGridState(this);
      },
    };
  }

  Column() {
    return {
      getIndex: (field: string): number =>
        this.columns.findIndex((col) => col.field === field),
      update: (field: string, column: Partial<GridColDef>): DataGridState => {
        const index = this.Column().getIndex(field);
        this.columns[index] = Object.assign(this.columns[index], column);
        return new DataGridState(this);
      },
      insertBefore: (
        field: string,
        column: Partial<GridColDef>
      ): DataGridState => {
        const index = this.Column().getIndex(field);
        this.columns.splice(
          index,
          0,
          Object.assign(column, { field: genKey() })
        );
        this.columns = this.columns.filter(
          (column, index, columns) =>
            columns.findIndex((c) => c.field === column.field) === index
        );
        return new DataGridState(this);
      },
      insertAfter: (
        field: string,
        column: Partial<GridColDef>
      ): DataGridState => {
        const index = this.Column().getIndex(field);
        this.columns.splice(
          index + 1,
          0,
          Object.assign(column, { field: genKey() })
        );
        this.columns = this.columns.filter(
          (column, index, columns) =>
            columns.findIndex((c) => c.field === column.field) === index
        );
        return new DataGridState(this);
      },
      remove: (field: string): DataGridState => {
        this.columns = this.columns.filter((column) => column.field !== field);
        return new DataGridState(this);
      },
    };
  }

  static reducer(
    state: DataGridState,
    action: DataGridStateAction
  ): DataGridState {
    switch (action.type) {
      case "update":
        return new DataGridState({
          ...action.value,
          hash: action.value.genHash(),
        });
      case "row.add":
        return state.Row().change(action.value);
      case "row.insert.before":
        return state.Row().insertBefore(action.value);
      case "row.insert.after":
        return state.Row().insertBefore(action.value);
      case "row.remove":
        return state.Row().remove(action.value);
      case "col.update":
        return state.Column().update(action.field, action.value);
      case "col.insert.before":
        return state.Column().insertBefore(action.field, action.value);
      case "col.insert.after":
        return state.Column().insertAfter(action.field, action.value);
      case "col.remove":
        return state.Column().remove(action.value);
      case "init":
        return state.init(action.value);
      default:
        return state;
    }
  }
}
