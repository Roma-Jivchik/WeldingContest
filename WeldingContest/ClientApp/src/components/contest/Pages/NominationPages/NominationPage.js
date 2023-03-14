import React, { Component } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import CustomDataGrid from '../../sub-components/CustomDataGrid';
import { NominationPageView } from './NominationPageView';

export class NominationPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nomination: {},
            title: "",
            size: "",
            thickness: "",
            material: "",
            weldingType: "",
            sampleType: "",
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
            title: this.state.nomination.title,
            size: this.state.nomination.size,
            thickness: this.state.nomination.thickness,
            material: this.state.nomination.material,
            weldingType: this.state.nomination.weldingType,
            sampleType: this.state.nomination.sampleType,
            isUpdating: false,
            validated: false,
        });
    }

    componentDidMount() {
        this.props.changePageTitle("Номинация");
        this.getObjectFromController(this.props.id);
    }

    async getObjectFromController(id) {
        const response = await fetch(`nomination/get-by-id?id=${id}`);
        const data = await response.json();
        this.setState({
            nomination: data,
            title: data.title,
            size: data.size,
            thickness: data.thickness,
            material: data.material,
            weldingType: data.weldingType,
            sampleType: data.sampleType
        });
        console.log(data);
    }

    async putObjectToController(object) {
        const response = await fetch(`nomination/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(object)
        });
        const data = await response.json();
        console.log(data);

        this.setState({ isUpdating: false });
    }

    async deleteObjectFromController(id) {
        const response = await fetch(`nomination/delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(id)
        });
        const data = await response.json();
        this.props.getMessage(data);
    }

    render() {
        return (
            <NominationPageView
                title={this.state.title}
                size={this.state.size}
                thickness={this.state.thickness}
                material={this.state.material}
                weldingType={this.state.weldingType}
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
            ID: this.state.nomination.id,
            Title: this.state.title,
            Size: this.state.size,
            Thickness: this.state.thickness,
            Material: this.state.material,
            WeldingType: this.state.weldingType,
            SampleType: this.state.sampleType
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
        if (confirm("Вы действительно хотите удалить данную номинацию?")) {
            this.deleteObjectFromController(this.state.nomination.id);
            setTimeout(() => { window.location = ('/Nominations') }, 1000);
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