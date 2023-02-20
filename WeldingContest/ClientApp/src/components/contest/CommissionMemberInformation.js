import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export class CommissionMemberInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentCommissionMember: "",
            id: "_",
            name: "",
            surname: "",
            patronymic: "",
            company: "",
            position: "",
            weldingType: "",
            weldingDischarge: 0,
            mark: "",
            RFID: "",
            QR: "",
            photo: null,
            loading: true,
            commissionMembers: [],
            isAdding: false,
            isDisabled: true,
            isChoosed: true,
            isActive: false,
            isUpdating:false,
            message: "",
        };

        this.renderCommissionMemberTable = this.renderCommissionMemberTable.bind(this);
        this.renderCommissionMemberForm = this.renderCommissionMemberForm.bind(this);

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
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangePatronymic = this.handleChangePatronymic.bind(this);
        this.handleChangeCompany = this.handleChangeCompany.bind(this);
        this.handleChangePosition = this.handleChangePosition.bind(this);
        this.handleChangeRFID = this.handleChangeRFID.bind(this);
        this.handleChangeQR = this.handleChangeQR.bind(this);
        this.handleChangeWeldingType = this.handleChangeWeldingType.bind(this);
        this.handleChangeWeldingDischarge = this.handleChangeWeldingDischarge.bind(this);
        this.handleChangeMark = this.handleChangeMark.bind(this);
    }

    clearState() {
        this.setState({
            currentCommissionMember: "",
            name: "",
            surname: "",
            patronymic: "",
            company: "",
            position: "",
            weldingType: "",
            weldingDischarge: "",
            mark: "",
            RFID: "",
            QR: "",
        });
    }

    componentDidMount() {
        this.getDataFromController();
    }

    renderCommissionMemberTable() {
        return (
            <>
                <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleAdd() }}>
                    Добавить
                        </Button>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>RFID</th>
                            <th>QR</th>
                            <th>Имя</th>
                            <th>Фамилия</th>
                            <th>Отчество</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.commissionMembers.map((commissionMember, index) =>
                            <tr key={commissionMember.id}>
                                <td>{ index + 1}</td>
                                <td>{commissionMember.rfid}</td>
                                <td>{commissionMember.qr}</td>
                                <td>{commissionMember.name}</td>
                                <td>{commissionMember.surname}</td>
                                <td>{commissionMember.patronymic}</td>
                                <td>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleChoose(commissionMember) }}>
                                        Выбрать
                                            </Button>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleUpdate(commissionMember) }}>
                                        Обновить
                                            </Button>
                                    <Button size="sm" variant="primary" type="submit" onClick={() => { this.handleDelete(commissionMember) }}>
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

    renderCommissionMemberForm() {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                <fieldset hidden={!this.state.isActive}>
                    <Tabs size="sm" defaultActiveKey="one">
                        <Tab size="sm" eventKey="one" title="Личная ин-я">
                            <fieldset disabled={this.state.isDisabled}>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Фамилия</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.surname} placeholder={this.state.currentCommissionMember.surname} onChange={this.handleChangeSurname} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Имя</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.name} placeholder={this.state.currentCommissionMember.name} onChange={this.handleChangeName} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Отчество</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.patronymic} placeholder={this.state.currentCommissionMember.patronymic} onChange={this.handleChangePatronymic} />
                                </Form.Group>
                            </fieldset>
                        </Tab>
                        <Tab size="sm" eventKey="two" title="Рабочая ин-я">
                            <fieldset disabled={this.state.isDisabled}>
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
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Компания</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.company} placeholder={this.state.currentCommissionMember.company} onChange={this.handleChangeCompany} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Должность</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.position} placeholder={this.state.currentCommissionMember.position} onChange={this.handleChangePosition} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </fieldset>
                        </Tab>
                        <Tab size="sm" eventKey="three" title="Должностная ин-я">
                            <fieldset disabled={this.state.isDisabled}>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Вид сварки</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.weldingType} placeholder={this.state.currentCommissionMember.weldingType} onChange={this.handleChangeWeldingType} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Разряд</Form.Label>
                                    <Form.Control size="sm" type="number" value={this.state.weldingDischarge} placeholder={this.state.currentCommissionMember.weldingDischarge} onChange={this.handleChangeWeldingDischarge} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label size="sm">Клеймо</Form.Label>
                                    <Form.Control size="sm" type="text" value={this.state.mark} placeholder={this.state.currentCommissionMember.mark} onChange={this.handleChangeMark} required />
                                    <Form.Control.Feedback type="invalid">
                                        Пожалуйста, заполните поле
                                    </Form.Control.Feedback>
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

    handleChoose(commissionMember) {
        this.setState(
            {
                isChoosed: true,
                currentCommissionMember: commissionMember,
                isDisabled: true,
                isActive:true,
                ID: commissionMember.id,
                name: commissionMember.name,
                surname: commissionMember.surname,
                patronymic: commissionMember.patronymic,
                company: commissionMember.company,
                position: commissionMember.position,
                weldingType: commissionMember.weldingType,
                weldingDischarge: commissionMember.weldingDischarge,
                mark: commissionMember.mark,
                RFID: commissionMember.rfid,
                QR: commissionMember.qr,
                message: "",
            }
        );
    }

    handleUpdate(commissionMember) {
        this.setState(
            {
                id: commissionMember.id,
                isChoosed: false,
                isActive: true,
                currentCommissionMember: commissionMember,
                isDisabled: false,
                isUpdating: true,
                name: commissionMember.name,
                surname: commissionMember.surname,
                patronymic: commissionMember.patronymic,
                company: commissionMember.company,
                position: commissionMember.position,
                weldingType: commissionMember.weldingType,
                weldingDischarge: commissionMember.weldingDischarge,
                mark: commissionMember.mark,
                RFID: commissionMember.rfid,
                QR: commissionMember.qr,
                message:"",
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

    handleDelete(commissionMember) {
        this.setState({ isActive: false, isChoosed: true});
        this.clearState();
        this.deleteDataFromController(commissionMember)
    }

    render() {
        return (
            <Row style={{width:"100%",left:5, position:"absolute"}}>
                <Col>
                    {this.renderCommissionMemberTable()}
                </Col>
                <Col>
                    {this.renderCommissionMemberForm()}
                </Col>
            </Row>
        );
    }

    async getDataFromController() {
        const response = await fetch('commissionmember');
        const data = await response.json();
        this.setState({ commissionMembers: data });
    }

    async postDataToController(data) {
        console.log("Sending");

        const response = await fetch('commissionmember', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        this.setState({ message: responseData, validated: false  });
        this.clearState();
        this.getDataFromController();
    }

    async putDataToController(data) {
        console.log("Updating");

        const response = await fetch('commissionmember', {
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

    async deleteDataFromController(commissionMember) {
        console.log("Deleting");
        const data = commissionMember.id;
        const response = await fetch('commissionmember', {
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
            "surname": this.state.surname,
            "patronymic": this.state.patronymic,
            "company": this.state.company,
            "position": this.state.position,
            "RFID": this.state.RFID,
            "weldingType": this.state.weldingType,
            "weldingDischarge": this.state.weldingDischarge,
            "mark": this.state.mark,
            "QR": this.state.QR
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

    handleChangeSurname(event) {
        this.setState({ surname: event.target.value });
    }

    handleChangePatronymic(event) {
        this.setState({ patronymic: event.target.value });
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
}