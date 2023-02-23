import React, { Component } from 'react';
import { ContestantAddPageView } from './ContestantAddPageView';

export class ContestantAddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: "",
            rfid: "",
            qr: "",
            company: "Компания",
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.changePageTitle("Добавление конкурсанта");
    }

    async postObjectToController(object) {
        const response = await fetch(`contestant/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);

        window.location = ('/Contestants');
    }

    render() {
        return (
            <ContestantAddPageView
                fullname={this.state.fullName}
                rfid={this.state.rfid}
                qr={this.state.qr}
                company={this.state.company}
                handleChangeInput={this.handleChangeInput}
                handleSubmit={ this.handleSubmit}
            />
            );
    }

    handleSubmit() {
        event.preventDefault();
        let object = {
            ID: "_",
            FullName: this.state.fullName,
            RFID: this.state.rfid,
            QR: this.state.qr,
            Company: this.state.company
        }
        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({ validated: true });
            this.postObjectToController(object);
        }
    }

    handleChangeInput() {
        this.setState({ [event.target.name]: event.target.value });
    }
}