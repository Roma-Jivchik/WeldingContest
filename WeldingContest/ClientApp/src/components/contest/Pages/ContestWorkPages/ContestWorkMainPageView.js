import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import CustomDataGrid from '../../sub-components/CustomDataGrid';
import { SearchBar } from '../../sub-components/SearchBar/SearchBar';
import { SortBar } from '../../sub-components/SortBar/SortBar';

export class ContestWorkMainPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    field: 'contest',
                    headerName: 'Название конкурса',
                    width: 200,
                    valueGetter: (params) =>
                        `${params.row.contest.name}`,
                    sortable: false
                },
                {
                    field: 'contestantRFID',
                    headerName: 'Номер конкурсанта',
                    width: 160,
                    valueGetter: (params) =>
                        `${params.row.contestant.rfid}`,
                    sortable: false
                },
                {
                    field: 'contestantFullName',
                    headerName: 'ФИО',
                    width: 200,
                    valueGetter: (params) =>
                        `${params.row.contestant.fullName}`,
                    sortable: false
                },
                {
                    field: 'contestantCompany',
                    headerName: 'Компания',
                    width: 200,
                    valueGetter: (params) =>
                        `${params.row.contestant.company}`,
                    sortable: false
                },
                {
                    field: 'nominationTitle',
                    headerName: 'Название номинации',
                    width: 180,
                    valueGetter: (params) =>
                        `${params.row.nomination.title}`,
                    sortable: false
                },
                {
                    field: 'nominationWeldingType',
                    headerName: 'Тип сварки',
                    width: 150,
                    valueGetter: (params) =>
                        `${params.row.nomination.weldingType}`,
                    sortable: false
                },
                {
                    field: 'nominationSampleType',
                    headerName: 'Тип образца',
                    width: 150,
                    valueGetter: (params) =>
                        `${params.row.nomination.sampleType}`,
                    sortable: false
                },
            ],

            searchingMenuItems: [
                { value: 'searched/by-contestTitle', label: 'По названию конкурса' },
                { value: 'searched/by-contestantRFID', label: 'По RFID конкурсанта' },
                { value: 'searched/by-contestantSurname', label: 'По фамилии конкурсанта' },
                { value: 'searched/by-contestantCompany', label: 'По компании конкурсанта' },
                { value: 'searched/by-nominationTitle', label: 'По названию номинации' },
                { value: 'searched/by-sampleType', label: 'По типу образца' },
                { value: 'searched/by-weldingType', label: 'По типу сварки' }
            ],

            sortingMenuItems: [
                { value: 'sorted/by-contest-name/?direction=up', label: 'По названию конкурса(Вверх)' },
                { value: 'sorted/by-contest-name/?direction=down', label: 'По названию конкурса(Вниз)' },
                { value: 'sorted/by-contestant-full-name/?direction=up', label: 'По полному имени конкурсанта(Вверх)' },
                { value: 'sorted/by-contestant-full-name/?direction=down', label: 'По полному имени конкурсанта(Вниз)' },
                { value: 'sorted/by-contestant-company/?direction=up', label: 'По компании конкурсанта(Вверх)' },
                { value: 'sorted/by-contestant-company/?direction=down', label: 'По компании конкурсанта(Вниз)' },
                { value: 'sorted/by-nomination-title/?direction=up', label: 'По названию номинации(Вверх)' },
                { value: 'sorted/by-nomination-title/?direction=down', label: 'По названию номинации(Вниз)' },
                { value: 'sorted/by-sample-type/?direction=up', label: 'По типу образца(Вверх)' },
                { value: 'sorted/by-sample-type/?direction=down', label: 'По типу образца(Вниз)' },
                { value: 'sorted/by-welding-type/?direction=up', label: 'По типу сварки(Вверх)' },
                { value: 'sorted/by-welding-type/?direction=down', label: 'По типу сварки(Вниз)' }
            ]
        }
    }

    render() {
        return (
            <>
                <Stack direction="column" spacing={2} justifyContent="center">
                    <Button style={{ margin: "10px 10px" }} variant="outlined" href="/ContestWorks/Add">Добавить</Button>
                    <SearchBar menuItems={this.state.searchingMenuItems} setUrl={this.props.setSearchingUrl} reset={this.props.reset} />
                    <SortBar menuItems={this.state.sortingMenuItems} setUrl={this.props.setSortingUrl} />
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