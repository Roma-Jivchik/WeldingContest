import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { AddFileMultipleComponent } from '../sub-components/AddFileMultipleComponent';

export class ContestSampleFormView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentContestSample: this.props.currentContestSample,
            id: "_",
            shape: "",
            thickness: "",
            material: "",
            diameter: "",
            passportLink:"",
            RFID: "",
            QR: "",
            folderPath: "",
            files: [],
            validated: false,
            message: "",
            formData: null
        };
    }

    clearState() {
        this.setState({
            currentContestSample: "",
            shape: "",
            thickness: "",
            material: "",
            diameter: "",
            RFID: "",
            QR: "",
            passportLink: "",
            folderPath: "",
            files: [],
            validated: false,
            message: "",
        });
    }

    render() {
        return (
            <Form noValidate validated={this.props.validated} onSubmit={() => { this.handleSubmit() }}>
                <fieldset >
                    <Tabs size="sm" defaultActiveKey="one">
                        <Tab size="sm" eventKey="one" title="Характеристики">
                            <fieldset disabled={this.props.isDisabled}>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Форма</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.shape} placeholder={this.state.currentContestSample.shape} onChange={(event) => { this.handleChangeShape(event) }} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Толщина</Form.Label>
                                    <Form.Control size="sm" type="number" value={this.state.thickness} placeholder={this.state.currentContestSample.thickness} onChange={(event) => { this.handleChangeThickness(event) }} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Материал</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.material} placeholder={this.state.currentContestSample.material} onChange={(event) => { this.handleChangeMaterial(event) }} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Диаметр</Form.Label>
                                    <Form.Control size="sm" type="number" value={this.state.diameter} placeholder={this.state.currentContestSample.diameter} onChange={(event) => { this.handleChangeDiameter(event) }} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Ссылка на паспорт заготовки</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.passportLink} placeholder={this.state.currentContestSample.passportLink} onChange={(event) => { this.handleChangePassportLink(event) }} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </fieldset>
                        </Tab>
                        <Tab size="sm" eventKey="two" title="Метки">
                            <fieldset disabled={this.props.isDisabled}>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">RFID</Form.Label>
                                    <Form.Control disabled={this.props.isUpdating} size="sm" type="text" value={this.state.RFID} onChange={(event) => { this.handleChangeRFID(event) }} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">QR</Form.Label>
                                    <Form.Control disabled={this.props.isUpdating} size="sm" type="text" value={this.state.QR} onChange={(event) => { this.handleChangeQR(event) }} />
                                </Form.Group>
                            </fieldset>
                        </Tab>
                        <Tab size="sm" eventKey="three" title="Файлы">
                            <AddFileMultipleComponent isHidden={this.props.isUpdating} handleChangeFiles={(uploaded) => { this.props.handleChangeFiles(uploaded) }} />
                            { this.renderFileNames()}
                            </Tab>
                    </Tabs>
                </fieldset>
                <Row>
                    <Col>
                        <Button size="sm" hidden={this.props.isChoosed} variant="primary" type="submit">
                            Подтвердить
                        </Button>
                        <Button size="sm" hidden={this.props.isAdding} variant="primary" type="submit" onClick={(contestSample) => { this.props.handleDelete(this.state.currentContestSample) }}>
                            Удалить
                        </Button>
                        <Button size="sm" hidden={this.props.isAdding} variant="primary" type="submit" onClick={(contestSample) => { this.props.handleUpdate(this.state.currentContestSample) }}>
                            Обновить
                        </Button>
                    </Col>
                    <Col>
                        <Form.Label size="sm">{this.state.message}</Form.Label>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderFileNames() {
        return (
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>Номер файла</th>
                        <th>Имя файла</th>
                        <th>Размер</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.files.map((file, index) =>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{file.name}</td>
                            <td>{file.size}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        );
    }

    handleSubmit(event) {
        const formData = new FormData();
        formData.append("ID", this.state.id);
        formData.append("shape", this.state.shape);
        formData.append("thickness", this.state.thickness);
        formData.append("material", this.state.material);
        formData.append("diameter", this.state.diameter);
        formData.append("passportLink", this.state.passportLink);
        formData.append("RFID", this.state.RFID);
        formData.append("QR", this.state.QR);
        formData.append("folderPath", this.state.folderPath);
        this.state.files.map(file => {
            formData.append(`${file.name}`, file);
        });

        this.props.handleUploadForm(event, formData);
    }

    handleChangeShape(event) {
        this.setState({ shape: event.target.value });
    }

    handleChangeThickness(event) {
        this.setState({ thickness: event.target.value });
    }

    handleChangeMaterial(event) {
        this.setState({ material: event.target.value });
    }

    handleChangeDiameter(event) {
        this.setState({ diameter: event.target.value });
    }

    handleChangePassportLink(event) {
        this.setState({ passportLink: event.target.value });
    }

    handleChangeRFID(event) {
        this.setState({ RFID: event.target.value });
    }

    handleChangeQR(event) {
        this.setState({ QR: event.target.value });
    }
}