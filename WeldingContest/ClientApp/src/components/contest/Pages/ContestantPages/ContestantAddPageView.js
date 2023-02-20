import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class ContestantAddPageView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Полное имя</Form.Label>
                        <Form.Control name="fullName" value={this.props.fullName} onChange={ this.props.handleChangeInput} required/>
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
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button href="/Contestants">
                            Назад к списку конкурсантов
                            </Button>
                    <Button type="submit">
                        Добавить
                        </Button>
                        </Stack>
                </Form>
                </>
            );
    }
}