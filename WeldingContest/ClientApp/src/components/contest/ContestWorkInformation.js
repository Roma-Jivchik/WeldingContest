import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export class ContestWorkInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentContestWork: "",
            id: "_",
            contestName: "Конкурс сварщиков",
            contestantRFID: "",
            contestantQR: "",
            sampleRFID: "",
            sampleQR: "",
            exerciseLink: "1",
            evaluationResultMark: 0,
            contestID: "_",
            contestantID: "_",
            sampleID: "_",
            evaluationResultID: "_",
            loading: true,
            contestWorks: [],
            isAdding: false,
            isDisabled: true,
            isChoosed: true,
            isActive: false,
            isUpdating: false,
            message: "",
        };

        this.renderContestWorkTable = this.renderContestWorkTable.bind(this);
        this.renderContestWorkForm = this.renderContestWorkForm.bind(this);

        this.postDataToController = this.postDataToController.bind(this);
        this.putDataToController = this.putDataToController.bind(this);
        this.getDataFromController = this.getDataFromController.bind(this);
        this.deleteDataFromController = this.deleteDataFromController.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.handleChangeSampleRFID = this.handleChangeSampleRFID.bind(this);
        this.handleChangeContestantRFID = this.handleChangeContestantRFID.bind(this);
        this.handleChangeSampleQR = this.handleChangeSampleQR.bind(this);
        this.handleChangeContestantQR = this.handleChangeContestantQR.bind(this);
        this.handleChangeExerciseLink = this.handleChangeExerciseLink.bind(this);
        this.handleChangeContestName = this.handleChangeContestName.bind(this);
    }

    clearState() {
        this.setState({
            currentContestWork: "",
            id: "_",
            contestName: "Конкурс сварщиков",
            contestantRFID: "",
            contestantQR: "",
            sampleRFID: "",
            sampleQR: "",
            exerciseLink: "1",
            evaluationResultMark: "",
            contestID: "_",
            contestantID: "_",
            sampleID: "_",
            evaluationResultID: "_",
        });
    }

    componentDidMount() {
        this.getDataFromController();
    }

    renderContestWorkTable() {
        return (
            <>
                <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleAdd() }}>
                    Добавить
                        </Button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Название конкурса</th>
                            <th>RFID конкурсанта</th>
                            <th>RFID образца</th>
                            <th>QR конкурсанта</th>
                            <th>QR образца</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contestWorks.map((contestWork, index) =>
                            <tr key={contestWork.id}>
                                <td>{ index + 1}</td>
                                <td>{contestWork.contestName}</td>
                                <td>{contestWork.contestantRFID}</td>
                                <td>{contestWork.sampleRFID}</td>
                                <td>{contestWork.contestantQR}</td>
                                <td>{contestWork.sampleQR}</td>
                                <td>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleChoose(contestWork) }}>
                                        Выбрать
                                            </Button>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleUpdate(contestWork) }}>
                                        Обновить
                                            </Button>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleDelete(contestWork) }}>
                                        Удалить
                                            </Button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </>
        );
    }

    renderContestWorkForm() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <fieldset hidden={!this.state.isActive}>
                <Tabs defaultActiveKey="one">
                    <Tab eventKey="one" title="Основная информация">
                            <fieldset disabled={this.state.isDisabled}>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Название конкурса</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.contestName} placeholder={this.state.currentContestWork.contestName} onChange={this.handleChangeContestName} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Ссылка на файл с результатами тестирования</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.exerciseLink} placeholder={this.state.currentContestWork.exerciseLink} onChange={this.handleChangeExerciseLink} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </fieldset>
                        </Tab>
                        <Tab eventKey="two" title="Метки">
                            <fieldset disabled={this.state.isDisabled}>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">RFID конкурсанта</Form.Label>
                                    <Form.Control size="sm" type="text" disabled={this.state.isUpdating} value={this.state.contestantRFID} placeholder={this.state.currentContestWork.contestantRFID} onChange={this.handleChangeContestantRFID}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">QR конкурсанта</Form.Label>
                                    <Form.Control size="sm" type="text" disabled={this.state.isUpdating} value={this.state.contestantQR} placeholder={this.state.currentContestWork.contestantQR} onChange={this.handleChangeContestantQR}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">RFID образца</Form.Label>
                                    <Form.Control size="sm" type="text" disabled={this.state.isUpdating} value={this.state.sampleRFID} placeholder={this.state.currentContestWork.sampleRFID} onChange={this.handleChangeSampleRFID}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">QR образца</Form.Label>
                                    <Form.Control size="sm" type="text" disabled={this.state.isUpdating} value={this.state.sampleQR} placeholder={this.state.currentContestWork.sampleQR} onChange={this.handleChangeSampleQR}/>
                                </Form.Group>
                            </fieldset>
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

    handleChoose(contestWork) {
        this.setState(
            {
                isChoosed: true,
                currentContestWork: contestWork,
                isDisabled: true,
                isActive: true,
                id: contestWork.id,
                contestName: contestWork.contestName,
                contestantRFID: contestWork.contestantRFID,
                contestantQR: contestWork.contestantQR,
                sampleRFID: contestWork.sampleRFID,
                sampleQR: contestWork.sampleQR,
                exerciseLink: contestWork.exerciseLink,
                evaluationResultMark: contestWork.evaluationResultMark,
                contestID: contestWork.contestID,
                contestantID: contestWork.contestantID,
                sampleID: contestWork.sampleID,
                evaluationResultID: contestWork.evaluationResultID,
                message: "",
            }
        );
    }

    handleUpdate(contestWork) {
        this.setState(
            {
                id: contestWork.id,
                isChoosed: false,
                isActive: true,
                currentContestWork: contestWork,
                isDisabled: false,
                isUpdating: true,
                contestName: contestWork.contestName,
                contestantRFID: contestWork.contestantRFID,
                contestantQR: contestWork.contestantQR,
                sampleRFID: contestWork.sampleRFID,
                sampleQR: contestWork.sampleQR,
                exerciseLink: contestWork.exerciseLink,
                evaluationResultMark: contestWork.evaluationResultMark,
                contestID: contestWork.contestID,
                contestantID: contestWork.contestantID,
                sampleID: contestWork.sampleID,
                evaluationResultID: contestWork.evaluationResultID,
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

    handleDelete(contestWork) {
        this.setState({ isActive: false, isChoosed: true });
        this.clearState();
        this.deleteDataFromController(contestWork)
    }

    render() {
        return (
            <Row style={{ width: "100%", left: 5, position: "absolute" }}>
                <Col>
                    {this.renderContestWorkTable()}
                </Col>
                <Col>
                    {this.renderContestWorkForm()}
                </Col>
            </Row>
        );
    }

    async getDataFromController() {
        const response = await fetch('contestwork');
        const data = await response.json();
        this.setState({ contestWorks: data });
    }

    async postDataToController(data) {
        console.log("Sending");

        const response = await fetch('contestwork', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        this.setState({ message: responseData, validated: false });
        this.clearState();
        this.getDataFromController();
    }

    async putDataToController(data) {
        console.log("Updating");

        const response = await fetch('contestwork', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        this.setState({ message: responseData, validated: false });
        this.getDataFromController();
    }

    async deleteDataFromController(contestWork) {
        console.log("Deleting");
        const data = contestWork.id;
        const response = await fetch('contestwork', {
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

        var data = {
            "ID": this.state.id,
            "contestName": this.state.contestName,
            "contestantRFID": this.state.contestantRFID,
            "contestantQR": this.state.contestantQR,
            "sampleRFID": this.state.sampleRFID,
            "sampleQR": this.state.sampleQR,
            "exerciseLink": this.state.exerciseLink,
            "evaluationResultMark": 0,
            "contestID": this.state.contestID,
            "contestantID": this.state.contestantID,
            "sampleID": this.state.sampleID,
            "evaluationResultID": this.state.evaluationResultID
        };

        if (form.checkValidity() === false) {
            event.preventDefault();
        }
        else {
            if (this.state.isAdding) {
                this.postDataToController(data);
            }
            if (this.state.isUpdating) {
                this.putDataToController(data);
            }
        }

        this.setState({ validated: true });
        event.preventDefault();
    }

    handleChangeContestName(event) {
        this.setState({ contestName: event.target.value });
    }

    handleChangeContestantRFID(event) {
        this.setState({ contestantRFID: event.target.value });
    }

    handleChangeContestantQR(event) {
        this.setState({ contestantQR: event.target.value });
    }

    handleChangeSampleRFID(event) {
        this.setState({ sampleRFID: event.target.value });
    }

    handleChangeSampleQR(event) {
        this.setState({ sampleQR: event.target.value });
    }

    handleChangeExerciseLink(event) {
        this.setState({ exerciseLink: event.target.value });
    }
}