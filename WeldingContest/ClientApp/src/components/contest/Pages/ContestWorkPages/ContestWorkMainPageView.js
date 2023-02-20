﻿import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CustomDataGrid from '../../sub-components/CustomDataGrid';

export class ContestWorkMainPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    field: 'contest',
                    headerName: 'Название конкурса',
                    width: 300,
                    valueGetter: (params) =>
                        `${params.row.contest.name}`
                },
                {
                    field: 'contestant',
                    headerName: 'Номер конкурсанта',
                    width: 200,
                    valueGetter: (params) =>
                        `${params.row.contestant.rfid}`
                },
                {
                    field: 'nomination',
                    headerName: 'Название номинации',
                    width: 200,
                    valueGetter: (params) =>
                        `${params.row.nomination.title}`
                },
            ],
        }
    }

    render() {
        return (
            <>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button variant="outlined" href="/ContestWorks/Add">Добавить</Button>
                    </Stack>
                <CustomDataGrid
                    columns={this.state.columns}
                    rows={this.props.contestWorks}
                    handleSelect={ this.props.handleSelect}
                />
                </>
            );
    }
}