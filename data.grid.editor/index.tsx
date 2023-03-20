import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { DataGridEditorContext, DataGridEditorProps } from "./context";
import { DataGridState } from "./data.grid.controller";
import { Box, Typography } from "@mui/material";
import { IconButton } from "./icon.button";
import { ColAction, ColMenu } from "./col.menu";
import { ColEdit } from "./col.edit";
import { RowAction, RowMenu } from "./row.menu";
import { DGETable } from "./table";
import { useStore } from "../provider";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

export { DGETable } from "./table";
export * from "./context";
export const DataGridEditor = (props: DataGridEditorProps) => {
  const { dispatch } = useStore();
  const [data, setData] = React.useReducer(
    DataGridState.reducer,
    new DataGridState()
  );
  const [rowMenu, setRowMenu] = React.useState<{
    anchorEl: Element | null;
    key: string;
  }>({ anchorEl: null, key: "" });
  const [colMenu, setColMenu] = React.useState<{
    anchorEl: null | Element;
    key: string;
  }>({ anchorEl: null, key: "" });
  const [colEdit, setColEdit] = React.useState<{
    type?: ColAction;
    open: boolean;
    key: string;
    value: Partial<GridColDef>;
  }>({
    open: false,
    key: "",
    value: {},
  });

  const handleOpenRowMenu =
    (key: string) =>
    ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) =>
      setRowMenu({ anchorEl: currentTarget, key });
  const handleCloseRowMenu = () => setRowMenu({ anchorEl: null, key: "" });
  const handleRowAction = (action: RowAction) => () => {
    switch (action) {
      case "insertbefore":
        (() => {
          handleCloseRowMenu();
          setData({ type: "row.insert.before", value: rowMenu.key });
          props.onChange?.(data);
        })();
        return;
      case "insertafter":
        (() => {
          handleCloseRowMenu();
          setData({ type: "row.insert.after", value: rowMenu.key });
          props.onChange?.(data);
        })();
        return;
      case "remove":
        (() => {
          handleCloseRowMenu();
          setData({ type: "row.remove", value: rowMenu.key });
          props.onChange?.(data);
        })();
        return;
      default:
        return dispatch({
          type: "addalert",
          value: "Invalid Type",
          severity: "error",
        });
    }
  };

  const handleOpenColMenu =
    (key: string) =>
    ({ currentTarget }: React.MouseEvent<HTMLButtonElement>) =>
      setColMenu({ anchorEl: currentTarget, key });
  const handleCloseColMenu = () => setColMenu({ anchorEl: null, key: "" });
  const handleColAction = (type: ColAction) => () => {
    switch (type) {
      case "edit":
        return setColEdit({
          type: "edit",
          open: true,
          key: colMenu.key,
          value: data.columns.find((col) => col.field === colMenu.key) || {},
        });
      case "insertbefore":
        return setColEdit({
          type: "insertbefore",
          open: true,
          key: colMenu.key,
          value: {},
        });
      case "insertafter":
        return setColEdit({
          type: "insertafter",
          open: true,
          key: colMenu.key,
          value: {},
        });
      case "remove":
        (() => {
          handleCloseColMenu();
          setData({ type: "col.remove", value: colMenu.key });
          props.onChange?.(data);
        })();
        return;
      default:
        return dispatch({
          type: "addalert",
          value: "Invalid Type",
          severity: "error",
        });
    }
  };
  const handleCloseColEdit = () =>
    setColEdit((d) => ({ ...d, open: false, key: "", value: {} }));
  const handleColEditChange = (column: Partial<GridColDef>) => {
    if (colEdit.type === "edit" && column.field) {
      setData({ type: "col.update", field: column.field, value: column });
      props.onChange?.(data);
    } else if (colEdit.type === "insertbefore" && colMenu.key) {
      setData({ type: "col.insert.before", field: colMenu.key, value: column });
      props.onChange?.(data);
    } else if (colEdit.type === "insertafter" && colMenu.key) {
      setData({ type: "col.insert.after", field: colMenu.key, value: column });
      props.onChange?.(data);
    }
    handleCloseColEdit();
    handleCloseColMenu();
  };

  React.useEffect(() => {
    if (props.value && JSON.stringify(props.value)) {
      setData({ type: "init", value: props.value });
    }
  }, [props.value]);

  return (
    <DataGridEditorContext.Provider value={{ ...props, data, setData }}>
      {props.view ? (
        <DGETable
          rows={data.rows}
          columns={data.columns.map((column) => ({
            ...column,
            headerAlign: column.align ?? "center",
          }))}
        />
      ) : (
        <DataGrid
          rows={data.rows}
          columns={(props.view
            ? []
            : ([
                {
                  field: "action",
                  headerName: " ",
                  width: 36,
                  renderCell: ({ row }) => (
                    <IconButton
                      icon={faEllipsisV}
                      onClick={handleOpenRowMenu(row.id)}
                    />
                  ),
                  align: "center",
                },
              ] as GridColDef[])
          )
            .concat(
              data.columns.map(
                (column): GridColDef => ({
                  ...column,
                  editable: props.view !== true ? true : false,
                  sortable: false,
                  renderHeader: (col) => {
                    return (
                      <Box
                        sx={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="inherit"
                          noWrap
                          sx={{ flex: 1 }}
                          textAlign={column.align}
                        >
                          {column.headerName}
                        </Typography>
                        {props.view !== true && (
                          <IconButton
                            icon={faEllipsisV}
                            onClick={handleOpenColMenu(col.field)}
                          />
                        )}
                      </Box>
                    );
                  },
                })
              )
            )
            .map((doc) => {
              if (doc.align && typeof doc.align !== "string") {
                delete doc.align;
              }
              return doc;
            })}
          autoHeight
          disableRowSelectionOnClick
          hideFooter
          onCellEditStop={(params) =>
            setData({ type: "row.add", value: params })
          }
          disableColumnMenu
          sx={{
            "& .MuiDataGrid-columnHeaderTitleContainerContent": {
              width: "100%",
            },
          }}
        />
      )}
      <ColMenu
        anchorEl={colMenu.anchorEl}
        onClose={handleCloseColMenu}
        onColAction={handleColAction}
        disableRemove={data.columns.length < 2}
      />
      <ColEdit
        open={colEdit.open}
        value={colEdit.value}
        onClose={handleCloseColEdit}
        onChange={handleColEditChange}
      />
      <RowMenu
        anchorEl={rowMenu.anchorEl}
        onClose={handleCloseRowMenu}
        onRowAction={handleRowAction}
        disabledRemove={data.rows.length < 2}
      />
    </DataGridEditorContext.Provider>
  );
};
