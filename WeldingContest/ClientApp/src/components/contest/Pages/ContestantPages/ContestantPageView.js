﻿import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import CustomDataGrid from '../../sub-components/CustomDataGrid';

export class ContestantPageView extends Component {
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
                    field: 'position',
                    headerName: 'Место',
                    width: 100,
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
        }
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <fieldset disabled={!this.props.isUpdating}>
                        <Form.Group>
                            <Form.Label>Полное имя</Form.Label>
                            <Form.Control name="fullName" value={this.props.fullName} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>RFID</Form.Label>
                            <Form.Control name="rfid" value={this.props.rfid} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>QR</Form.Label>
                            <Form.Control name="qr" value={this.props.qr} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Компания</Form.Label>
                            <Form.Control name="company" value={this.props.company} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                    </fieldset>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="outline-secondary" style={{ margin: "10px 10px" }} hidden={ this.props.isUpdating} href="/Contestants">
                            Назад к списку конкурсантов
                        </Button>
                        <Button variant="danger" style={{ margin: "10px 10px" }} hidden={this.props.isUpdating} onClick={this.props.handleDelete}>
                            Удалить
                        </Button>
                        <Button style={{ margin: "10px 10px" }} hidden={this.props.isUpdating} onClick={this.props.handleUpdate}>
                            Обновить
                        </Button>
                        <Button style={{ margin: "10px 10px" }} hidden={!this.props.isUpdating} onClick={this.props.handleCancel}>
                            Отмена
                        </Button>
                        <Button style={{ margin: "10px 10px" }} type="submit" hidden={!this.props.isUpdating}>
                            Подтвердить
                        </Button>
                    </Stack>
                </Form>
                <p>Конкурсные работы</p>
                <CustomDataGrid
                    columns={this.state.columns}
                    rows={this.props.contestWorks}
                    handleSelect={ this.props.handleSelectContestWork}
                />
            </>
        );
    }
}