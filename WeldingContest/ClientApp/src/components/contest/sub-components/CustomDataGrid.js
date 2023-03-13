import { DataGrid } from '@mui/x-data-grid';
import { ruRU } from '@mui/x-data-grid';

export default function CustomDataGrid(props) {
    return (
        <DataGrid
            hideFooter
            pageSize={10}
            rowsPerPageOptions={[5, 10, 15, 20]}
            columns={props.columns}
            rows={props.rows}
            disableColumnMenu
            disableSelectionOnClick
            showCellRightBorder
            autoHeight
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            onRowClick={props.handleSelect}
        />
    );
}
