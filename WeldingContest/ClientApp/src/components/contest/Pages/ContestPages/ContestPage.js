import React, { Component } from 'react';
import { ContestPageView } from './ContestPageView';

export class ContestPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contest: {},
            name: "",
            dateOfBegin: "",
            dateOfEnd: "",
            isUpdating: false,
            validated: false,
        };

        this.clearState = this.clearState.bind(this);
        this.getObjectFromController = this.getObjectFromController.bind(this);
        this.putObjectToController = this.putObjectToController.bind(this);
        this.deleteObjectFromController = this.deleteObjectFromController.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    clearState() {
        this.setState({
            name: this.state.contest.name,
            dateOfBegin: this.state.contest.dateOfBegin,
            dateOfEnd: this.state.contest.dateOfEnd,
            isUpdating: false,
            validated: false,
        });
    }

    componentDidMount() {
        this.props.changePageTitle("Конкурс");
        this.getObjectFromController(this.props.id);
    }

    async getObjectFromController(id) {
        const response = await fetch(`contest/get-by-id?id=${id}`);
        const data = await response.json();
        this.setState({
            contest: data,
            name: data.name,
            dateOfBegin: data.dateOfBegin,
            dateOfEnd: data.dateOfEnd,
        });
        console.log(data);
    }

    async putObjectToController(object) {
        const response = await fetch(`contest/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);

        this.setState({ isUpdating: false });
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`contest/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <ContestPageView
                contest={ this.state.contest}
                name={this.state.name}
                dateOfBegin={this.state.dateOfBegin}
                dateOfEnd={this.state.dateOfEnd}
                isUpdating={this.state.isUpdating}
                validated={this.state.validated}
                handleChangeInput={this.handleChangeInput}
                handleUpdate={this.handleUpdate}
                handleDelete={ this.handleDelete}
                handleCancel={ this.handleCancel}
                handleSubmit={ this.handleSubmit}
            />
            );
    }

    handleSubmit() {
        event.preventDefault();

        let object = {
            ID: this.state.contest.id,
            Name: this.state.name,
            DateOfBegin: this.state.dateOfBegin,
            DateOfEnd: this.state.dateOfEnd,
        };

        const form = event.target;

        if (form.checkValidity() === false) {
            event.stopPropagation();
        } else {
            this.setState({ validated: true });
            this.putObjectToController(object);
        }
    }

    handleUpdate() {
        this.setState({ isUpdating: true });
    }

    handleDelete() {
        if (confirm("Вы действительно хотите удалить данный конкурс?")) {
            this.deleteObjectFromController(this.state.contest.id);
            setTimeout(() => { window.location = ('/Contests') }, 1000);
        }
    }

    handleCancel() {
        this.setState({ isUpdating: false });
        this.clearState();
    }

    handleChangeInput() {
        this.setState({ [event.target.name]: event.target.value });
    }
}