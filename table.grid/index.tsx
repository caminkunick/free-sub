import { Box, Link as MLink } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import Link from "next/link";
import { FSDate } from "../ctrl/date";
import { FSAction } from "../fs.action";

export type TableGridProps = DataGridProps;
export const TableGrid = (props: TableGridProps) => {
  return (
    <Box sx={{ height: 360 }}>
      <DataGrid
        initialState={{
          sorting: { sortModel: [{ field: "datemodified", sort: "desc" }] },
        }}
        disableRowSelectionOnClick
        {...props}
      />
    </Box>
  );
};

export const genColumn = {
  action: <T extends unknown>(
    actions?: Partial<
      Record<
        "onEdit" | "onRemove" | "onRedo" | "onRemoveTrash",
        (row: T) => void
      >
    >
  ): GridColDef => ({
    field: "action",
    headerName: " ",
    align: "center",
    width: 64,
    sortable: false,
    filterable: false,
    disableColumnMenu: false,
    renderCell: ({ row }) =>
      row.visibility === "trash" ? (
        <></>
      ) : (
        <>
          {actions?.onEdit && (
            <FSAction.Edit onClick={() => actions.onEdit?.(row)} />
          )}
          {actions?.onRemove && (
            <FSAction.Remove onClick={() => actions.onRemove?.(row)} />
          )}
        </>
      ),
  }),
  title: (to?: string | ((id: GridRowId) => string)): GridColDef => ({
    field: "title",
    headerName: "Title",
    renderCell: ({ value, id }) =>
      to ? (
        <MLink
          component={Link}
          href={to instanceof Function ? to(id) : to + `/${id}`}
        >
          {value}
        </MLink>
      ) : (
        value
      ),
    width: 280,
  }),
  date: (): GridColDef => ({
    field: "datemodified",
    headerName: "Date",
    valueGetter: ({ value }) => new FSDate(value).value,
    renderCell: ({ value }) => new FSDate(value).toString(),
    width: 240,
  }),
};
