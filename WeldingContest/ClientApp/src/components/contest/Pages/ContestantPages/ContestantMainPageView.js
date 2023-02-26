import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import CustomDataGrid from '../../sub-components/CustomDataGrid';

export class ContestantMainPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { field: 'fullName', headerName: 'ФИО', width: 300 },
                { field: 'rfid', headerName: 'RFID' },
                { field: 'qr', headerName: 'QR' },
                { field: 'company', headerName: 'Компания', width: 300  },
            ],
        }
    }

    render() {
        return (
            <>
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button style={{ margin: "10px 10px" }} variant="outlined" href="/Contestants/Add">Добавить</Button>
                    </Stack>
                <CustomDataGrid
                    columns={this.state.columns}
                    rows={this.props.contestants}
                    handleSelect={ this.props.handleSelect}
                />
                <Pagination count={this.props.pagesNumber} page={ this.props.pageNumber} onChange={ this.props.handleChangePage}/>
                </>
            );
    }
}