import { DataGrid } from '@mui/x-data-grid';
import CustomToolbar from './CustomToolbar';
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
            components={{
                Toolbar: CustomToolbar,
            }}
            componentsProps={{ toolbar: { printOptions: { hideToolbarButton: true } } }}
            autoHeight
            localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
            onRowClick={props.handleSelect}
        />
    );
}
