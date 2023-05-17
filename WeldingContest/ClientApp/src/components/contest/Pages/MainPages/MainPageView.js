import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import CustomDataGrid from '../../sub-components/CustomDataGrid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

export class MainPageView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    field: 'contestantRFID',
                    headerName: 'RFID конкурсанта',
                    width: 150,
                    valueGetter: (params) =>
                        `${params.row.contestWork.contestant.rfid}`,
                    sortable: false
                },
                { field: 'assemblyKSSMark', width: 140, headerName: 'Сборка и сварка', sortable: false },
                { field: 'safetyMark', width: 120, headerName: 'Охрана труда', sortable: false },
                { field: 'weldingTimeMark', width: 180, headerName: 'Время сборки и сварки', sortable: false },
                { field: 'consumptionWeldingMaterialsMark', width: 240, headerName: 'Расход сварочных материалов', sortable: false },
                { field: 'vmcMark', width: 50, headerName: 'ВИК', sortable: false },
                { field: 'rgmMark', width: 230, headerName: 'РК/МИ', sortable: false },
                { field: 'theoreticalMark', width: 80, headerName: 'Теория', sortable: false },
                { field: 'overallMark', width: 80, headerName: 'Итого', sortable: false },
            ],

            nominations: [
                { value: '?nominationTitle=А (135)', label: 'А (135)' },
                { value: '?nominationTitle=А (135) ЛМС', label: 'А (135) ЛМС' },
                { value: '?nominationTitle=Б (141)', label: 'Б (141)' },
                { value: '?nominationTitle=Б (141) ЛМС', label: 'Б (141) ЛМС' },
                { value: '?nominationTitle=В-1 (111)', label: 'В-1 (111)' },
                { value: '?nominationTitle=В-1 (111) ЛМС', label: 'В-1 (111) ЛМС' },
                { value: '?nominationTitle=В-2 (111)', label: 'В-2 (111)' },
                { value: '?nominationTitle=В-2 (111) ЛМС', label: 'В-2 (111) ЛМС' },
            ]
        }
    }

    render() {
        return (
            <div style={{ justifyContent: "center" }}>
                <Stack direction="column">
                    <p>Результаты конкурса</p>
                    <FormControl sx={{ minWidth: 200 }} fullwidth="true">
                        <InputLabel id="demo-simple-select-label">Выберите номинацию</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.props.selectValue}
                            onChange={this.props.handleChangeSelectValue}
                            label="Выберите номинацию"
                        >
                            {this.state.nominations.map((nomination) => (
                                <MenuItem key={nomination.value} value={nomination.value}>{nomination.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <CustomDataGrid
                    columns={this.state.columns}
                    rows={this.props.evaluationResults}
                    handleSelect={this.props.handleSelect}
                />
                <Pagination count={this.props.pagesNumber} page={this.props.pageNumber} onChange={this.props.handleChangePage} />
            </div>
        );
    }
}