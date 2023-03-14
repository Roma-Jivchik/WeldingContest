import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import CustomDataGrid from '../../sub-components/CustomDataGrid';
import { SearchBar } from '../../sub-components/SearchBar/SearchBar';
import { SortBar } from '../../sub-components/SortBar/SortBar';

export class ContestantMainPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                { field: 'fullName', headerName: 'ФИО', width: 300, sortable: false },
                { field: 'rfid', headerName: 'RFID', sortable: false },
                { field: 'qr', headerName: 'QR', sortable: false },
                { field: 'company', headerName: 'Компания', width: 300, sortable: false  },
            ],

            searchingMenuItems: [
                { value: 'searched/by-company', label: 'По компании' },
                { value: 'searched/by-rfid', label: 'По RFID' },
                { value: 'searched/by-surname', label: 'По фамилии' },
                { value: 'searched/by-nomination', label: 'По номинации'}
            ],

            sortingMenuItems: [
                { value: 'sorted/by-rfid/?direction=up', label: 'По RFID(Вверх)' },
                { value: 'sorted/by-rfid/?direction=down', label: 'По RFID(Вниз)' },
                { value: 'sorted/by-qr/?direction=up', label: 'По QR(Вверх)' },
                { value: 'sorted/by-qr/?direction=down', label: 'По QR(Вниз)' },
                { value: 'sorted/by-full-name/?direction=up', label: 'По полному имени(Вверх)' },
                { value: 'sorted/by-full-name/?direction=down', label: 'По полному имени(Вниз)' },
                { value: 'sorted/by-company/?direction=up', label: 'По компании(Вверх)' },
                { value: 'sorted/by-company/?direction=down', label: 'По компании(Вниз)' }
            ]
        }
    }

    render() {
        return (
            <>
                <Stack
                    direction="column"
                    spacing={2}
                    justifyItems="center"
                    sx={{
                        marginTop: "10px",
                        marginBottom:"10px"
                    }}
                >
                    <Button hidden={ !this.props.isAdding} style={{ margin: "10px 10px" }} variant="outlined" href="/Contestants/Add">Добавить</Button>
                    <SearchBar menuItems={this.state.searchingMenuItems} setUrl={this.props.setSearchingUrl} reset={ this.props.reset}/>
                    <SortBar menuItems={this.state.sortingMenuItems} setUrl={ this.props.setSortingUrl}/>
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