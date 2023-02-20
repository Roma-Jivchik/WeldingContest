import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class ContestPageView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <fieldset disabled={!this.props.isUpdating}>
                        <Form.Group>
                            <Form.Label>Название конкурса</Form.Label>
                            <Form.Control name="name" value={this.props.name} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Дата начала конкурса</Form.Label>
                            <Form.Control type="date" name="dateOfBegin" value={this.props.dateOfBegin} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Дата окончания конкурса</Form.Label>
                            <Form.Control type="date" name="dateOfEnd" value={this.props.dateOfEnd} onChange={this.props.handleChangeInput} required />
                        </Form.Group>
                    </fieldset>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button hidden={this.props.isUpdating} onClick={this.props.handleDelete}>
                            Удалить
                        </Button>
                        <Button hidden={this.props.isUpdating} onClick={this.props.handleUpdate}>
                            Обновить
                        </Button>
                        <Button hidden={!this.props.isUpdating} onClick={this.props.handleCancel}>
                            Отмена
                        </Button>
                        <Button type="submit" hidden={!this.props.isUpdating}>
                            Подтвердить
                        </Button>
                    </Stack>
                </Form>
            </>
        );
    }
}