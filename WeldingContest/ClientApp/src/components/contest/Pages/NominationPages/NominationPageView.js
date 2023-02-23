import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';

export class NominationPageView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Form validated={this.props.validated} onSubmit={this.props.handleSubmit}>
                    <fieldset disabled={!this.props.isUpdating}>
                        <Form.Group>
                            <Form.Label>Название номинации</Form.Label>
                            <Form.Control name="title" value={this.props.title} onChange={this.props.handleChangeInput} required />
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
                    </fieldset>
                    <Stack direction="row" spacing={2} justifyContent="center">
                        <Button hidden={this.props.isUpdating} href="/Nominations">
                            Назад к списку номинаций
                        </Button>
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