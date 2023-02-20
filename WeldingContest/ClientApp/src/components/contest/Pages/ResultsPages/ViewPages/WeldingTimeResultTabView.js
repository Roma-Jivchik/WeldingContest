import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class WeldingTimeResultTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form>
                    <fieldset disabled>
                    <Form.Group>
                        <Form.Label>Время начала подготовки к сварке</Form.Label>
                        <Form.Control type="time" name="timeOfBegin" value={this.props.timeOfBegin}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Время окончания сварки</Form.Label>
                        <Form.Control type="time" name="timeOfEnd" value={this.props.timeOfEnd}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Итоговое количество баллов (минус балл за каждую дополнительную минуту)</Form.Label>
                        <Form.Control disabled type="number" name="overallMark" value={this.props.overallMark}/>
                        </Form.Group>
                        </fieldset>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button onClick={ this.handleDelete}>
                        Удалить
                        </Button>
                        </Stack>
                </Form>
                </>
            );
    }
}