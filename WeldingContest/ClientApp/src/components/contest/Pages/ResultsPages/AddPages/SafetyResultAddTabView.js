﻿import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class SafetyResultAddTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Отсутствие, неполное наличие защитной одежды (спецодежда, спецобувь, краги) (3 балла)</Form.Label>
                        <Form.Control type="number" name="lackOfProtectiveClothesCount" value={this.props.lackOfProtectiveClothesCount} onChange={ this.props.handleChangeInput} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Неправильное применение или неприменение средств защиты (сварочных масок, защитных очков, щитков и т. д.) (5 баллов за каждое нарушение)</Form.Label>
                        <Form.Control type="number" name="wrongEquipmentUsageCount" value={this.props.wrongEquipmentUsageCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Несвоевременное обесточивание электрошлифмашинок (5 баллов за каждое нарушение)</Form.Label>
                        <Form.Control type="number" name="machinesUntimelyDeenergizationCount" value={this.props.machinesUntimelyDeenergizationCount} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Примечание</Form.Label>
                        <Form.Control name="notes" value={this.props.notes} onChange={this.props.handleChangeInput}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Итоговое количество баллов</Form.Label>
                        <Form.Control disabled type="number" name="overallMark" value={this.props.overallMark} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Stack direction="row" spacing={2} justifyContent="center">
                    <Button type="submit">
                        Добавить
                        </Button>
                        </Stack>
                </Form>
                </>
            );
    }
}