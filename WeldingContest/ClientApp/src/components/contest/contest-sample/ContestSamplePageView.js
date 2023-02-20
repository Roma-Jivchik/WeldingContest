import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { AddFileMultipleComponent } from './sub-components/AddFileMultipleComponent';

export class ContestSampleInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentContestSample: "",
            id: "_",
            shape: "Пластина",
            thickness: "5",
            material: "Сталь",
            diameter: "1",
            passportLink:"1",
            RFID: "",
            QR: "",
            folderPath: "",
            files: [],
            loading: true,
            contestSamples: [],
            isAdding: false,
            isDisabled: true,
            isChoosed: true,
            isActive: false,
            isUpdating: false,
            message: "",
        };

        this.renderContestSampleTable = this.renderContestSampleTable.bind(this);
        this.renderContestSampleForm = this.renderContestSampleForm.bind(this);
        this.renderFileNames = this.renderFileNames.bind(this);

        this.postDataToController = this.postDataToController.bind(this);
        this.putDataToController = this.putDataToController.bind(this);
        this.getDataFromController = this.getDataFromController.bind(this);
        this.deleteDataFromController = this.deleteDataFromController.bind(this);
        this.getFilesFromController = this.getFilesFromController.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.handleChangeShape = this.handleChangeShape.bind(this);
        this.handleChangeThickness = this.handleChangeThickness.bind(this);
        this.handleChangeMaterial = this.handleChangeMaterial.bind(this);
        this.handleChangeDiameter = this.handleChangeDiameter.bind(this);
        this.handleChangePassportLink = this.handleChangePassportLink.bind(this);
        this.handleChangeRFID = this.handleChangeRFID.bind(this);
        this.handleChangeQR = this.handleChangeQR.bind(this);
        this.handleChangeFiles = this.handleChangeFiles.bind(this);
    }

    clearState() {
        this.setState({
            currentContestSample: "",
            shape: "Пластина",
            thickness: "5",
            material: "Сталь",
            diameter: "1",
            RFID: "",
            QR: "",
            passportLink: "1",
            folderPath: "",
            files: [],
        });
    }

    componentDidMount() {
        this.getDataFromController();
    }

    renderContestSampleTable() {
        return (
            <>
                <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleAdd() }}>
                    Добавить
                        </Button>
                <Table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>RFID</th>
                            <th>QR</th>
                            <th>Форма</th>
                            <th>Материал</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contestSamples.map((contestSample, index) =>
                            <tr key={contestSample.id}>
                                <td>{ index + 1}</td>
                                <td>{contestSample.rfid}</td>
                                <td>{contestSample.qr}</td>
                                <td>{contestSample.shape}</td>
                                <td>{contestSample.material}</td>
                                <td>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleChoose(contestSample) }}>
                                        Выбрать
                                            </Button>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleUpdate(contestSample) }}>
                                        Обновить
                                            </Button>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleDelete(contestSample) }}>
                                        Удалить
                                            </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </>
        );
    }

    renderContestSampleForm() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <fieldset hidden={!this.state.isActive}>
                    <Tabs size="sm" defaultActiveKey="one">
                        <Tab size="sm" eventKey="one" title="Характеристики">
                            <fieldset disabled={this.state.isDisabled}>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Форма</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.shape} placeholder={this.state.currentContestSample.shape} onChange={this.handleChangeShape} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Толщина</Form.Label>
                                    <Form.Control size="sm" type="number" value={this.state.thickness} placeholder={this.state.currentContestSample.thickness} onChange={this.handleChangeThickness} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Материал</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.material} placeholder={this.state.currentContestSample.material} onChange={this.handleChangeMaterial} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Диаметр</Form.Label>
                                    <Form.Control size="sm" type="number" value={this.state.diameter} placeholder={this.state.currentContestSample.diameter} onChange={this.handleChangeDiameter} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Ссылка на паспорт заготовки</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.passportLink} placeholder={this.state.currentContestSample.passportLink} onChange={this.handleChangePassportLink} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </fieldset>
                        </Tab>
                        <Tab size="sm" eventKey="two" title="Метки">
                            <fieldset disabled={this.state.isDisabled}>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">RFID</Form.Label>
                                    <Form.Control disabled={this.state.isUpdating} size="sm" type="text" value={this.state.RFID} onChange={this.handleChangeRFID} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">QR</Form.Label>
                                    <Form.Control disabled={this.state.isUpdating} size="sm" type="text" value={this.state.QR} onChange={this.handleChangeQR} />
                                </Form.Group>
                            </fieldset>
                        </Tab>
                        <Tab size="sm" eventKey="three" title="Файлы">
                            <AddFileMultipleComponent isHidden={this.state.isUpdating} handleChangeFiles={this.handleChangeFiles} />
                            { this.renderFileNames()}
                            </Tab>
                    </Tabs>
                </fieldset>
                <Row>
                    <Col>
                        <Button size="sm" hidden={this.state.isChoosed} variant="primary" type="submit">
                            Подтвердить
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

    handleChoose(contestSample) {
        this.setState(
            {
                isChoosed: true,
                currentContestSample: contestSample,
                isDisabled: true,
                isActive: true,
                ID: contestSample.id,
                shape: contestSample.shape,
                thickness: contestSample.thickness,
                material: contestSample.material,
                diameter: contestSample.diameter,
                passportLink: contestSample.passportLink,
                RFID: contestSample.rfid,
                QR: contestSample.qr,
                folderPath: contestSample.folderPath,
                message: "",
            }
        );

        this.getFilesFromController(contestSample.folderPath);
    }

    handleUpdate(contestSample) {
        this.setState(
            {
                id: contestSample.id,
                isChoosed: false,
                isActive: true,
                currentContestSample: contestSample,
                isDisabled: false,
                isUpdating: true,
                shape: contestSample.shape,
                thickness: contestSample.thickness,
                material: contestSample.material,
                diameter: contestSample.diameter,
                passportLink: contestSample.passportLink,
                RFID: contestSample.rfid,
                QR: contestSample.qr,
                folderPath: contestSample.folderPath,
                message: "",
            }
        );
    }

    handleAdd() {
        this.clearState();
        this.setState({
            isAdding: true,
            isDisabled: false,
            isChoosed: false,
            isUpdating: false,
            message: "",
            validated: false,
            isActive: true,
        });
    }

    handleDelete(contestSample) {
        this.setState({ isActive: false, isChoosed: true });
        this.clearState();
        this.deleteDataFromController(contestSample)
    }

    render() {
        return (
            <Row style={{ width: "100%", left: 5, position: "absolute" }}>
                <Col>
                    {this.renderContestSampleTable()}
                </Col>
                <Col>
                    {this.renderContestSampleForm()}
                </Col>
            </Row>
        );
    }

    async getDataFromController() {
        const response = await fetch('contestSample');
        const data = await response.json();
        this.setState({ contestSamples: data });
    }

    async getFilesFromController(folderPath) {
        const response = await fetch('contestSample/getFiles', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(folderPath)
        })

        const responseData = await response.json();
        this.setState({ files: responseData });
    }

    async postDataToController(formData) {
        console.log("Sending");

        const response = await fetch('contestSampleAndResults/postSample', {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();
        this.setState({ message: responseData, validated: false });
        this.clearState();
        this.getDataFromController();
    }

    async putDataToController(formData) {
        console.log("Updating");

        const response = await fetch('contestSample', {
            method: 'PUT',
            body: formData
        });

        const responseData = await response.json();
        this.setState({ message: responseData, validated: false });
        this.getDataFromController();
    }

    async deleteDataFromController(contestSample) {
        console.log("Deleting");
        const data = contestSample.id;
        const response = await fetch('contestSampleAndResults/deleteSample', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        this.setState({ message: responseData });
        this.getDataFromController();
    }

    handleSubmit(event) {
        const form = event.currentTarget;

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

        console.log(this.state.files);

        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        else {
            if (this.state.isAdding) {
                this.postDataToController(formData);
            }
            if (this.state.isUpdating) {
                this.putDataToController(formData);
            }
        }

        this.setState({ validated: true });
        event.preventDefault();
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

    handleChangeFiles(uploaded) {
        this.setState({files: uploaded});
    }
}