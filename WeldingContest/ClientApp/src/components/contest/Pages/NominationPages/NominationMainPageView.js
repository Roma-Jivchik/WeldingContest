import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CustomDataGrid from '../../sub-components/CustomDataGrid';

export class NominationMainPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { field: 'title', headerName: 'Название номинации', width: 200, sortable: false },
                { field: 'size', headerName: 'Размер образца', width: 200, sortable: false  },
                { field: 'thickness', headerName: 'Толщина образца', width: 200, sortable: false },
                { field: 'material', headerName: 'Материал образца', width: 200, sortable: false },
                { field: 'weldingType', headerName: 'Тип сварки', width: 200, sortable: false },
                { field: 'sampleType', headerName: 'Тип образца', width: 200, sortable: false },
            ],
        }
    }

    render() {
        return (
            <>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button hidden={ !this.props.isAdding} style={{ margin: "10px 10px" }} variant="outlined" href="/Nominations/Add">Добавить</Button>
                    </Stack>
                <CustomDataGrid
                    columns={this.state.columns}
                    rows={this.props.nominations}
                    handleSelect={ this.props.handleSelect}
                />
                </>
            );
    }
}