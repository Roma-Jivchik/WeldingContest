import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export class ContestInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentContest: "",
            id: "_",
            name: "",
            dateOfBegin: "",
            dateOfEnd:"",
            photo: null,
            loading: true,
            contests: [],
            isAdding: false,
            isDisabled: true,
            isChoosed: true,
            isActive: false,
            isUpdating: false,
            message: "",
        };

        this.renderContestTable = this.renderContestTable.bind(this);
        this.renderContestForm = this.renderContestForm.bind(this);

        this.postDataToController = this.postDataToController.bind(this);
        this.putDataToController = this.putDataToController.bind(this);
        this.getDataFromController = this.getDataFromController.bind(this);
        this.deleteDataFromController = this.deleteDataFromController.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChoose = this.handleChoose.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeDateOfBegin = this.handleChangeDateOfBegin.bind(this);
        this.handleChangeDateOfEnd = this.handleChangeDateOfEnd.bind(this);
    }

    clearState() {
        this.setState({
            currentContest: "",
            id: "_",
            name: "",
            dateOfBegin: "",
            dateOfEnd: "",
        });
    }

    componentDidMount() {
        this.getDataFromController();
    }

    renderContestTable() {
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
                            <th>Дата начала</th>
                            <th>Дата окончания</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.contests.map((contest, index) =>
                            <tr key={contest.id}>
                                <td>{ index + 1} </td>
                                <td>{contest.name}</td>
                                <td>{contest.dateOfBegin}</td>
                                <td>{contest.dateOfEnd}</td>
                                <td>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleChoose(contest) }}>
                                        Выбрать
                                            </Button>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleUpdate(contest) }}>
                                        Обновить
                                            </Button>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleDelete(contest) }}>
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

    renderContestForm() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <fieldset hidden={!this.state.isActive}>
                            <fieldset disabled={this.state.isDisabled}>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Название конкурса</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.name} placeholder={this.state.currentContest.name} onChange={this.handleChangeName} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Дата начала конкурса</Form.Label>
                                    <Form.Control size="sm" type="date" value={this.state.dateOfBegin} placeholder={this.state.currentContest.dateOfBegin} onChange={this.handleChangeDateOfBegin} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Дата окончания конкурса</Form.Label>
                                    <Form.Control size="sm" type="date" value={this.state.dateOfEnd} placeholder={this.state.currentContest.dateOfEnd} onChange={this.handleChangeDateOfEnd} />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </fieldset>
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

    handleChoose(contest) {
        this.setState(
            {
                isChoosed: true,
                currentContest: contest,
                isDisabled: true,
                isActive: true,
                id: contest.id,
                name: contest.name,
                dateOfBegin: contest.dateOfBegin,
                dateOfEnd: contest.dateOfEnd,
                message: "",
            }
        );
    }

    handleUpdate(contest) {
        this.setState(
            {
                id: contest.id,
                isChoosed: false,
                isActive: true,
                currentContest: contest,
                isDisabled: false,
                isUpdating: true,
                name: contest.name,
                dateOfBegin: contest.dateOfBegin,
                dateOfEnd: contest.dateOfEnd,
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

    handleDelete(contest) {
        this.setState({ isActive: false, isChoosed: true });
        this.clearState();
        this.deleteDataFromController(contest)
    }

    render() {
        return (
            <Row style={{ width: "100%", left: 5, position: "absolute" }}>
                <Col>
                    {this.renderContestTable()}
                </Col>
                <Col>
                    {this.renderContestForm()}
                </Col>
            </Row>
        );
    }

    async getDataFromController() {
        const response = await fetch('contest');
        const data = await response.json();
        this.setState({ contests: data });
    }

    async postDataToController(data) {
        console.log("Sending");

        const response = await fetch('contest', {
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

        const response = await fetch('contest', {
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

    async deleteDataFromController(contest) {
        console.log("Deleting");
        const data = contest.id;
        const response = await fetch('contest', {
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
            "name": this.state.name,
            "dateOfBegin": this.state.dateOfBegin,
            "dateOfEnd": this.state.dateOfEnd,
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

    handleChangeName(event) {
        this.setState({ name: event.target.value });
    }

    handleChangeDateOfBegin(event) {
        this.setState({ dateOfBegin: event.target.value });
    }

    handleChangeDateOfEnd(event) {
        this.setState({ dateOfEnd: event.target.value });
    }
}