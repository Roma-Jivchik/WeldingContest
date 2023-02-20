import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CustomDataGrid from '../../sub-components/CustomDataGrid';

export class NominationMainPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { field: 'title', headerName: 'Название номинации', width: 300 },
                { field: 'size', headerName: 'Размер образца', width: 200  },
                { field: 'thickness', headerName: 'Толщина образца', width: 200 },
                { field: 'material', headerName: 'Материал образца', width: 200 },
                { field: 'weldingType', headerName: 'Тип сварки', width: 300 },
            ],
        }
    }

    render() {
        return (
            <>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="outlined" href="/Nominations/Add">Добавить</Button>
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