import React, { Component } from 'react';
import { ContestAddPageView } from './ContestAddPageView';

export class ContestAddPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            dateOfBegin: "",
            dateOfEnd: "",
            validated: false,
        }

        this.postObjectToController = this.postObjectToController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.changePageTitle("Добавление конкурса");
    }

    async postObjectToController(object) {
        const response = await fetch(`contest/create`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);

        window.location = ('/Contests');
    }

    render() {
        return (
            <ContestAddPageView
                name={this.state.name}
                dateOfBegin={this.state.dateOfBegin}
                dateOfEnd={this.state.dateOfEnd}
                handleChangeInput={this.handleChangeInput}
                handleSubmit={ this.handleSubmit}
            />
            );
    }

    handleSubmit() {
        event.preventDefault();
        let object = {
            ID: "_",
            Name: this.state.name,
            DateOfBegin: this.state.dateOfBegin,
            DateOfEnd: this.state.dateOfEnd,
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