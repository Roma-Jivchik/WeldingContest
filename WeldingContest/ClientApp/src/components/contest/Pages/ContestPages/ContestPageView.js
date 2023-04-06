import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import CustomDataGrid from '../../sub-components/CustomDataGrid';

export class ContestPageView extends Component {
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
        }
    }

    render() {
        return (
            <div style={{ justifyContent: "center" }}>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <fieldset disabled={!this.props.isUpdating}>
                        <Form.Group>
                            <Form.Label>Название конкурса</Form.Label>
                            <Form.Control name="name" value={this.props.name} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Дата начала конкурса</Form.Label>
                            <Form.Control type="date" name="dateOfBegin" value={this.props.dateOfBegin.split("T")[0]} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Дата окончания конкурса</Form.Label>
                            <Form.Control type="date" name="dateOfEnd" value={this.props.dateOfEnd.split("T")[0]} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                    </fieldset>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="outline-secondary" style={{ margin: "10px 10px" }} hidden={this.props.isUpdating} href="/Contests">
                            Назад к списку конкурсов
                        </Button>
                        <Button variant="danger" style={{ margin: "10px 10px" }} hidden={this.props.isUpdating} onClick={this.props.handleDelete}>
                            Удалить
                        </Button>
                        <Button style={{ margin: "10px 10px" }} hidden={this.props.isUpdating} onClick={this.props.handleUpdate}>
                            Обновить
                        </Button>
                        <Button style={{ margin: "10px 10px" }} hidden={this.props.isUpdating} href={`/ContestWorks/${this.props.contest.id}`}>
                            Перейти к конкурсным работам
                            </Button>
                        <Button style={{ margin: "10px 10px" }} hidden={!this.props.isUpdating} onClick={this.props.handleCancel}>
                            Отмена
                        </Button>
                        <Button style={{ margin: "10px 10px" }} type="submit" hidden={!this.props.isUpdating}>
                            Подтвердить
                        </Button>
                    </Stack>
                    <Stack direction="row" spacing={2} justifyContent="center">
                    <Button hidden={this.props.isUpdating} onClick={this.props.handleFormProtocol} >
                        Сформировать протокол по результатам конкурса
                        </Button>
                        <Button onClick={this.props.handleFormEvaluationResults} >
                            Сформировать общие оценки для конкурсных работ
                        </Button>
                    </Stack>
                </Form>
                <p>Результаты конкурса</p>
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