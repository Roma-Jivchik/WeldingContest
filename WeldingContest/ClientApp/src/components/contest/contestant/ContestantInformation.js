import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Table from 'react-bootstrap/Table';
import { SearchComponent } from '../sub-components/SearchComponent';
import { AddFileComponent } from '../sub-components/AddFileComponent';

export class ContestantInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentContestant: "",
            currentContestWork: "",
            currentContestSample: "",
            id: "_",
            fullName: "",
            company: "",
            position: "",
            weldingType: "",
            weldingDischarge: 0,
            mark: "",
            RFID: "",
            QR: "",
            imagePreviewUrl: "",
            photo: null,
            loading: true,
            contestants: [],
            isActiveContestantForm: false,
            isActiveContestantTable: true,
            isActiveContestWorkForm: false,
            isActiveContestWorkTable: false,
            isAdding: false,
            isUpdating: false,
            isUpdatingPhoto: false,
            isSearching: false,
            isDisabled: true,
            message: "",
            contestWorks: [],
        };

        this.renderContestantTable = this.renderContestantTable.bind(this);
        this.renderContestantForm = this.renderContestantForm.bind(this);
        this.renderContestantSearchForm = this.renderContestantSearchForm.bind(this);
        this.renderContestWorkTable = this.renderContestWorkTable.bind(this);
        this.renderContestWorkForm = this.renderContestWorkForm.bind(this);
        this.renderContestSampleForm = this.renderContestSampleForm.bind(this);

        this.postDataToController = this.postDataToController.bind(this);
        this.putDataToController = this.putDataToController.bind(this);
        this.getDataFromController = this.getDataFromController.bind(this);
        this.deleteDataFromController = this.deleteDataFromController.bind(this);
        this.getContestWorkFromController = this.getContestWorkFromController.bind(this);
        this.getContestSampleFromController = this.getContestSampleFromController.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleChooseContestWork = this.handleChooseContestWork.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.handleChangeFullName = this.handleChangeFullName.bind(this);
        this.handleChangeCompany = this.handleChangeCompany.bind(this);
        this.handleChangePosition = this.handleChangePosition.bind(this);
        this.handleChangeRFID = this.handleChangeRFID.bind(this);
        this.handleChangeQR = this.handleChangeQR.bind(this);
        this.handleChangeWeldingType = this.handleChangeWeldingType.bind(this);
        this.handleChangeWeldingDischarge = this.handleChangeWeldingDischarge.bind(this);
        this.handleChangeMark = this.handleChangeMark.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    clearState() {
        this.setState({
            isAdding: false,
            isDisabled: true,
            isChoosed: true,
            isActiveContestantForm: false,
            isActiveContestantTable: true,
            isActiveContestWorkForm: false,
            isActiveContestWorkTable: false,
            isUpdating: false,
            isUpdatingPhoto: false,
            isSearching: false,
            isDisabled: true,
            currentContestant: "",
            currentContestWork: "",
            fullName: "1",
            company: "1",
            position: "1",
            weldingType: "1",
            weldingDischarge: "1",
            mark: "1",
            RFID: "",
            QR: "",
            imagePreviewUrl: "",
            photo: null,
        });
    }

    componentDidMount() {
        this.getDataFromController();
    }

    renderContestantTable() {
        return (
            <>
                <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleAdd() }} hidden={ !this.state.isActiveContestantTable}>
                    Добавить
                </Button>
                <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleSearch() }} hidden={!this.state.isActiveContestantTable}>
                    Поиск
                </Button>
                <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleReset() }} hidden={!this.state.isActiveContestantTable}>
                    Сбросить
                </Button>
                <Table striped bordered hover hidden={!this.state.isActiveContestantTable}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>RFID</th>
                            <th>QR</th>
                            <th>ФИО</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contestants.map((contestant, index) =>
                            <tr key={contestant.id} onClick={() => { this.handleChoose(contestant) }}>
                                <td>{ index + 1}</td>
                                <td>{contestant.rfid}</td>
                                <td>{contestant.qr}</td>
                                <td>{contestant.fullName}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </>
        );
    }

    renderContestantForm() {
        return (
            <div hidden={!this.state.isActiveContestantForm}>
                {this.renderContestantSearchForm()}
                <Tabs size="sm" defaultActiveKey="contestant">
                    <Tab size="sm" eventKey="contestant" title="Конкурсант">
                        <Form noValidate validated={this.state.validated}>
                            <fieldset hidden={!this.state.isActiveContestantForm}>
                                <Row>
                                    <Col>
                                        <fieldset disabled={this.state.isDisabled}>
                                            <Form.Group className="mb-3">
                                                <Form.Label size="sm">ФИО</Form.Label>
                                                <Form.Control size="sm" type="text" value={this.state.fullName} placeholder={this.state.currentContestant.fullName} onChange={this.handleChangeFullName} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Пожалуйста, заполните поле
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label size="sm">RFID</Form.Label>
                                                <Form.Control disabled={this.state.isUpdating} size="sm" type="text" value={this.state.RFID} onChange={this.handleChangeRFID} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Пожалуйста, заполните поле
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label size="sm">QR</Form.Label>
                                                <Form.Control disabled={this.state.isUpdating} size="sm" type="text" value={this.state.QR} onChange={this.handleChangeQR} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Пожалуйста, заполните поле
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </fieldset>
                                    </Col>
                                    <Col>
                                        <fieldset disabled={this.state.isDisabled}>
                                            <Form.Group className="mb-3">
                                                <Form.Label size="sm">Компания</Form.Label>
                                                <Form.Control size="sm" type="text" value={this.state.company} placeholder={this.state.currentContestant.company} onChange={this.handleChangeCompany} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Пожалуйста, заполните поле
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label size="sm">Должность</Form.Label>
                                                <Form.Control size="sm" type="text" value={this.state.position} placeholder={this.state.currentContestant.position} onChange={this.handleChangePosition} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Пожалуйста, заполните поле
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </fieldset>
                                    </Col>
                                    <Col>
                                        <fieldset disabled={this.state.isDisabled}>
                                            <Form.Group className="mb-3">
                                                <Form.Label size="sm">Вид сварки</Form.Label>
                                                <Form.Control size="sm" type="text" value={this.state.weldingType} placeholder={this.state.currentContestant.weldingType} onChange={this.handleChangeWeldingType} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Пожалуйста, заполните поле
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label size="sm">Разряд</Form.Label>
                                                <Form.Control size="sm" type="number" value={this.state.weldingDischarge} placeholder={this.state.currentContestant.weldingDischarge} onChange={this.handleChangeWeldingDischarge} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Пожалуйста, заполните поле
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label size="sm">Клеймо</Form.Label>
                                                <Form.Control size="sm" type="text" value={this.state.mark} placeholder={this.state.currentContestant.mark} onChange={this.handleChangeMark} required />
                                                <Form.Control.Feedback type="invalid">
                                                    Пожалуйста, заполните поле
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </fieldset>
                                    </Col>
                                </Row>
                            </fieldset>
                            <Row>
                                <Col>
                                    <Button size="sm" variant="primary" type="submit" onClick={(e) => { this.handleBack(e) }}>
                                        Назад к списку
                                    </Button>
                                    <Button size="sm" hidden={this.state.isUpdating || this.state.isAdding} variant="primary" type="submit" onClick={(event) => { this.handleUpdate(event, this.state.currentContestant) }}>
                                        Обновить
                                    </Button>
                                    <Button size="sm" hidden={this.state.isUpdating || this.state.isAdding} variant="primary" type="submit" onClick={(event) => { this.handleDelete(event, this.state.currentContestant) }}>
                                        Удалить
                                    </Button>
                                    <Button size="sm" hidden={!this.state.isAdding && !this.state.isUpdating && !this.state.isSearching} variant="primary" type="submit" onClick={(event) => { this.handleSubmit(event) }}>
                                        Подтвердить
                                    </Button>
                                </Col>
                                <Col>
                                    <Form.Label size="sm">{this.state.message}</Form.Label>
                                </Col>
                            </Row>
                        </Form>
                    </Tab>
                    <Tab size="sm" eventKey="contestWorks" title="Конкурсные работы" disabled={this.state.isAdding || this.state.isUpdating}>
                        {this.renderContestWorkTable()}
                        {this.renderContestWorkForm()}
                    </Tab>
                </Tabs>
            </div>
        );
    }

    renderContestWorkTable() {
        return (
            <>
                <Table striped bordered hover hidden={!this.state.isActiveContestWorkTable}>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Название конкурса</th>
                            <th>RFID конкурсанта</th>
                            <th>RFID образца</th>
                            <th>QR конкурсанта</th>
                            <th>QR образца</th>
                            <th>Общая оценка</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contestWorks.map((contestWork, index) =>
                            <tr key={contestWork.id} onClick={() => { this.handleChooseContestWork(contestWork) }}>
                                <td>{ index + 1}</td>
                                <td>{contestWork.contestName}</td>
                                <td>{contestWork.contestantRFID}</td>
                                <td>{contestWork.sampleRFID}</td>
                                <td>{contestWork.contestantQR}</td>
                                <td>{contestWork.sampleQR}</td>
                                <td>{contestWork.evaluationResultMark}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </>
        );
    }

    renderContestWorkForm() {
        return (
            <Tabs hidden={!this.state.isActiveContestWorkForm}>
                <Tab size="sm" eventKey="contestWork" title="Конкурсная работа">
                    <Form hidden={!this.state.isActiveContestWorkForm}>
                        <fieldset disabled={true}>
                        <Row>
                                <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label size="sm">Название конкурса</Form.Label>
                                            <Form.Control size="sm" type="text" placeholder={this.state.currentContestWork.contestName} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label size="sm">Ссылка на файл с результатами тестирования</Form.Label>
                                            <Form.Control size="sm" type="text" placeholder={this.state.currentContestWork.exerciseLink} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label size="sm">Результат оценки конкурсной работы</Form.Label>
                                            <Form.Control size="sm" type="number" placeholder={this.state.currentContestWork.evaluationResultMark} />
                                        </Form.Group>
                                </Col>
                                <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label size="sm">RFID конкурсанта</Form.Label>
                                            <Form.Control size="sm" type="text" placeholder={this.state.currentContestWork.contestantRFID} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label size="sm">QR конкурсанта</Form.Label>
                                            <Form.Control size="sm" type="text" placeholder={this.state.currentContestWork.contestantQR} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label size="sm">RFID образца</Form.Label>
                                            <Form.Control size="sm" type="text" placeholder={this.state.currentContestWork.sampleRFID} />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label size="sm">QR образца</Form.Label>
                                            <Form.Control size="sm" type="text" placeholder={this.state.currentContestWork.sampleQR} />
                                        </Form.Group>
                                </Col>
                            </Row>
                        </fieldset>
                        <Row>
                            <Col>
                                <Button size="sm" variant="primary" type="submit" onClick={(e) => { this.handleBackContestWorks(e) }}>
                                    Назад к списку
                                </Button>
                            </Col>
                            </Row>
                    </Form>
                </Tab>
                <Tab size="sm" eventKey="contestSample" title="Образец" disabled={!this.state.isActiveContestWorkForm}>
                    {this.renderContestSampleForm()}
                </Tab>
            </Tabs>
        );
    }

    renderContestSampleForm() {
        return (
            <Form>
                <fieldset disabled={true}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">Форма</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={this.state.currentContestSample.shape} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">Толщина</Form.Label>
                                <Form.Control size="sm" type="number" placeholder={this.state.currentContestSample.thickness} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">Материал</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={this.state.currentContestSample.material} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">Диаметр</Form.Label>
                                <Form.Control size="sm" type="number" placeholder={this.state.currentContestSample.diameter} />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">RFID</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={this.state.currentContestSample.rfid} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label size="sm">QR</Form.Label>
                                <Form.Control size="sm" type="text" placeholder={this.state.currentContestSample.qr} />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
            </Form>
        );
    }

    renderContestantSearchForm() {
        return (
            <fieldset hidden={!this.state.isSearching}>
                <Tabs defaultActiveKey="first">
                    <Tab eventKey="first" title="Тип сварки">
                        <SearchComponent searchParameterName="Тип сварки" searchParameterValue="weldingType" controllerName="contestant/search/weldingType" handleResult={this.handleResult} />
                    </Tab>
                    <Tab eventKey="second" title="Клеймо">
                        <SearchComponent searchParameterName="Клеймо" searchParameterValue="mark" controllerName="contestant/search/mark" handleResult={this.handleResult} />
                    </Tab>
                    <Tab eventKey="third" title="Фамилия">
                        <SearchComponent searchParameterName="Фамилия" searchParameterValue="surname" controllerName="contestant/search/surname" handleResult={this.handleResult} />
                    </Tab>
                </Tabs>
            </fieldset>
        );
    }

    handleBack(e) {
        this.clearState();
        this.getDataFromController();
        e.preventDefault();
    }

    handleBackContestWorks(e) {
        this.setState(
            {
                currentContestWork: "",
                isActiveContestWorkForm: false,
                isActiveContestWorkTable: true,
            }
        );

        e.preventDefault();
    }

    handleChooseContestWork(contestWork) {
        this.setState(
            {
                currentContestWork: contestWork,
                isActiveContestWorkForm: true,
                isActiveContestWorkTable: false,
            }
        );

        this.getContestSampleFromController(contestWork);
    }

    handleSearch() {
        this.setState(
            {
                isSearching: true,
                isChoosed: true
            }
        );
    }

    handleReset() {
        this.clearState();
        this.getDataFromController();
    }

    handleChoose(contestant) {
        this.setState(
            {
                isActiveContestantForm: true,
                isActiveContestantTable: false,
                isActiveContestWorkTable: true,
                isActiveContestWorkForm: false,
                currentContestant: contestant,
                isSearching: false,
                isUpdatingPhoto: true,
                isDisabled: true,
                ID: contestant.id,
                fullName: contestant.fullName,
                company: contestant.company,
                position: contestant.position,
                weldingType: contestant.weldingType,
                weldingDischarge: contestant.weldingDischarge,
                mark: contestant.mark,
                RFID: contestant.rfid,
                QR: contestant.qr,
                contestWorks: [],
                message: "",
            }
        );

        this.getContestWorkFromController(contestant);
        this.getPhotoFromController(contestant.photoPath);
    }

    handleUpdate(event, contestant) {
        event.preventDefault();
        this.setState(
            {
                id: contestant.id,
                isSearching: false,
                currentContestant: contestant,
                isUpdating: true,
                isUpdatingPhoto: true,
                isDisabled: false,
                fullName: contestant.fullName,
                company: contestant.company,
                position: contestant.position,
                weldingType: contestant.weldingType,
                weldingDischarge: contestant.weldingDischarge,
                mark: contestant.mark,
                RFID: contestant.rfid,
                QR: contestant.qr,
                message:"",
            }
        );
    }

    handleAdd() {
        this.clearState();
        this.setState({
            isSearching: false,
            isActiveContestantTable: false,
            isActiveContestantForm: true,
            isAdding: true,
            isDisabled: false,
            message: "",
            validated: false,
            isUpdatingPhoto: false,
        });
    }

    handleDelete(event, contestant) {
        event.preventDefault();
        if (window.confirm("Вы действительно хотите удалить данного конкурсанта?")) {
            this.setState({ isActive: false, isChoosed: true });
            this.clearState();
            this.deleteDataFromController(contestant);
        }
    }

    handleSubmit(event) {
        const form = event.currentTarget;

        const formData = new FormData();
        formData.append("ID", this.state.ID);
        formData.append("fullName", this.state.fullName);
        formData.append("company", this.state.company);
        formData.append("position", this.state.position);
        formData.append("RFID", this.state.RFID);
        formData.append("weldingType", this.state.weldingType);
        formData.append("weldingDischarge", this.state.weldingDischarge);
        formData.append("mark", this.state.mark);
        formData.append("QR", this.state.QR);
        formData.append("photo", this.state.file);
        formData.append("photoPath", this.state.photoPath);


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

    render() {
        return (
            <Row style={{width:"100%",left:5, position:"absolute"}}>
                <Col>
                    {this.renderContestantTable()}
                    {this.renderContestantForm()}
                </Col>
            </Row>
        );
    }

    async getContestWorkFromController(contestant) {
        const id = contestant.id;

        const response = await fetch('contestWork/getWorks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );

        const data = await response.json();
        this.setState({ contestWorks: data });
    }

    async getContestSampleFromController(contestWork) {
        const id = contestWork.sampleID;

        const response = await fetch('contestSample/getSample', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        }
        );
        const data = await response.json();
        this.setState({ currentContestSample: data });
    }

    async getDataFromController() {
        const response = await fetch('contestant/getAll');
        const data = await response.json();
        this.setState(
            { contestants: data }
        );
    }

    async getPhotoFromController(photoPath) {
        const response = await fetch('contestant/getPhoto', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(photoPath)
        });

        const data = await response.blob();
        const url = URL.createObjectURL(data);
        this.setState({ imagePreviewUrl: url });
    }

    async postDataToController(formData) {
        console.log("Sending");

        const response = await fetch('contestant', {
            method: 'POST',
            body: formData
        });

        const responseData = await response.json();
        this.setState({ message: responseData, validated: false  });
        this.clearState();
        this.getDataFromController();
    }

    async putDataToController(formData) {
        console.log("Updating");

        const response = await fetch('contestant', {
            method: 'PUT',
            body: formData
        });

        const responseData = await response.json();
        this.setState({ message: responseData, validated: false });
        this.clearState();
        this.getDataFromController();
    }

    async deleteDataFromController(contestant) {
        console.log("Deleting");
        const data = contestant.id;
        const response = await fetch('contestant', {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        this.setState({ message: responseData });
        this.getDataFromController();
    }

    handleChangeFullName(event) {
        this.setState({ fullName: event.target.value });
    }

    handleChangeCompany(event) {
        this.setState({ company: event.target.value });
    }

    handleChangePosition(event) {
        this.setState({ position: event.target.value });
    }

    handleChangeRFID(event) {
        this.setState({ RFID: event.target.value });
    }

    handleChangeQR(event) {
        this.setState({ QR: event.target.value });
    }

    handleChangeWeldingType(event) {
        this.setState({ weldingType: event.target.value });
    }

    handleChangeWeldingDischarge(event) {
        this.setState({ weldingDischarge: event.target.value });
    }

    handleChangeMark(event) {
        this.setState({ mark: event.target.value });
    }

    handleResult(result) {
        this.setState({ contestants: result });
    }

    handleFile(file) {
        this.setState({ file: file});
    }
}