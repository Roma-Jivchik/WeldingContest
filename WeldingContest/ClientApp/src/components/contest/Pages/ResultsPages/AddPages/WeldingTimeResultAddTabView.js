import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class WeldingTimeResultAddTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Время начала подготовки к сварке</Form.Label>
                        <Form.Control type="time" name="timeOfBegin" value={this.props.timeOfBegin} onChange={ this.props.handleChangeInput} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Время окончания сварки</Form.Label>
                        <Form.Control type="time" name="timeOfEnd" value={this.props.timeOfEnd} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Итоговое количество баллов (минус балл за каждую дополнительную минуту)</Form.Label>
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