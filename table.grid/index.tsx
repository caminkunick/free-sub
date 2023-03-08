import { Box } from "@mui/material";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";

export type TableGridProps = DataGridProps;
export const TableGrid = (props: TableGridProps) => {
  return (
    <Box sx={{height:360}}>
      <DataGrid {...props} />
    </Box>
  );
};
