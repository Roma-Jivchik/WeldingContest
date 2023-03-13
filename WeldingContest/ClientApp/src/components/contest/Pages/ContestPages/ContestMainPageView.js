import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CustomDataGrid from '../../sub-components/CustomDataGrid';

export class ContestMainPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { field: 'name', headerName: 'Название конкурса', width: 300, sortable: false },
                { field: 'dateOfBegin', headerName: 'Дата начала конкурса', width: 300, sortable: false  },
                { field: 'dateOfEnd', headerName: 'Дата окончания конкурса', width: 300, sortable: false  },
            ],
        }
    }

    render() {
        return (
            <>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button style={{ margin: "10px 10px" }} variant="outlined" href="/Contests/Add">Добавить</Button>
                    </Stack>
                <CustomDataGrid
                    columns={this.state.columns}
                    rows={this.props.contests}
                    handleSelect={ this.props.handleSelect}
                />
                </>
            );
    }
}