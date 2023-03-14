import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class NominationAddPageView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Название номинации</Form.Label>
                        <Form.Control name="title" value={this.props.title} onChange={ this.props.handleChangeInput} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Размеры образца</Form.Label>
                        <Form.Control type="number" name="size" value={this.props.size} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Толщина образца</Form.Label>
                        <Form.Control name="thickness" value={this.props.thickness} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Материал образца</Form.Label>
                        <Form.Control name="material" value={this.props.material} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Тип сварки</Form.Label>
                        <Form.Control name="weldingType" value={this.props.weldingType} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Тип образца</Form.Label>
                        <Form.Control name="sampleType" value={this.props.sampleType} onChange={this.props.handleChangeInput} required />
                    </Form.Group>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button variant="outline-secondary" style={{ margin: "10px 10px" }}n href="/Nominations">
                            Назад к списку номинаций
                            </Button>
                        <Button style={{ margin: "10px 10px" }} type="submit">
                        Добавить
                        </Button>
                        </Stack>
                </Form>
                </>
            );
    }
}