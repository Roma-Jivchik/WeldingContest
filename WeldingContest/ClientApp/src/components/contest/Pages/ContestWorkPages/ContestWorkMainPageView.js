import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
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
                    <Button style={{ margin: "10px 10px" }} variant="outlined" href="/ContestWorks/Add">Добавить</Button>
                    </Stack>
                <CustomDataGrid
                    columns={this.state.columns}
                    rows={this.props.contestWorks}
                    handleSelect={ this.props.handleSelect}
                />
                <Pagination count={this.props.pagesNumber} page={this.props.pageNumber} onChange={this.props.handleChangePage} />
                </>
            );
    }
}