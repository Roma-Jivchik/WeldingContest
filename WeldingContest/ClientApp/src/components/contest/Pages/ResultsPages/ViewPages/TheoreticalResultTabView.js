import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class TheoreticalResultTabView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form>
                    <Form.Group>
                        <Form.Label>Итоговое количество баллов</Form.Label>
                        <Form.Control disabled type="number" name="overallMark" value={this.props.overallMark}/>
                    </Form.Group>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button onClick={ this.props.handleDelete}>
                        Удалить
                        </Button>
                        </Stack>
                </Form>
                </>
            );
    }
}